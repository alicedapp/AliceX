git clone https://github.com/alicedapp/AliceX
cd AliceX
yarn
git submodule update --init --recursive
cd ios
pod install
open AliceX.xcworkspace
cd ..
npm start
