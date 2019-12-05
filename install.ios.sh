#!/bin/bash

RED='\033[0;31m'
NC='\033[0m'

if ! [ -x "$(command -v git)" ];
then
	echo 'Error: git is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v brew)" ];
then
	echo 'Error: Homebrew is not installed.' >&2
	echo -e "To install Homebrew, go to website ${RED}https://brew.sh/${NC}." >&2
	exit 1
fi

if ! [ -x "$(command -v npm)" ];
then
	echo 'Error: npm is not installed.' >&2
	echo -e "To install yarn, just run ${RED}brew install node${NC}." >&2
	exit 1
fi

if ! [ -x "$(command -v yarn)" ];
then
	echo 'Error: yarn is not installed.' >&2
	echo -e "To install yarn, just run ${RED}brew install yarn${NC}." >&2
	exit 1
fi

if ! [ -x "$(command -v pod)" ];
then
	echo 'Error: cocoapods is not installed.' >&2
	echo -e "To install cocoapod, just run ${RED}sudo gem install cocoapods${NC}" >&2
	exit 1
fi

git clone https://github.com/alicedapp/AliceX
cd AliceX
yarn
git submodule update --init --recursive
cd ios
pod install
cd ..
./alice -i
