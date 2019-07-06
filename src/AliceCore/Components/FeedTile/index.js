import React from 'react';
import PropTypes from 'prop-types';
import tokenToData from '../../../AliceUtils/tokenToData.json';

import Save from '../../../AliceAssets/share.png';
import FeedTileContext from './FeedTileContext';
import Tokens from '../../../AliceAssets/status-logo.png';

export const FeedTileActivity = ({ item, verifiedGithub, verifiedTwitter, verifiedEmail }) => (
  <View style={{flex: 1}}>
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{width: 20, height: 20, backgroundColor: 'orange'}} />
        <Text style={{flex: 1}}>
          <Text style={{flex: 1}}>
            {` You
            ${item.op === 'PUT' ? 'updated your' : 'removed your'}
            ${(item.key !== 'proof_twitter' && item.key !== 'proof_github' && item.key !== 'proof_email' && item.dataType !== 'Private')
              ? (item.key).replace(/([A-Z])/g, ' $1').trim().toLowerCase()
              : ''}
            `}
            {(item.op === 'PUT' && item.key !== 'proof_github' && item.key !== 'proof_twitter' && item.key !== 'proof_email') ? 'to' : ''}
          </Text>

          {item.op === 'PUT' ? (
            <Text style={{flex: 1}}>
              {(item.key === 'image' || item.key === 'coverPhoto')
                ? '' : ''}
              {item.key === 'emoji'
                ? (
                  <Text style={{flex: 1}}>
                    {typeof item.value === 'object' ? Object.keys(item.value)[0] : item.value}
                  </Text>
                ) : ''}
              {item.key === 'proof_github'
                ? verifiedGithub : ''}
              {item.key === 'proof_twitter'
                ? verifiedTwitter : ''}
              {item.key === 'proof_email'
                ? verifiedEmail : ''}

              {(typeof item.value === 'object' && (item.key !== 'image' && item.key !== 'coverPhoto'))
                ? (item.value ? Object.keys(item.value)[0] : '-----')
                : ''}

              {typeof item.value === 'string' && item.key !== 'emoji' && (item.key !== 'proof_github' && item.key !== 'proof_twitter' && item.key !== 'proof_email')
                ? item.value : ''}
            </Text>) : ''}
        </Text>
      </View>
      <FeedTileContext item={item} />
    </View>
  </View>
);

FeedTileActivity.propTypes = {
  item: PropTypes.object,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  verifiedEmail: PropTypes.string,
};

FeedTileActivity.defaultProps = {
  item: {},
  verifiedGithub: '',
  verifiedTwitter: '',
  verifiedEmail: '',
};

