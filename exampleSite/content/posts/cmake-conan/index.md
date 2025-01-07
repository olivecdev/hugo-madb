---
title: "Cmake Conan"
date: 2023-02-05
categories: ['C++']
tags: ['CMake', 'Conan', 'C++']
---

My exploration started with CMake and Conan. Their integration changed a lot and for better.
CMakeLists.txt don't recognize Conan anymore. They do the typical `find_package` and `target_link_libraries`.
Conan magic happens through CMakePresets and toolchain files.

It became easier then ever having Debug and Release build
trees active and the same time and switching between then is just: `cmake --build --preset=<debug/release/other>`.
Creating those build types can be done by creating new profiles or (if only the build type is what changes) just pass
the settings to Conan command line:

```sh
conan install . --build=missing --output-folder=build/<Debug/Release/Other>
  --settings=build_type=<Debug/Release/Other>
```

Conan creates CMakePresets.json inside the respective build trees and import all of them in the root directory
CMakeUserPresets.json.

The conanfile.txt syntax didn't change much, except for the generators. Working effectively with CMake requires two
generators:

```toml

[requires]

# Unit testing
boost-ext-ut/[>=1.1 <1.2]
# For JSON, URL, Asio and Beast
boost/[>=1.80 <1.90]

# Mustache-like templating
inja/[>=3.4 <3.5]

fmt/[>=9.1 <10.0]
spdlog/[>=1.11 <1.12]

# Command line
lyra/[>=1.6 <1.7]

[generators]
CMakeDeps
CMakeToolchain

```
The CMakeDeps generator will create a bunch of .cmake files so the `find_package` commands just work.
The CMakeToolchain generator is what teaches CMake the build type, compiler and its options etc.

A simple pair of CMakeLists.txt looks like:

`./CMakeLists.txt`

```cmake

# CMake 3.23 to allow using presets
cmake_minimum_required(VERSION 3.23)

project(
  cppf
  VERSION 0.0.1
  LANGUAGES CXX
  HOMEPAGE_URL "https://github.com/CarlosNihelton/cppf.git"
  DESCRIPTION "A C++ tool to help creating C++ tools"
  )

add_subdirectory(src)
```

`./src/CMakeLists.txt`

```cmake
find_package(lyra CONFIG REQUIRED)

add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} PRIVATE bfg::lyra)

```

## A note about locks:

When using flexible versions, one may consider adding the file `conan.lock` to the version control. Makes a lot of sense
for applications. Not that much for libraries. To create one, use `conan lock create .` (from the repository root).
Even though the versions are flexible in the conanfile.txt, having a lock file will instruct Conan to download and build
the exact versions therein referred.

I loved Conan 2.0. Much nicer than the previous version. Can't wait to see it in GA.

## Conan + CMake + Ninja Multi-Config

CMake + Ninja Multi-Config allows one single build tree generating different outputs, according to the build
configuration. The classic way of using this is to produce `Release`, `Debug`, `RelWithDebInfo` and `MinSizeRel` versions of the
same binary target.

Enabling that by default with conan is just a matter of setting the relevant tool option in the default profile

`~/.conan2/profiles/default`

```toml
[conf]
tools.cmake.cmaketoolchain:generator=Ninja Multi-Config
```

That way if the command `conan install` leaves the CMake generator sub-option unset, Ninja Multi-Config will be the chosen
one.

That's not the whole story, though. You might not have all dependencies in all the configurations, so to handle that we
need to invoke `conan install .` a few times (notice that Release is the default one):

```sh
conan install . --build=missing --output-folder build/
conan install . --build=missing --output-folder build/ -s build_type=Debug
conan install . --build=missing --output-folder build/ -s build_type=RelWithDebInfo
conan install . --build=missing --output-folder build/ -s build_type=MinSizeRel

```

When configuring the project with cmake, we specify `cmake --preset default`. That will generate all ninja
`build-<Config>.ninja` files. Building becomes `cmake --build build/ --preset <config>` (lowercase version of the build
types we supplied to `conan install`).

Notice how trivial it is to run cmake in that case. I guess the setup trouble is worthy.

## CMAKE_EXPORT_COMPILE_COMMANDS environment variable

[Since CMake 3.17](https://cmake.org/cmake/help/latest/release/3.17.html#:~:text=The%20CMAKE_EXPORT_COMPILE_COMMANDS%20variable%20now%20takes%20its%20initial%20value%20from%20the%20CMAKE_EXPORT_COMPILE_COMMANDS%20environment%20variable%20if%20no%20explicit%20configuration%20is%20given.)
the CMAKE_EXPORT_COMPILE_COMMANDS internal variable has its initial value from the environment variable
of the same name. So if you are a C++ developer that works with clang tools very often, it's certain that you want to
have that environment variable set and exported in your .bashrc (or equivalent).

Every time you configure a project with CMake it will generate the `compile_commands.json` file in your build tree.
Consider having a symlink in the root of your project by default pointing to `buid/compile_commands.json`, unless you
use specific layouts with subtrees per build config. Using the Ninja Multi-Config mentioned above ensures we'll have a
single compilation database in the build directory.

