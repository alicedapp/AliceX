import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const Compound = () => {
  const [data, setData] = useState({});
  const [account, setAccount] = useState({});
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let compoundData = await fetch("https://api.compound.finance/api/v2/account?address=0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB");
    const rawData = await compoundData.json();
    const {accounts} = rawData;
    const address = accounts[0];
    const {tokens} = address;
    setTokens(tokens);
    console.log('COMPOUND DATA: ', address);
    console.log('COMPOUND TOKENS: ', tokens);
    setData({data});
  };

  return (
    <View>
      {tokens.map((token, i) => {
        return (<Text key={i}>{JSON.stringify(token)}</Text>)
      })}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  )
}

export default Compound;
