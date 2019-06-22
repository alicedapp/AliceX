/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */

import React from 'react';
import {
	Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, View, NativeModules
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import CameraComponent from "../../Components/Camera";
import Map from './Screens/Map'

const { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { navigate } = navigation;
	};

	constructor(props) {
		super(props);
		this.state = {
			txHash: 'TX HASH',
		};

	}

	send = () => {
		NativeModules.PaymentNativeModule.payment('0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', '0.01', (txHash) => {
			this.setState({txHash})
		})
	};



	render() {
		const { navigation } = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
				<TouchableOpacity onPress={this.send} style={{alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: 'grey'}}>
					<Text>Send</Text>
				</TouchableOpacity>
			</View>
		);
	}
}


class SettingsScreen extends React.Component {
	render() {
		return (
			<App/>
		);
	}
}

export default createBottomTabNavigator({
	// Your App's Tab Navigator's names are defined here as a default
	Home: HomeScreen,
	Maps: Map,
	Camera: CameraComponent
});
