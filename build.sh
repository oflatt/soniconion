#!/bin/bash

mkdir -p ../soniconion-deploy/docs/

# clear the docs folder
echo "--------- clearing docs"
rm -rf ../soniconion-deploy/docs/*

# copy all html files to the docs directory from source
echo "--------- copying html files"
find src -maxdepth 1 -name '*.html' -exec cp {} ../soniconion-deploy/docs/ \;

echo "--------- copying js files"
find src -maxdepth 1 -name '*.js' -exec cp {} ../soniconion-deploy/docs/ \;


echo "--------- elm make and output main.js in docs folder"
elm make src/Main.elm --output=../soniconion-deploy/docs/main.js
