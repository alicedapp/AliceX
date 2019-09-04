import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {switchcase} from "../Utils";
import Button from "./Button";
import {colors} from '../Utils'

export default class WizardCard extends React.Component {
  state = {
    cardColor: 'white',
    footerColor: 'white'
  };

  componentDidMount() {
    this.getColor();
  }

  renderAffinity = () => {
     const affinityImage = switchcase({
      1: <Image source={require('../Assets/neutral-symbol-black.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/>,
      2: <Image source={require('../Assets/fire-symbol-black.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/>,
      3: <Image source={require('../Assets/water-symbol-black.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/>,
      4: <Image source={require('../Assets/wind-symbol-black.png')} style={{resizeMode: 'contain', height: 20, width: 20}}/>,
    });
    return affinityImage(this.props.wizard.affinity);
  };

  getColor = () => {
    const color = switchcase({
      1: () => this.setState({footerColor: colors.neutralMainColor, cardColor: colors.neutralSecondaryColor}),
      2: () => this.setState({footerColor: colors.fireMainColor, cardColor: colors.fireSecondaryColor}),
      3: () => this.setState({footerColor: colors.waterMainColor, cardColor: colors.waterSecondaryColor}),
      4: () => this.setState({footerColor: colors.windMainColor, cardColor: colors.windSecondaryColor}),
    });
    return color(this.props.wizard.affinity)();
  };

  renderWizard = () => {
    const affinityImage = switchcase({
      1: <Image source={require('../Assets/wzrd-1-1.png')} style={{resizeMode: 'contain', height: 200, width: 200, marginVertical: 30}} />,
      2: <Image source={require('../Assets/wzrd-2-1.png')} style={{resizeMode: 'contain', height: 200, width: 200, marginVertical: 30}}/>,
      3: <Image source={require('../Assets/wzrd-3-1.png')} style={{resizeMode: 'contain', height: 200, width: 200, marginVertical: 30}}/>,
      4: <Image source={require('../Assets/wzrd-4-1.png')} style={{resizeMode: 'contain', height: 200, width: 200, marginVertical: 30}}/>,
    });
    return affinityImage(this.props.wizard.affinity);

  }

  render() {
    const { wizard, key } = this.props;
    console.log('WIZARD: ', wizard);
    return (
      <View {...this.props} key={key} style={{...styles.cardContainer, ...this.props.style, ...styles.sharpShadow}}>
        <View style={{...styles.innerContainer, backgroundColor: this.state.cardColor}}>
          <Text style={{color: 'black', fontSize: 20, fontFamily: 'Exocet'}}>{wizard.id}</Text>
          <View style={{alignItems: 'center', justifyContent: 'center', height: 200, width: 200}}>
            {this.renderWizard()}
          </View>
          <View style={{...styles.cardFooter, backgroundColor: this.state.footerColor}}>
            <Text style={{color: 'black', fontSize: 20, fontFamily: 'Exocet'}}>{Math.round(wizard.power/10e10)}</Text>
            {this.renderAffinity()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  innerContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  cardFooter: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sharpShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 0,
    shadowOpacity: 1,

  }
})
