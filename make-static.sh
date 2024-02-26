#!/bin/bash

rm -rf ./dist
mkdir ./dist

cp -r ./static/* ./dist/

cp ./bundle.js ./dist/js/balatro-save-loader.js