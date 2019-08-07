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
      const date = moment(parseInt(timeTillDate)).unix();
      const then = moment(date);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      this.setState({ days, hours, minutes });
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
      <View style={{flexDirection: 'row', ...this.props.style}}>
        <Text style={{color: '#A9C6E8', fontSize: this.props.fontSize,}}>{days}d : {hours}h : {minutes}m</Text>
      </View>
    );
  }
}
