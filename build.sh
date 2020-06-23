#!/bin/bash

mkdir -p ./dist/

# clear the dist folder
echo "--------- clearing dist"
rm -rf ./dist/*


echo "--------- elm make and output main.js in dist folder"
elm make src/Main.elm --output=./dist/elmmain.js


# copy all html files to the dist directory from source
echo "--------- copying html files"
find src -maxdepth 1 -name '*.html' -exec cp {} ./dist/ \;


cp src/CNAME dist/CNAME

# run webpack
npm run "$@"
