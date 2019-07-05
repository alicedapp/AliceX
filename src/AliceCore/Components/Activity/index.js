import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, Text, Image, View, Dimensions} from "react-native";

// import ActivityHeader from './ActivityHeader';
import {ActivityTiles} from './ActivityTiles';
import {FeedTileTXS} from "../FeedTile";

export const Activity = ({
                    isFetchingActivity,
                    feedByAddress,
                    otherProfileActivity,
                  }) => {
  return (
    <View>
      <View>
        <Text>
          Activity
          {(isFetchingActivity)
          && (
            <Text>Loading</Text>
          )}
        </Text>
        <View style={{flex: 1}}>
          {(feedByAddress && feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <View style={{flex: 1}} key={i}>
                <FeedTileTXS
                  currentAddress={'currentAddress'}
                  item={feedAddress}
                  key={i}
                  metaDataName={feedAddress.metaData
                  && (feedAddress.metaData.name
                    || (feedAddress.metaData.contractDetails
                      && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  name={name}
                />);
              </View>
            ))
            : (!isFetchingActivity && !otherProfileActivity.length)
            && (
              <View style={{flex: 1}}>
                <Text>No activity at this address yet</Text>
              </View>
            )
          }
        </View>
      </View>
    </View>
  );
}

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  isFetchingActivity: PropTypes.bool,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  otherProfileActivity: PropTypes.array,
  location: PropTypes.object,
  otherName: PropTypes.string,
};

Activity.defaultProps = {
  feedByAddress: [],
  name: '',
  isFetchingActivity: false,
  otherProfileAddress: '',
  currentAddress: '',
  otherName: '',
  otherProfileActivity: [],
  location: {},
};
