# Weblayout template
	Starter template for building a web layout.
> gulp + sass + jade


## Install

Clone this repo into your local:
```shell
git clone --depth=1 https://github.com/sergeynechaev/weblayout-template.git <your-project-name>
```

Then, run:
```shell
npm install
bower install
```


## Development

In the project's folder run:
```shell
gulp
```

Go to the http://localhost:9000 then modify the files under `/src` directory. The new content will be automatically generated in the `/build` folder. 
Browser will refresh the page automatically after saving your changes.


## Production

In the project's folder run:
```shell
gulp prod
```

Minimized output will be placed in the folder `/build-prod`.
