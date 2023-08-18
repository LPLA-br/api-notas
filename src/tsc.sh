#!/bin/bash

if [[ -e '../node_modules/typescript/bin/tsc' ]]; then
	../node_modules/typescript/bin/tsc $1 $2 $3 $4 $5 $6 $7 $8 $9;
else
	echo 'não foi possível executar o compilador de typescript';
fi
