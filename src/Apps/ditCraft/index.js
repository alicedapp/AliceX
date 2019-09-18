import React, { Component } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, View, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import ModalComponent from './Components/Modal.js';
import Modalize from "./Components/Modalize.js";
var sampledata = require('./Assets/sampledata.json');
import env from '../../../env.json';

const { height, width } = Dimensions.get('window');

export default class ditCraft extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			isModalVisible: false,
			selectedItem: null,
      dataSource: []
		}
	}

	componentDidMount(){
		return fetch('https://server.ditcraft.io/api/proposal', {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				api_key: env.ditcraft,
				mode: 'demo'
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log('responseJson: ', responseJson);
			this.setState({
			isLoading: false,
			dataSource: responseJson,
			}, function(){

			});

		})
		.catch((error) =>{
			console.error(error);
		});
	}

	showModal = () => this.setState({ isModalVisible: true });
	hideModal = () => this.setState({ isModalVisible: false });

	actionOnRow(item) {
		console.log('Selected Item :',item);
		this.setState({ selectedItem: item });
		this.showModal();
	}

	render() {

		if(this.state.isLoading){
			return(
			  <View style={{flex: 1, padding: 20}}>
				<ActivityIndicator/>
			  </View>
			);
		}

		let modalInfo;
		if(this.state.selectedItem){
			modalInfo = <View>
					<Text>Topic: {this.state.selectedItem.topic}</Text>
					<Text>ID: {this.state.selectedItem.id}</Text>
					<Text>KNW VOTE ID: {this.state.selectedItem.knw_vote_id}</Text>
					<Text>Label: {this.state.selectedItem.knw_label}</Text>
					<Text>Repository: {this.state.selectedItem.repository}</Text>
				</View>
		} else {
			modalInfo = <Text>Test</Text>
		}
		return (

			<View style={styles.container}>
				<FlatList
					data={this.state.dataSource}
					renderItem={({item}) =>
					<TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
						<Text style={styles.item}>{item.topic}</Text>
					</TouchableWithoutFeedback>
					}
					/*keyExtractor={({id}, index) => id}*//>
				<ModalComponent
				visible={this.state.isModalVisible}
				dismiss={this.hideModal}>
					{modalInfo}
				</ModalComponent>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  modal: {
    margin: 0,
  }
})
