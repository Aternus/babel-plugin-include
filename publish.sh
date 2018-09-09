#!/bin/bash

##
# Publish the Library to npmjs.com
###########################################################

GIT_ROOT=$(git rev-parse --show-toplevel)
VERSION=$1

##
# Functions
##
build() {
    npm run build
}

update_version () {
    npm version "${VERSION}"
}

publish() {
    npm publish
}

git_add() {
    echo "Adding files to git, committing changes..."
    cd ${GIT_ROOT}
    git add .
    git commit -m "version ${VERSION}"
}

git_push() {
    echo "Pushing to remote..."
    cd ${GIT_ROOT}
    git push
}

git_add_tag() {
    echo "Adding a git tag for the new version and pushing to remote..."
    cd ${GIT_ROOT}
    git tag -a "${VERSION}" -m "${VERSION}"
    git push --prune --tags
}

##
# Run
#
# Create a success chain
##
build && git_add && update_version
