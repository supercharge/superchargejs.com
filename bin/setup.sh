#!/bin/bash

if [ ! -f package.json ]; then
    echo "Please to run this script from the root directory of this repository."
    exit 1
fi

npm install
cp .env.example .env
source "$(dirname "$0")/checkout_latest_docs.sh"
