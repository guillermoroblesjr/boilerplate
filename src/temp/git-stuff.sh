#!/bin/bash
git fetch
git add --all .
git status
git commit -m "$2"
git push