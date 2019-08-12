# ![banner](https://github.com/alicedapp/AliceX/blob/master/src/AliceAssets/alice-banner.png)

[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/fastlane/fastlane/blob/master/LICENSE)

Alice 是一款加密货币钱包，但不同于其他类型钱包。Alice还是一个小程序平台，小程序由React Native 编写，任何人都能通过 Alice SDK, 开发出属于自己的小程序，最后整合进入 Alice.

Alice SDK 提供底层支持，其中包括：

- Wallet Connect

- 获取用户地址

- 获取用户余额

- 用户付款

- 消息签名

- 调用自定义Smart Contract

- 支持交易ERC-20 Token

- 更改 Gas 价格

  ...

**为什么我们要做Alice呢？**

1. 当前的 DApp 大多都是网页应用，体验不如原生好。 

2. 同时，前端开发者想要做一款原生应用，但是不懂 iOS 与 Android 知识很难下手。由此，通过Alice SDK，前端依旧以 JavaScript 为开发语言，但是底层端不需要，再了解。

3. Alice 小程序基于RN, 已有的React项目很容易移植上来，而大多数区块链DApp都是基于 React 开发的。

4. 原生可以支持网页，没法做到或者很难的功能。例如：消息推送，扫描二维码 与 NFC扫描

   ....

## 环境需求

- [React](https://www.npmjs.com/package/react)
- [Yarn](https://www.npmjs.com/package/yarn)
- [React-Native](https://www.npmjs.com/package/react-native)
- [Cocoapod](https://cocoapods.org)

## 安装

1. 只需将下面命令在你的终端执行，即可安装Alice:<br/>

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/alicedapp/AliceX/master/install.ios.sh)"
```

2. 当你安装完成后，你能使用`./alice` 命令在模拟器上运行Alice.

   | ./alice <options> | Alice command tool                                           |
   | ----------------- | ------------------------------------------------------------ |
   | -i                | Run alice in iOS simulator.                                  |
   | -a                | Run alice in android simulator.                              |
   | -u                | Update all submodule in Alice, inculding iOS and android submodules. |
   | -h                | See all avaliable option                                     |

   

### Android

`COMING SOON`



# 如何开发Alice小程序？
在你安装完成，成功运行之后。从根目录进入`src/Apps`目录，在此目录下你可以看到一个**Example**的文件夹。里面是一个样例小程序，展示了多数 Alice SDK支持的功能。

通过Alice SDK，你可以轻易的调用摄像头，地图，导航 以及 Web3.js 的功能。

如果，你之前开发过React，那你一定很容易上手 React Native。

下面是一些  React Native 的基础与控件文档：

​		官方文档:
- https://facebook.github.io/react-native/<br/>
  导航栏:<br/>
- https://reactnavigation.org/docs/en/getting-started.html<br/>
  地图文档:
- https://github.com/nitaliano/react-native-mapbox-gl/tree/master/docs<br/>
  相机文档:
- https://react-native-community.github.io/react-native-camera/docs/rncamera<br/>
  Web3 文档:
- https://github.com/alicedapp/AliceX/wiki<br/>


## 小程序限制
想要提交小程序到Alice，您必须满足以下几点要求：

- 您代码的所有修改，仅在`/App`内你的小程序文件夹下

- 你的小程序代码大小不超过***10MB***

- 你不能直接安装其他第三方库，如果需要，可以向我们提交 Pull Request 并说明原因

- 你也可以直接将第三方库代码，放入你的文件夹下，直接引用

  

## Web3 功能 （Alice SDk）
### 已完成列表

#### Wallet Functions （钱包功能）
- [x] Get Wallet Address
- [x] Get Network
- [x] Get Balance
- [x] Send Transaction
- [x] Sign Transaction
- [x] Sign Message
- [x] Send Token

#### Smart Contract Functions （智能合约功能）
- [x] Contract Write
- [x] Contract Read

***以下是使用样例:***



### Wallet Functions 

```js
import {Wallet, Contract} from '../../SDK';

```

**Get Wallet Address**

```js
Wallet.getAddress(); -> '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F' //user's wallet address
```

**Send Transaction**

```js
Wallet.sendTransaction({
    to: '0x25c4a76e7d118705e7ea2e9b7d8c59930d8acd3b',
    value: "1000",
    data: "YOLO"
}) -> '0x9665fd863a2a9657ee09c138306fc9f1a72dd8b52c61675a5221390ed5eb9a76' //transaction hash
```

**Sign Transaction**

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

**Sign Message**

```js
Wallet.signMessage("Yo Bob!") -> "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
```

**Send Token**

```js
Wallet.sendToken({
    to: '0x25c4a76e7d118705e7ea2e9b7d8c59930d8acd3b',
    tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    value: "1000",
    data: "YOLO"
}) -> '0xfcbe88307d2edde37b4236c9bcc66bcb81cb9f865f915c9772e46129d56528c7' //transaction hash
```

### Smart Contract Interactions 

**Send Information**

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

**Read Data**

```js
Contract.read({
    abi: [{...}]
    contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E',
    functionName: 'getOrderDetails',
    parameters: ['Hamburger', 'Mark'],
}) -> []

```

# 参与我们
Alice 是一个开源项目，我们希望加入开发者能好好利用我们提供的功能。我们还在持续的开发一些关键功能，在我们提交到 App Store 与 Google Play 之前。



## Alice DAO

参与爱丽丝意味着你是 Alice DAO 的一员了，你可以投票做出表决，这将有助于在更加多样化和包容性的过程中看到应用程序向前发展，这样我们就可以保证我们能够为更广泛的生态系统做好准备。
DAO的堆栈和结构尚未实现，但请加入我们选择的DAO的乐趣和决策过程。
这将很有趣。

### 反馈

最好的提交反馈的方式，还是提交一个issue在Github上。在issue里面请说明产生问题的 系统，型号，设备以及版本号。这将有助于我们，定位和解决Bug。

## 开源协议
Alice 使用 MIT 的许可证，因为它作为一个平台存在的性质，它是专有代码和与其平台相关的第三方资产的所有权。 这并不意味着Alice平台中存在的所有代码都将根据MIT许可证进行许可。 您的应用程序可以使用自己的许可证存在于我们的平台中，并且只遵守Alice平台的规则和准则。
