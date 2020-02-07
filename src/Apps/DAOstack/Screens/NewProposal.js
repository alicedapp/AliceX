/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';

import { Button } from '../Components';

// eslint-disable-next-line no-undef
export default class NewProposal extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      headerTitle: 'Reputation Request',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: navigation.state.params.backgroundColor,
      },

      headerLeft: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image
            source={require('../Assets/back-button-white.png')}
            style={{
              height: 17,
              margin: 20,
              resizeMode: 'contain',
            }}
          />
        </TouchableWithoutFeedback>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      animatePress: new Animated.Value(1),
      title: '',
      description: '',
      link: '',
      titleIsValid: true,
      descriptionIsValid: true
    };
  }

  validateAndNavigate = () => {
    let hasValidationErrors = false;
    if (this.state.title.length) {
      this.setState({ titleIsValid: true });
    } else {
      this.setState({ titleIsValid: false });
      hasValidationErrors = true;
    }

    if (this.state.description.length) {
      this.setState({ descriptionIsValid: true });
    } else {
      this.setState({ descriptionIsValid: false });
      hasValidationErrors = true;
    }

    if (hasValidationErrors) {
      return;
    }

    this.props.navigation.navigate('DAOstack/ReputationRequest', { 
      dao: this.props.navigation.state.params.dao,
      backgroundColor: this.props.navigation.state.params.backgroundColor,
      title: this.state.title,
      description: this.state.description,
      link: this.state.link
    });
  };

  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={{ width: '100%', flexGrow: 1, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{ alignContent: 'flex-start'}}>
            <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20, marginRight: 10 }}>
              Title
              {
                this.state.titleIsValid ? null :
                <Text style={{ fontWeight: '700', fontSize: 15, marginBottom: 10, marginTop: 20, ...styles.errorColor }}>
                  &nbsp;&nbsp;Required
                </Text>
              }
            </Text>
            <TextInput
              style={[{
                  padding: 10,
                  width: '100%',
                  ...styles.input,
                  height: 50,
                  fontWeight: '600',
                  fontSize: 15
                },
                (this.state.titleIsValid) ? null : { borderWidth: 1, ...styles.errorBorderColor }
              ]}
              onChangeText={(title) => this.setState({title})}
              placeholder="e.g. Reputation Request"
            />
            <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20, marginRight: 10 }}>
              Description
              {
                this.state.descriptionIsValid ? null :
                <Text style={{ fontWeight: '700', fontSize: 15, marginBottom: 10, marginTop: 20, ...styles.errorColor }}>
                  &nbsp;&nbsp;Required
                </Text>
              }
            </Text>
            <TextInput
              multiline
              style={[{
                  padding: 10,
                  paddingTop: 15,
                  width: '100%',
                  ...styles.input,
                  height: 200,
                  fontWeight: '600',
                  fontSize: 15
                },
                (this.state.descriptionIsValid) ? null : { borderWidth: 1, ...styles.errorBorderColor }
              ]}
              onChangeText={(description) => this.setState({description})}
              placeholder={"Describe the reason you're joining this DAO"}
            />
            <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 10, marginTop: 20 }}>
              Attachment URL
            </Text>
            <TextInput
              style={{
                padding: 10,
                width: '100%',
                ...styles.input,
                height: 50,
                fontWeight: '600',
                fontSize: 15,
              }}
              onChangeText={(link) => this.setState({link})}
              placeholder="Add a link for more details"
            />
          </View>

          <View style={{ paddingTop: 20, alignItems: 'center' }}>
            <Button
              onPress={this.validateAndNavigate}
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: 250,
                paddingVertical: 15,
                resizeMode: 'contain',
              }}
              >
              <View style={{ alignItems: 'center', width: (200 - 25) }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>Next Step</Text>
              </View>
              <Image
                source={require('../Assets/forward-button-white.png')}
                style={{
                  height: 25,
                  width: 25,
                }}
                />
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tokenBox: {
    flexDirection: 'row',
    width: '100%',
    margin: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  errorColor: {
    color: 'red'
  },
  errorBorderColor: {
    borderColor: 'red'
  }
});
