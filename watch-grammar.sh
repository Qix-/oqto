#!/usr/bin/bash

sigint()
{
	echo -e "\x1b[?25h"
	exit
}

trap sigint SIGINT

echo -e "\x1b[?25l"

while true; do
	outp=`(cd test && node ccs-grammar-test.js 2>&1)`
	echo -e "\x1b[2J$outp"
	sleep 0.3
done