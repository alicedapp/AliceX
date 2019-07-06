import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../../AliceUtils/time';

export const FeedTileContext = ({ item }) => (
  <View style={{flex: 1}} >
    <Text>
      {timeSince(item.timeStamp * 1000)}
    </Text>
    {item.dataType === 'Private'
      ? <View style={{width: 40, height: 40, backgroundColor: 'blue'}} />
      : <View style={{width: 40, height: 40, backgroundColor: 'green'}} />
    }
  </View>
);

FeedTileContext.propTypes = {
  item: PropTypes.object,
};

FeedTileContext.defaultProps = {
  item: {},
};

export default FeedTileContext;
