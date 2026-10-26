start: css
	hugo server --source=exampleSite --themesDir=../.. --disableFastRender --logLevel info

css:
	bundle exec tailwindcss -i assets/css/tailwind.css -o assets/css/tailwind.generated.css

css-watch:
	bundle exec tailwindcss -i assets/css/tailwind.css -o assets/css/tailwind.generated.css --watch
