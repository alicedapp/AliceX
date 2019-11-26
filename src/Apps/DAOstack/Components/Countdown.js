/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

export default class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
    };
  }

  componentDidMount() {
    this.countdown();
  }

  componentWillUnmount() {
    this.countdownReset();
  }

  countdown(){
    const { timeTillDate } = this.props;
    const interval = (endDate) => {
      const date = moment.unix(parseInt(endDate));
      const now = moment();
      const duration = date.diff(now);
      const countdown = moment.duration(duration)
      const days = countdown.days();
      const hours = countdown.hours();
      const minutes = countdown.minutes();
      const seconds = countdown.seconds();
      this.setState({ days, hours, minutes, seconds });
    }
    this.interval = setInterval(() => interval(timeTillDate), 1000);
  }

  countdownReset(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { style, fontSize } = this.props;
    return (
      <View style={{ flexDirection: 'row', ...style }}>
        <Text style={{ color: '#7bace8', fontSize, fontWeight: '800' }}>
          {days}d : {hours}h : {minutes}m : {seconds}s
        </Text>
      </View>
    );
  }
}
