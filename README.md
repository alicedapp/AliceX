# ![banner](https://github.com/alicedapp/AliceX/blob/master/src/AliceAssets/alice-banner.png)

[![Build Status](https://travis-ci.com/AlphaWallet/alpha-wallet-ios.svg?branch=master)](https://travis-ci.com/AlphaWallet/alpha-wallet-ios.svg?branch=master)
[![License](https://img.shields.io/badge/license-GPL3-green.svg?style=flat)](https://github.com/fastlane/fastlane/blob/master/LICENSE)

Alice is a cryptocurrency wallet that allows anyone to build native apps inside of it. What does this mean? It means your app gets access to native features that don't exist in the current mobile browser paradigm that we are all used to with cryptocurrency wallets today.

Features you get access to:

- A full screen application, no more browser navigation buttons taking up real estate in your experience.
- Tab navigation: Your app feels like a native app because it is a native app.
- Front and Rear Camera Access, full access no need to take pictures to scan a qr code.
- Push notifications with in app routing. Get a push notification notifying the user wherever they are and navigate them straight into to your app.
- Build your app in React Native, no need to learn swift or kotlin. Web devs can approach this solution with a similar experience to their current web building with the ability to reuse most of your javascript logic from your exsiting app.

Roadmap Features
-

**When debugging**
Our team are working around the clock to build you the best mobile developer experience and will be attending to your issues and comments as quickly as we can. However if we can't get to your issue immediately, we've chosen some of the most used open source frameworks and libraries so that support for the developert experience will be widely available on the internet.
If we don't get back to you immediately there will be many other resources out there for React Native and JavaScript that

## Requirement

- [React](https://www.npmjs.com/package/react)
- [Yarn](https://www.npmjs.com/package/yarn)
- [React-Native](https://www.npmjs.com/package/react-native)
- [Cocoapod](https://cocoapods.org)

### iOS
The app is fully functioning in the iOS version

### Android
// Work in progress

## Getting Started

1. Download or Clone this repository. `git clone https://github.com/alicedapp/AliceX.git`

2. cd into the repository and run `yarn` or `npm install` depending if you are using either.

3. run `git submodule init && git submodule update` to install the ios directory

### iOS
4. run `cd ios && pod install`
5. Open the `AliceX.xcworkspace` file in xcode
6. Run the project and start to build your app

`COMING SOON`
4. `./install.ios.sh`
5. Run the project in Xcode. 🎉

### Android
`COMING SOON`
4. `./install.android.sh`
5. Run the project in Android Simulator. 🎉

# Building your app in Alice
Now this is the juicy stuff. Hopefully you navigated through that setup process with ease because of one of two reasons
1. We made it insanely easy for you OR
2. You're just a gun dev.

Welcome to the rabbit hole, it's now your choice to enter or not. You can turn back now and act like none of this happened. OR you can enter into wonderland and you'll experience how deep the rabbit hole goes.

Now that you're in the repo you will want to navigate to the `src/Apps` folder in Alice. In the folder you will see an Example app which you can use as a guide or boilerplate for your project.
As a buidler in Alice you will have access to Camera Features, Map Features, Navigation Features and Web3 features (the ability to prompt a user to send transactions in your application).

Building your React Native app in Alice will be very similar to building a regular React Native app, if you're familiar with the process.
For Documentation on how to use React Native:
- https://facebook.github.io/react-native/
For Documentation on how to use the Navigation:
- https://reactnavigation.org/docs/en/getting-started.html
For Documentation on how to use the MapBox component:
- https://github.com/nitaliano/react-native-mapbox-gl/tree/master/docs
For Documentation on how to use the Camera:
- https://react-native-community.github.io/react-native-camera/docs/rncamera
For Documentation on how to use Web3:
- https://github.com/alicedapp/AliceX/wiki


## Limitations
- All of your code will only be allowed within your Applications folder in the `/App` directory.
- Your apps are limited to a 10MB file size.
- You will not be able to directly install any packages into the Alice native app and be approved a pull request unless you raise an issue in the github to have a package added, stating why and then we may approve it.
If you do wish to have a javascript package added to your app you will have to put the code for the package directly in your folder.

## Web3 Functions
### Function Completion List

#### Wallet Functions
- [x] Get Wallet Address
- [x] Send Transaction
- [x] Sign Transaction
- [x] Sign Message
- [ ] Send Token

#### Smart Contract Functions
- [x] Contract Write
- [x] Contract Read

```js
import {Wallet, Contract} from '../../SDK';

```

Get Wallet Address
```js
Wallet.getAddress(); -> '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F' //user's wallet address
```

Send Transaction

```js
Wallet.sendTransaction({
    to: '0x25c4a76e7d118705e7ea2e9b7d8c59930d8acd3b',
    value: "1000",
    data: "YOLO"
}) -> '0x9665fd863a2a9657ee09c138306fc9f1a72dd8b52c61675a5221390ed5eb9a76' //transaction hash
```

Sign Transaction
```js
Wallet.signTransaction({
    to: '0x25c4a76e7d118705e7ea2e9b7d8c59930d8acd3b',
    value: "1000",
    data: "YOLO"
}) -> {
          raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
          tx: {
              nonce: '0x0',
              gasPrice: '0x4a817c800',
              gas: '0x5208',
              to: '0x3535353535353535353535353535353535353535',
              value: '0xde0b6b3a7640000',
              input: '0x',
              v: '0x25',
              r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
              s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
              hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
          }
      }
```

Sign Message

```js
Wallet.signMessage("Yo Bob!") -> "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
```

Send Token

```js
Wallet.sendToken({
    to: '0x25c4a76e7d118705e7ea2e9b7d8c59930d8acd3b',
    tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    value: "1000",
    data: "YOLO"
}) -> '0xfcbe88307d2edde37b4236c9bcc66bcb81cb9f865f915c9772e46129d56528c7' //transaction hash
```

** Smart Contract Interactions **

Send Information

```js
Contract.write({
    abi: [{...}]
    contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E',
    functionName: 'setOrder',
    parameters: ['Hamburger', 'Mark'],
    value: "0.1",
    data: ""
}) -> '0xfcbe88307d2edde37b4236c9bcc66bcb81cb9f865f915c9772e46129d56528c7' //transaction hash
```

Read Data

```js
Contract.read({
    abi: [{...}]
    contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E',
    functionName: 'getOrderDetails',
    parameters: ['Hamburger', 'Mark'],
}) -> []

```

# Contributing
Alice is open source and open source for a reason, we want everyone to join in on the fun. There is an ongoing list of key features that we have to implement before launch on the App Store and Google Play Store.
The list of features you can find below.

## The Alice DAO
Being involved in Alice means you are apart of a democratic decision making process that will help see the app forward in a more diversified and inclusive process so that we can guarantee we're buidling for our broader ecosystem.
The Stack and structure for the DAO is yet to be implemented but please join in on the fun and decision making process of which DAO we choose.
This will be interesting.


### Feedback
The best way to submit feedback and report bugs is to open a GitHub issue.
Please be sure to include your operating system, device, version number, and
steps to reproduce reported bugs.

## Open source acknowledgment
Alice has decided upon the MIT License due to the nature of it's existence as a platform and it's ownership of proprietary code and third-party assets associated with it's platform. This doesn't mean that all code existing within Alice's platform will be licensed under the MIT License. Your application can exist within our platform with it's own license and only adhere to the rules and guidelines of the Alice platform.
