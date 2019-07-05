import React from 'react';
import PropTypes from 'prop-types';

import {
  FeedTileTXS,
  FeedTileToken,
  FeedTileInternal,
  FeedTileActivity,
  FeedTileSpace,
} from '../FeedTile';

export const ActivityTiles = ({
                         verifiedGithub,
                         verifiedTwitter,
                         verifiedEmail,
                         currentAddress,
                         name,
                         feedAddress,
                       }) => {
  return (
    <React.Fragment>
      {
        Object.values(feedAddress)[0].map((item, index) => (
          (() => {
            if (item.dataType === 'Internal') {
              return (
                <FeedTileInternal
                  currentAddress={currentAddress}
                  metaDataName={feedAddress.metaData
                  && (feedAddress.metaData.name
                    || (feedAddress.metaData.contractDetails
                      && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  name={name}
                  item={item}
                  key={index}
                />);
            }

            if (item.dataType === 'Token') {
              return (
                <FeedTileToken
                  currentAddress={currentAddress}
                  metaDataName={feedAddress.metaData
                  && (feedAddress.metaData.name
                    || (feedAddress.metaData.contractDetails
                      && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  item={item}
                  key={index}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  name={name}
                />);
            }

            if (item.dataType === 'Txs') {
              return (
                <FeedTileTXS
                  currentAddress={currentAddress}
                  item={item}
                  key={index}
                  metaDataName={feedAddress.metaData
                  && (feedAddress.metaData.name
                    || (feedAddress.metaData.contractDetails
                      && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  name={name}
                />);
            }

            if (!item.spaceName && item.dataType === 'Public') {
              return (
                <FeedTileActivity
                  item={item}
                  key={index}
                  verifiedGithub={verifiedGithub}
                  verifiedTwitter={verifiedTwitter}
                />);
            }

            if (!item.spaceName && item.dataType === 'Private') {
              return (
                <FeedTileActivity
                  verifiedEmail={verifiedEmail}
                  item={item}
                  key={index}
                />);
            }

            if (item.spaceName) {
              return (
                <FeedTileSpace
                  item={item}
                  key={index}
                />);
            }
          })()
        ))
      }

    </React.Fragment>
  );
}

ActivityTiles.propTypes = {
  feedAddress: PropTypes.object,
  verifiedGithub: PropTypes.string,
  verifiedEmail: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
};

ActivityTiles.defaultProps = {
  feedAddress: {},
  name: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  currentAddress: '',
};
