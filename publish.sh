#!/bin/bash

##
# Publish the Library to npmjs.com
###########################################################

GIT_ROOT=$(git rev-parse --show-toplevel)
VERSION=$1

##
# Helper Functions
##
print_info() {
  # blue
  echo -e "\e[96m-=> $1\e[39m"
}

print_success() {
  echo -e "\e[92m-=> $1\e[39m"
}

##
# Functions
##
build() {
  print_info "Building..."
  npm run dist
}

update_version() {
  print_info "Updating version..."
  # must be run on a clean git directory
  # automatically adds a git tag
  npm version "${VERSION}"
}

publish() {
  print_info "Publishing to npmjs.com..."
  npm publish
}

publish_dry_run() {
  print_info "Publishing to npmjs.com..."
  npm publish --dry-run
}

git_push() {
  print_info "Pushing to remote..."
  cd "${GIT_ROOT}" || return
  git push
}

git_push_tags() {
  print_info "Pushing tags to remote..."
  cd "${GIT_ROOT}" || return
  git push --prune --tags
}

##
# Run
##
build && update_version && publish && git_push && git_push_tags && print_success "Complete."

#build && publish_dry_run && print_success "Complete."
