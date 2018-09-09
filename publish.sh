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
    echo "~~~ Building..."
    npm run build
}

update_version () {
    echo "~~~ Updating version..."
    # must be run on a clean git directory
    # automatically adds a git tag
    npm version "${VERSION}"
}

publish() {
    echo "~~~ Publishing to npmjs.com..."
    npm publish
}

git_add() {
    echo "~~~ Adding files to git, committing changes..."
    cd ${GIT_ROOT}
    git add .
    git commit -m "version ${VERSION}"
}

git_push() {
    echo "~~~ Pushing to remote..."
    cd ${GIT_ROOT}
    git push
}

git_push_tags() {
    echo "~~~ Pushing tags to remote..."
    cd ${GIT_ROOT}
    git push --prune --tags
}

##
# Run
#
# Create a success chain
##
build && git_add && update_version && publish && git_push && git_push_tags
