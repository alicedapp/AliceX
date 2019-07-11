import React from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

export default class Countdown extends React.Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate } = this.props;
      const then = moment(timeTillDate);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');

      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: this.props.color, fontSize: this.props.fontSize, fontFamily: 'Menlo-Regular'}}>{days}</Text>
        <View>
          <Text style={{
            color: this.props.color,
            fontSize: 10,
            fontStyle: 'italic',
            fontFamily: 'Menlo-Regular',
            paddingLeft: 2,
            paddingRight: 3
          }}>D</Text>
        </View>
        <Text style={{color: this.props.color, fontSize: this.props.fontSize, fontFamily: 'Menlo-Regular'}}>{hours}:{minutes}.{seconds}</Text>
      </View>
    );
  }
}
