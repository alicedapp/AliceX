import React from "react";
import {Text, TouchableOpacity, ScrollView, TextInput, View, Dimensions} from "react-native";
import {NavigationBar} from "../../../AliceComponents/NavigationBar";
import {countries} from "../Assets/Flags";
import {cities} from "../Assets/Cities";

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
      data: cities,
      filter: ''
    };

    this.child = React.createRef();

  }

  componentDidMount() {

  }

  handleChange = text => {
    console.log('TEXT: ', text);
    this.setState({ filter: text });
  };

  goToCity = (city) => {
    this.props.navigation.navigate('City', {city});
  };


  render() {
    console.log('PARAMS: ', this.props.navigation.state.params.country.name);
    const { navigation } = this.props;
    const { filter, data } = this.state;
    const {country} = this.props.navigation.state.params;
    const countryFilter = this.props.navigation.state.params.country.name.toLowerCase();
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key => {
          if (item[key].toLowerCase) {
            return item[key].toLowerCase().includes(countryFilter)
          }
        }
      );
    });
    const cityData = filteredData.filter(item => {
      return Object.keys(item).some(key => {
          if (item[key].toLowerCase) {
            return item[key].toLowerCase().includes(lowercasedFilter)
          }
        }
      );
    });

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
        <NavigationBar/>
        <View style={{flex: 1, paddingTop: 100, width}}>
          <Text style={{marginHorizontal: 20, fontSize: 30, paddingBottom: 10 }}>{country.name}{country.icon}</Text>
        <TextInput value={filter} onChangeText={this.handleChange}  style={{height: 50, padding: 10, borderRadius: 15, marginHorizontal: 20, backgroundColor: '#e7e7e7' }} placeholder={"Search Cities"}/>
          <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'flex-start', justifyContent: 'center', padding: 20}}>
            {cityData.map((city, i) => {
              return (
                <TouchableOpacity key={i} style={{margin: 10, height: 50, borderBottomWidth: 0.5, borderBottomColor: '#dfdfdf', width: '100%'}} onPress={() => this.goToCity(city)}>
                  <Text style={{fontSize: 20}}>{city.city}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
