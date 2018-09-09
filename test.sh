#!/bin/bash

##
# Babel - Current
###########################################################

npm run build
npx babel --plugins ./dist/index.js ./tests/main.js
