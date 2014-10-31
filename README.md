# Portal

### Commands:

`grunt test`
simply runs the local tests with karma

`grunt lint`
runs jshint on javascript files

`grunt bower`
should be run instead of `bower install` due to the fact that it also copies files to /client/vendor

`grunt build`
runs test, lint, bower, requirejs build & if `--deploy=true` will deploy the built files to amazon s3. 