export const FeedTileInternal = ({ item, name, onOtherProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <TouchableOpacity onPress={() => console.log(`https://etherscan.io/tx/${item.hash}`)}>
    <View style={{flex: 1}}>

      <View style={{flex: 1}}>
        {(item.tokenSymbol && (
          ((tokenToData[item.tokenSymbol])
            ? <View style={{width: 20, height: 20, backgroundColor: 'blue'}} />
            : <View style={{width: 20, height: 20, backgroundColor: 'green'}} />)
        ))}

        {(item.value === '0' && contractImg)
        && <View style={{width: 20, height: 20, backgroundColor: 'pink'}} />
        }

        {(item.value === '0' && !contractImg)
        && (
          <Text style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
            0x
          </Text>
        )
        }

        {(item.value !== '0' && !item.tokenSymbol)
        && <View style={{width: 20, height: 20, backgroundColor: 'orange'}} />
        }
        <View>
          <Text>
            {(onOtherProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onOtherProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </Text>

          {item.value !== '0' && (
            <Text title={(Number(item.value) / 1000000000000000000).toString()}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'ETH'}`}
            </Text>)}

          {item.value !== '0' && (
            <Text>
              {onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </Text>)}

          {(item.methodCall && item.value !== '0') && (
            <Text>
              {`for ${item.methodCall}`}
            </Text>
          )}
          {(item.methodCall && item.value === '0') && (
            <Text>
              {`${item.methodCall}`}
            </Text>
          )}
        </View>
      </View>
      <FeedTileContext item={item} />
    </View>
  </TouchableOpacity>
);

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
  contractImg: PropTypes.string,
};

FeedTileInternal.defaultProps = {
  item: {},
  metaDataName: '',
  name: '',
  contractImg: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};

export const FeedTileToken = ({ item, name, onOtherProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <TouchableOpacity onPress={() => console.log(`https://etherscan.io/tx/${item.hash}`)}>
    <div>
      <div>
        {
          (tokenToData[item.tokenSymbol])
            ? <img src={`/contractIcons/${tokenToData[item.tokenSymbol].logo}`} alt="token icon" />
            : <img src={Tokens} alt="Token Transaction Icon" />
        }

        {
          (item.value === '0' && contractImg)
          && <img src={contractImg} alt="token icon" />
        }

        {
          (item.value === '0' && !contractImg && !tokenToData[item.tokenSymbol])
          && (
            <Text>
              0x
            </Text>
          )
        }

        <p>
          <span>
            {(onOtherProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onOtherProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </span>
          {item.value !== '0' && (
            <span title={(Number(item.value) / 1000000000000000000).toString()}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'Tokens'}`}
            </span>)}

          {item.value !== '0' && (
            <span>
              {onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </span>)}
          {(item.methodCall && item.value !== '0') && (
            <span>
              {`for ${item.methodCall}`}
            </span>
          )}
          {(item.methodCall && item.value === '0') && (
            <span>
              {`${item.methodCall}`}
            </span>
          )}
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>
  </TouchableOpacity>
);

FeedTileToken.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImg: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileToken.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};

export const FeedTileTXS = ({ item, name, onOtherProfilePage, metaDataName, isFromProfile, contractImg }) => (
  <TouchableOpacity onPress={() => console.log(`https://etherscan.io/tx/${item.hash}`)}>
    <View style={{flex: 1}}>

      <View style={{flex: 1}}>
        {(item.tokenSymbol && (
          ((tokenToData[item.tokenSymbol])
            ? <View style={{width: 20, height: 20, backgroundColor: 'blue'}} />
            : <View style={{width: 20, height: 20, backgroundColor: 'green'}} />)
        ))}

        {(item.value === '0' && contractImg)
        && <View style={{width: 20, height: 20, backgroundColor: 'pink'}} />
        }

        {(item.value === '0' && !contractImg)
        && (
          <Text style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
            0x
          </Text>
        )
        }

        {(item.value !== '0' && !item.tokenSymbol)
        && <View style={{width: 20, height: 20, backgroundColor: 'orange'}} />
        }
        <View>
          <Text>
            {(onOtherProfilePage && item.value === '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }
            {(!onOtherProfilePage && item.value === '0') && (isFromProfile
              ? 'You performed the action'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} performed the action`)
            }

            {(onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? `${name || `${item.from.toLowerCase().substring(0, 12)}...`} sent`
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
            {(!onOtherProfilePage && item.value !== '0') && (isFromProfile
              ? 'You sent'
              : `${metaDataName || `${item.from.toLowerCase().substring(0, 12)}...`} sent`)
            }
          </Text>

          {item.value !== '0' && (
            <Text title={(Number(item.value) / 1000000000000000000).toString()}>
              {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol ? item.tokenSymbol : 'ETH'}`}
            </Text>)}

          {item.value !== '0' && (
            <Text>
              {onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to ${name || `${item.from.toLowerCase().substring(0, 12)}...`}`)
              }
              {!onOtherProfilePage && (isFromProfile
                ? `to ${metaDataName || `${item.to.toLowerCase().substring(0, 12)}...`}`
                : `to you`)
              }
            </Text>)}

          {(item.methodCall && item.value !== '0') && (
            <Text>
              {`for ${item.methodCall}`}
            </Text>
          )}
          {(item.methodCall && item.value === '0') && (
            <Text>
              {`${item.methodCall}`}
            </Text>
          )}
        </View>
      </View>
      <FeedTileContext item={item} />
    </View>
  </TouchableOpacity>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  metaDataName: PropTypes.string,
  contractImg: PropTypes.string,
  name: PropTypes.string,
  onOtherProfilePage: PropTypes.bool,
  isFromProfile: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  metaDataName: '',
  contractImg: '',
  name: '',
  onOtherProfilePage: false,
  isFromProfile: false,
};


export const FeedTileSpace = ({ item }) => (
  <div>
    <div>
      <div>
        <img src={Save} alt="Transaction Icon" />
        <p>
          You updated
          <span>
            {` ${item.key.substring(0, 7) === 'thread-' ? item.key.substring(7).replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase()) :
              (item.key).replace(/([A-Z])/g, ' $1').trim().toLowerCase()} `}
          </span>
          to
          <span>
            {` ${!Array.isArray(item.value) && item.value}`}
          </span>
        </p>
      </div>
      <FeedTileContext item={item} />
    </div>

    {(Array.isArray(item.value)
      && item.value
      && item.value.length > 0
      && item.value[0].contentUrl)
      ? (
        <img src={`https://ipfs.infura.io/ipfs/${item.value[0].contentUrl['/']}`}Z alt="profile" />
      ) : ''
    }
  </div>
);

FeedTileSpace.propTypes = {
  item: PropTypes.object,
};

FeedTileSpace.defaultProps = {
  item: {},
};
