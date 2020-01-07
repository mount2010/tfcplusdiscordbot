#!/bin/bash

echo -e "\033[1mBuilding...\033[0m"
npx babel src/** --out-dir out --delete-dir-on-start 
result=$?
npx babel commands/** --out-dir commands/out --delete-dir-on-start
result=$(expr $result + $?)
mv commands/out out/commands

if [[ $result == 0 ]]; then
    echo -e "\033[32;1mAll done!\033[0m"
else 
    echo -e "\033[31;1mErrors occured!\033[0m"
fi