#!/bin/bash

DOCS_VERSIONS=(
  main
#   2.x
  3.x
  4.x
)

for version in "${DOCS_VERSIONS[@]}"; do
    if [ -d "resources/docs/$version" ]; then
        echo "Pulling latest documentation updates for $version..."
        (cd resources/docs/$version && git pull)
    else
        echo "Cloning $version..."
        git clone --single-branch --branch "$version" git@github.com:supercharge/docs.git "resources/docs/$version"
    fi;
done
