#!/usr/bin/bash

while true; do
	outp=`(cd test && node ccs-grammar-test.js 2>&1)`
	echo -e "\x1b[2J$outp"
	sleep 1.0
done