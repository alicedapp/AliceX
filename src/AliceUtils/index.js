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
