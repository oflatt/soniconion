#!/bin/bash

mkdir -p ./docs/

# clear the docs folder
echo "--------- clearing docs"
rm -rf ./docs/*

# copy all html files to the docs directory from source
echo "--------- copying html files"
find src -maxdepth 1 -name '*.html' -exec cp {} ./docs/ \;

echo "--------- copying js files"
find src -maxdepth 1 -name '*.js' -exec cp {} ./docs/ \;


echo "--------- elm make and output main.js in docs folder"
elm make src/Main.elm --output=./docs/main.js
