#!/bin/bash
echo -e "\033[1mRunning tests...\033[0m"
jest ..
if [[ $? == 0 ]]; then
    echo -e "\033[32;1mTest passed!\033[0m"
else 
    echo -e "\033[31;1mTest failed!\033[0m"
fi