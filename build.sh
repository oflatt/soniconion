#!/bin/bash
set -e -x

mkdir -p ./dist/

# clear the dist folder
rm -rf ./dist/*


elm make src/Main.elm --output=./dist/elmmain.js


# copy all html files to the dist directory from source
find src -maxdepth 1 -name '*.html' -exec cp {} ./dist/ \;


cp src/CNAME dist/CNAME

cp node_modules/stopify/dist/stopify-full.bundle.js dist

# run webpack
npm run "$@"
