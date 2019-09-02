export {
  addressResolver,
  checkSubdomainOwner,
  newSubdomain
} from './ensFunctions';
export {
  resetAction,
  resetWithStackAction,
  navigate,
  backAction,
  setParamsAction,
  setContainer
} from './navigationWrapper';

export { networkArray } from './networkArray';
export {
  color,
  fontSize,
  text,
  navbar,
  nextup,
  listheader,
  talkPaneAndroidMinScrollAreaHeight,
} from './themes';

export { dateFormatter, timeSince } from './time';

// We should move addDataType and updateFeed functions to another util file.
export const addDataType = (activity) => {
  activity.internal = activity.internal.map(object => Object.assign({
    dataType: 'Internal',
  }, object));
  activity.txs = activity.txs.map(object => Object.assign({
    dataType: 'Txs',
  }, object));
  activity.token = activity.token.map(object => Object.assign({
    dataType: 'Token',
  }, object));

  return activity;
};

export const updateFeed = (otherProfileAddress, feedByAddress, addressData, isContract) => {
  let contractArray = [];
  let counter = 0;
  if (feedByAddress.length === 0) fireDispatch(otherProfileAddress, feedByAddress);
  feedByAddress.map(async (txGroup, i) => {
    const otherAddress = Object.keys(txGroup)[0];

    if (isContract[otherAddress]) { // then address is contract
      const contractDataABI = addressData[otherAddress].contractData;

      if (contractDataABI) {
        abiDecoder.addABI(contractDataABI);
        txGroup[otherAddress].map((lineItem, index) => {
          const methodCall = abiDecoder.decodeMethod(txGroup[otherAddress][index].input);
          lineItem.methodCall = methodCall && methodCall.name && (methodCall.name.charAt(0).toUpperCase() + methodCall.name.slice(1)).replace(/([A-Z])/g, ' $1').trim();
        });
      }

      contractArray = imageElFor(otherAddress);

      feedByAddress[i].metaData = {
        contractImg: contractArray.length > 0 && contractArray[0],
        contractDetails: contractArray.length > 0 && contractArray[1],
      };

      counter += 1;
      if (counter === feedByAddress.length) fireDispatch(otherProfileAddress, feedByAddress);
    } else { // look for 3box metadata
      feedByAddress[i].metaData = {
        name: addressData && addressData[otherAddress] && addressData[otherAddress].name,
        image: addressData && addressData[otherAddress] && addressData[otherAddress].image,
      };
      counter += 1;
      if (counter === feedByAddress.length) fireDispatch(otherProfileAddress, feedByAddress);
    }
  });
};

export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;
