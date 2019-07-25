import React from "react";
import { Text, ScrollView, View } from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {E2EABI} from "../ABI";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {ethers} from 'ethers';
const ROPSTEN = { address: "0xF5D9E79FA73BF0ff34c5EC16Ca4BbC7eee5c69a0", startBlockNumber: '0x36d224' };
const infuraProviderRopsten = new ethers.providers.InfuraProvider('ropsten');

export default class ExampleHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      contractInfo: '',
      contractTxHash: '',
      signedMessage: '',
      signedTransaction: '',
      tokenTxHash: '',
      txHash: '',
      balance: '',
      logs: []
    };

    this.child = React.createRef();

  }

  componentDidMount() {
    this.contractRead()
    this.getLogs()
  }

  getLogs = async () => {
    let logInfo = {
      address: ROPSTEN.address,
      topics: [ '0xb3dbe9e9894ca2c11cb6c80bd0b0bccb9f5b41d612dbeeda0d5474de40b874fe'],
      fromBlock: ROPSTEN.startBlockNumber,
      toBlock: 'latest'
    };

    try {
      const logs = await infuraProviderRopsten.getLogs(logInfo);
      console.log(logs)
      this.setState({logs})
    } catch (e) {
      console.log('errors: ', e)
    }

  };

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
      console.log('address: ', address);
      this.setState({ address })
    } catch(e) {
      console.log(e);
    }

  };


  signMessage = async () => {
    try {
      const signedMessage = await Wallet.signMessage('Hello World');
      console.log('signedMessage: ', signedMessage);
      this.setState({signedMessage})
    } catch(e) {
      console.log(e)
    }

  };

  contractSend = async () => {
    try {
      const contractTxHash = await Contract.write({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'setOrder', parameters: ['Mark', 'HotDog'], value: '0.001', data: ''})
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };

  contractRead = async () => {
    try {
      const result = await Contract.read({contractAddress: ROPSTEN.address, abi: E2EABI, functionName: 'balanceOf', parameters: ['0x0eA61087d2e37260c936185B21b10aeA96bE7fd8'], network: 'ropsten' });
      console.log('RESULT: ', result.toString());
      this.setState({contractInfo: JSON.stringify(result.toString())});

    } catch(e) {
      console.log(e)
    }
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <NavigationBar/>
        <ScrollView>
          {this.state.logs.map((message, i) => {
            return (
              <Text key={i}>{ethers.utils.toUtf8String(message.data)}</Text>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}
