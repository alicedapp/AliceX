import React from "react";
import {Text, TouchableOpacity, ScrollView, StyleSheet, View, Dimensions, Image} from "react-native";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {countries} from "../Assets/Flags";
import Button from "../../CheezeWizards/Components/Button";

const { height, width } = Dimensions.get('window');

export default class Cities extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      header: null,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      filter: '',
      pois: ["1","1","1","1","1","1","1",]
    };

    this.child = React.createRef();

  }

  componentDidMount() {

  }

  handleChange = text => {
    console.log('TEXT: ', text);
    this.setState({ filter: text });
  };

  render() {
    console.log('PARAMS: ', this.props.navigation.state.params.city.city);
    const { navigation } = this.props;
    const { pois } = this.state;
    const {city} = this.props.navigation.state.params;


    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <NavigationBar/>
        <View style={{flex: 1, paddingTop: 100, width}}>
          <Text style={{marginHorizontal: 20, fontSize: 30  }}>{city.city}</Text>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={{margin: 10, borderRadius: 8}}>
              <Text style={{fontSize: 20}}>List</Text>
            </View>
            <TouchableOpacity style={{margin: 10, borderRadius: 8, backgroundColor: '#668dff', padding: 10, paddingHorizontal: 20}} onPress={() => this.props.navigation.navigate('CryptoHubMaps', {city})}>
              <Text style={{fontSize: 15, color: 'white'}}>Map</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}>
            <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
              <View style={{...styles.iconContainer, backgroundColor: '#ff8e27'}}>
                <Image source={require('../Assets/atm.png')} style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30
                }}/>
              </View>
              <Text style={{fontSize: 20}}>ATM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
              <View style={{...styles.iconContainer, backgroundColor: '#428cff'}}>
                <Image source={require('../Assets/bed.png')} style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30
                }}/>
              </View>
              <Text style={{fontSize: 20}}>Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 10, height: 50, borderBottomWidth: 0.5, alignItems: 'center', borderBottomColor: '#dfdfdf', width: '100%', flexDirection: 'row'}} onPress={() => this.goToCity(city)}>
              <View style={{...styles.iconContainer, backgroundColor: '#39d557'}}>
                <Image source={require('../Assets/dish.png')} style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30
                }}/>
              </View>
              <Text style={{fontSize: 20}}>Restaurant</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,

  },
})
