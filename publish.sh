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

git_push() {
    echo "Adding files to git, committing changes and pushing to remote..."
    cd ${GIT_ROOT}
    git add .
    git commit -m "version ${VERSION}"
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
##
build
update_version
publish
git_push
git_add_tag
