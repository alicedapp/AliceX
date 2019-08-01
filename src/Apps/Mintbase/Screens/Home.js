import React from "react";
import {Image, Text, NativeModules, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import Modalize from 'react-native-modalize'
import {FoodContractABI, WETHABI} from "../../Example/ABI";
import moment from 'moment';
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import Countdown from "../../Foam/Components/Countdown";
const ANNOTATION_SIZE = 10;
const { height, width } = Dimensions.get('window');

export default class ExampleHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
    };
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
      dropdown: true,
      wrapTxHash: '',
      poiDescription: {
        name:"Ripple Labs, Inc.",
        stake:"0x2b5e3af16b1880000",
        address:"300 Montgomery Street, San Francisco, California 94104, United States",
        longitude:-122.40246422588825,
        latitude:37.792205326259136,
        description:"Ripple Labs, Inc. operates a global payments network deploying blockchain technology. It develops RippleNet, an enterprise decentralized solution for global payments. Its solution connects banks, payment providers, digital asset exchanges, and corporates to send money globally. The company’s solutions include XRP, a digital asset for payments in form of crypto-currency; xCurrent, a software for banks for cross-border payments services; xRapid, for payment providers and other financial institutions to manage liquidity costs; and xVia, for corporates, payment providers, and banks to send payments across networks using standard interface. Ripple Labs, Inc. was formerly known as OpenCoin, Inc. and changed its name to Ripple Labs, Inc. in September 2013. The company was founded in 2012 and is based in San Francisco, California with offices in New York, London, Sydney, India, Singapore, and Luxembourg.",
        tags:["Blockchain"],
        phone:"415-967-1836",
        web:"ripple.com",
        owner:"0x0aede6a80b45ee6156b5ea3fca675d665e89197a",
        loading:false,
        date: "2018-09-15T20:49:58Z",
      }
    };

    this.child = React.createRef();

  }

  componentDidMount() {
    this.child.current.open();
    this.onOpen('challenged')
  }

  onOpen = (itemDescription) => {

    if (itemDescription === 'signal') {
      this.setState({
        selectedPOIColor: '#FEC76C',
        selectedPOIStatus: 'Signal',
        selectedPOIStatusColor: 'black',
        statusMessage: 'was created on',
        poiType: 'signal'
      });
    } else if (itemDescription === 'applied') {
      this.setState({
        selectedPOIColor: '#2E7CE6',
        selectedPOIStatus: 'Pending Point of Interest',
        selectedPOIStatusColor: 'white',
        statusMessage: 'was registered on',
        poiType: 'applied'

      })
    } else if (itemDescription === 'challenged') {
      this.setState({
        selectedPOIColor: '#f47f67',
        selectedPOIStatus: 'Challenged Point of Interest',
        selectedPOIStatusColor: 'white',
        statusMessage: 'was challenged on',
        poiType: 'challenged'

      })
    } else {
      this.setState({
        selectedPOIColor: '#27AB5F',
        selectedPOIStatus: 'Verified Point of Interest',
        selectedPOIStatusColor: 'white',
        statusMessage: 'was last verified on',
        poiType: 'listed'

      })
    }
  };

  onClick = () => {
    // this.child.current.openModal();
  };

  getAddress = async () => {
    try {
      const address = await Wallet.getAddress();
      this.setState({ address })
    } catch(e) {
      console.log(e);
    }

  };

  getBalance = async () => {
    try {
      const balance = await Wallet.getBalance();
      console.log('balance: ', balance);
      this.setState({ balance })

    } catch(e) {
      console.log(e)
    }


  };

  sendTransaction = async () => {
    try {
      const txHash = await Wallet.sendTransaction({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01'})
      console.log('txHash: ', txHash);
      this.setState({txHash})
    } catch(e) {
      console.log(e);
    }
  };

  signTransaction = async () => {
    try {
      const signedTransaction = await Wallet.signTransaction({to: '0xE115012aA32a46F53b09e0A71CD0afa0658Da55F', value: '0.01', data: 'Hello'});
      console.log('signedMessage: ', signedTransaction);
      this.setState({signedTransaction})
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

  sendToken = () => {

  };

  renderHeader = () => (
    <View style={styles.modal__header}>
      <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 7}}>{this.state.poiDescription.name}</Text>
    </View>
  );

  renderDropdown = () => {
    this.setState({dropdown: !this.state.dropdown});
    // if ('signal') {
    //
    //   return (
    //
    //   )
    // }
  };

  contractSend = async () => {
    try {
      const contractTxHash = await Contract.write({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'setOrder', parameters: ['Mark', 'HotDog'], value: '0.0000001', data: ''})
      console.log('contractTxHash: ', contractTxHash);
      this.setState({contractTxHash})

    } catch(e) {
      console.log(e)
    }
  };

  wrapETH = async () => {
    try {
      const wrapTxHash = await Contract.write({contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab', abi: WETHABI, functionName: 'deposit', value: '0.1', data: ''});
      console.log('contractTxHash: ', wrapTxHash);
      this.setState({wrapTxHash})

    } catch(e) {
      console.log(e)
    }
  };

  contractRead = async () => {
    try {
      const result = await Contract.read({contractAddress: '0x68F7202dcb25360FA6042F6739B7F6526AfcA66E', abi: FoodContractABI, functionName: 'getOrder', parameters: [] });
      console.log('RESULT: ', result);
      this.setState({contractInfo: result});

    } catch(e) {
      console.log(e)
    }
  };


  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Modalize
          ref={this.child}
          HeaderComponent={this.renderHeader}
          height={165}>
          <View style={styles.innerModalBox}>
            {this.state.poiDescription.stake && <View style={{...styles.tokenAmount, marginBottom: 15}}>
              <Text
                style={{color: this.state.selectedPOIColor}}>{parseInt(this.state.poiDescription.stake) / 10e17.toFixed(2)}</Text>
              <View>
                <Text style={{
                  color: this.state.selectedPOIColor,
                  fontSize: 10,
                  fontStyle: 'italic',
                  paddingLeft: 2,
                  paddingRight: 3
                }}>FOAM</Text>
              </View>
              <Text style={{color: this.state.selectedPOIColor}}>staked</Text>
            </View>}
            <TouchableOpacity  style={{...styles.descriptionButton, backgroundColor: this.state.selectedPOIColor}} onPress={this.renderDropdown}>
              <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                <Text style={{color: this.state.selectedPOIStatusColor}}>{this.state.selectedPOIStatus}</Text>
                <Image source={require('../../Foam/Assets/caret.png')} style={{resizeMode: 'contain', width: 15}}/>
              </View>
              {this.state.dropdown && <View>
                <View style={{width: '100%', backgroundColor: 'rgba(256,256,256,0.2)', marginBottom: 15, marginTop: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                  <Text style={{textAlign: 'center', color: this.state.selectedPOIStatusColor}}>{this.state.poiDescription.name} {this.state.statusMessage} {moment(this.state.date).format('MMMM Do YYYY')}</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                  <View style={styles.tokenAmount}>
                    <Text
                      style={{color: this.state.selectedPOIStatusColor, fontSize: 17}}>{(parseInt(this.state.poiDescription.stake) / 10e17).toFixed(2)}</Text>
                    <View>
                      <Text style={{
                        color: this.state.selectedPOIStatusColor,
                        fontSize: 9,
                        fontStyle: 'italic',
                        fontWeight: '700',
                        paddingLeft: 2,
                        paddingRight: 3
                      }}>FOAM</Text>
                    </View>
                  </View>
                  <Text style={{color: this.state.selectedPOIStatusColor, fontSize: 10}}>Stake</Text>
                  <Text style={{color: this.state.selectedPOIStatusColor, fontSize: 10}}>Amount of FOAM tokens staked in {this.state.poiDescription.name}</Text>
                </View>
                {this.state.selectedPOIStatus !== 'Signal' && <TouchableOpacity style={{width: '100%', backgroundColor: 'white', marginBottom: 4, marginTop: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#212121',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 3,
                  shadowOpacity: 0.2,
                }}>
                  <Text style={{ color: '#28af60', fontSize: 16, fontWeight: '500'}}>Manage POI in dashboard</Text>
                </TouchableOpacity>}
                {this.state.poiType === 'applied' && <TouchableOpacity style={{width: '100%', backgroundColor: 'white', marginBottom: 4, marginTop: 4, borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#212121',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 3,
                  shadowOpacity: 0.2,
                }}>
                  <Text style={{ color: 'black', fontSize: 16, fontWeight: '500', marginBottom: 10}}>Update status to verified</Text>
                  <Text style={{ color: 'black', fontSize: 12}}>Pending ended</Text>
                </TouchableOpacity>}
                {this.state.poiType === 'challenged' && <View style={{width: '100%', marginBottom: 4, marginTop: 4, alignItems: 'center', justifyContent: 'center', padding: 10,}}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', marginBottom: 10}}>The voting period is ongoing</Text>
                  <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: 'rgba(256,256,256,0.4)', marginBottom: 15, marginTop: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10}}>
                      <Text style={{color: 'white', marginBottom: 4, fontSize: 13}}>Valid</Text>
                      <View style={styles.tokenAmount}>
                        <Text
                          style={{color: this.state.selectedPOIStatusColor, fontSize: 15, fontWeight: '600', marginBottom: 4}}>0.00</Text>
                        <View>
                          <Text style={{
                            color: this.state.selectedPOIStatusColor,
                            fontSize: 9,
                            fontStyle: 'italic',
                            fontWeight: '700',
                            paddingLeft: 2,
                            paddingRight: 3
                          }}>FOAM</Text>
                        </View>
                      </View>
                      <Text style={{color: 'white'}}>0 voters</Text>
                    </View>
                    <View style={{backgroundColor: 'rgba(256,256,256,0.2)', marginBottom: 15, marginTop: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10}}>
                      <Text style={{color: 'white', marginBottom: 4, fontSize: 13}}>Valid</Text>
                      <View style={styles.tokenAmount}>
                        <Text
                          style={{color: this.state.selectedPOIStatusColor, fontSize: 15, fontWeight: '600', marginBottom: 4}}>0.00</Text>
                        <View>
                          <Text style={{
                            color: this.state.selectedPOIStatusColor,
                            fontSize: 9,
                            fontStyle: 'italic',
                            fontWeight: '700',
                            paddingLeft: 2,
                            paddingRight: 3
                          }}>FOAM</Text>
                        </View>
                      </View>
                      <Text style={{color: 'white'}}>0 voters</Text>
                    </View>
                    <View style={{ marginBottom: 15, marginTop: 15, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10}}>
                      <Text style={{color: 'white', marginBottom: 4, fontSize: 13}}>Not Revealed</Text>
                      <View style={styles.tokenAmount}>
                        <Text
                          style={{color: this.state.selectedPOIStatusColor, fontSize: 15, fontWeight: '600', marginBottom: 4}}>5.00</Text>
                        <View>
                          <Text style={{
                            color: this.state.selectedPOIStatusColor,
                            fontSize: 9,
                            fontStyle: 'italic',
                            fontWeight: '700',
                            paddingLeft: 2,
                            paddingRight: 3
                          }}>FOAM</Text>
                        </View>
                      </View>
                      <Text style={{color: 'white'}}>1 voters</Text>
                    </View>
                  </View>
                </View>}
                {this.state.poiType !== 'signal' && this.state.poiType !== 'challenged' && <TouchableOpacity style={{width: '100%', backgroundColor: 'white', marginBottom: 4, marginTop: 4, borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#212121',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 3,
                  shadowOpacity: 0.2,
                }}>
                  <Text style={{ color: '#f47f67', fontSize: 16, fontWeight: '500'}}>Challenge {this.state.poiDescription.name}</Text>
                </TouchableOpacity>}
                {this.state.poiType === 'challenged' && <TouchableOpacity style={{width: '100%', backgroundColor: 'white', marginBottom: 4, marginTop: 4, borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#212121',

                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 3,
                  shadowOpacity: 0.2,
                }}>
                  <Text style={{ color: '#f47f67', fontSize: 16, fontWeight: '500', marginBottom: 8}}>Vote on {this.state.poiDescription.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{ color: '#f47f67', fontSize: 12,}}>Challenge ends in: </Text><Countdown color={'#f47f67'} fontSize={14} timeTillDate={this.state.poiDescription.date} timeFormat={'MM DD YYYY, h:mm a'}/></View>
                </TouchableOpacity>}
              </View>}
            </TouchableOpacity>

            {this.state.poiDescription.address && <Text style={{fontWeight: '500'}}>Address</Text>}
            {this.state.poiDescription.address &&
            <Text style={{marginBottom: 5}}>{this.state.poiDescription.address.toUpperCase()}</Text>}
            {this.state.poiDescription.latitude &&
            <Text style={{color: 'grey', fontSize: 13, marginBottom: 25}}>Longitude and
              Latitude: {this.state.poiDescription.longitude.toFixed(3)} N, {this.state.poiDescription.latitude.toFixed(3)}W</Text>}
            {this.state.poiDescription.description &&
            <Text style={{fontWeight: '500', marginBottom: 8}}>Description</Text>}

            {this.state.poiDescription.description &&
            <Text style={{marginBottom: 20}}>{this.state.poiDescription.description}</Text>}
            {this.state.poiDescription.tags && <Text style={{fontWeight: '500', marginBottom: 8}}>Tags</Text>}
            {this.state.poiDescription.tags && <View style={{marginBottom: 20, flexDirection: 'row',}}>
              {this.state.poiDescription.tags.map((tag, i) => {
                return (
                  <View key={i} style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                    backgroundColor: '#f1f1f1',
                    height: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{fontSize: 16, color: '#7e7e7e'}}>{tag}</Text>
                  </View>
                )
              })}
            </View>}
            {!!this.state.poiDescription.phone &&
            <View style={{flexDirection: 'row'}}><Text style={{fontWeight: '500', marginBottom: 20}}>Phone: </Text><Text
              style={{fontWeight: '200'}}>{this.state.poiDescription.phone}</Text></View>}
            {!!this.state.poiDescription.web &&
            <View style={{flexDirection: 'row'}}><Text style={{fontWeight: '500', marginBottom: 20}}>Web: </Text><Text
              style={{fontWeight: '200'}}>{this.state.poiDescription.web}</Text></View>}
          </View>
        </Modalize>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ANNOTATION_SIZE / 2,
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  blackHeaderModule: {
    flexDirection: 'row',
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: '#212121',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  whiteSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 5,
    padding: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  whiteBox: {
    margin: 25,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#636363',
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },

  tokenAmount: {
    flexDirection: 'row',
  },
  descriptionButton: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
    borderRadius: 50/2,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  registerButton: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
    borderRadius: 50/2,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },

  modal: {
    margin: 0,
  },
  modalBox: {
    width,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    bottom: 0
  },
  innerModalBox: {
    margin: 20,
  },
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: '200',
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: 'hidden',

    backgroundColor: '#eee',
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },

});
