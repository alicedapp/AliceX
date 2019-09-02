import React from "react";
import {Text, TouchableOpacity, ScrollView, TextInput, View, Dimensions} from "react-native";
import {Wallet, Contract} from "../../../AliceSDK/Web3";
import {FoodContractABI} from "../ABI";
import {NavigationBar} from "../../../AliceCore/Components/NavigationBar";
import {countries} from '../Assets/Flags'
const { height, width } = Dimensions.get('window');

export default class CryptoHubHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: countries,
      filter: ''
    };

    this.child = React.createRef();

  }

  componentDidMount() {

  }

  goToCountry = (country) => {
    this.props.navigation.navigate('Cities', {country});
  }

  handleChange = text => {
    console.log('TEXT: ', text)
    this.setState({ filter: text });
  };



  render() {
    const { navigation } = this.props;
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <NavigationBar/>
        <View style={{flex: 1, paddingTop: 100, backgroundColor: 'transparent', width}}>
          <TextInput value={filter} onChangeText={this.handleChange}  style={{height: 50, padding: 10, borderRadius: 15, marginHorizontal: 20, backgroundColor: '#e7e7e7' }} placeholder={"Search Countries"}/>
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: '', flexDirection: 'row', flexWrap: 'wrap'}}>
          {filteredData.map((country, i) => {
            return (
                <TouchableOpacity key={i} style={{margin: 10}} onPress={() => this.goToCountry(country)}>
                  <Text style={{fontSize: 50}}>{country.icon}</Text>
                  <Text numberOfLines={1} style={{fontSize: 10, width: 50}}>{country.name}</Text>
                </TouchableOpacity>
            )
          })}
        </ScrollView>
        </View>
      </View>
    );
  }
}
