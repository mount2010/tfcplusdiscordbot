#!/bin/bash

echo -e "\033[1mBuilding...\033[0m"
npx babel src/** --out-dir out --delete-dir-on-start 
npx babel commands/** --out-dir commands/out --delete-dir-on-start
mv commands/out out/commands

yarn test

echo -e "\033[1mAll done!\033[0m"