start: css
	hugo server --source=exampleSite --themesDir=../.. --disableFastRender --logLevel info

css:
	npm run css:build
