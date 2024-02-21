#!/bin/bash

rm -rf ./dist
mkdir ./dist

cp -r ./static/* ./dist/

cp ./bundle.js ./dist/balatro-save-loader.js