import React, {useState, useEffect} from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Widget from "../../Components/Widget";


const Maker = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetchData();
  },[]);

  const fetchData = async () => {
    const blockOptions = {};
    const account = "0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB";
  };

  return (
    <View>
      <Widget
        contentVisible={false}
        backgroundColor='#1DAB9A'
        image={require('./maker-logo.png')}
      >
        <ScrollView style={{height: 100, backgroundColor: '#070a0e', borderRadius: 20 }}>
          {data.map((token, i) => {
            return (
              <View>
                <Text key={i}>{JSON.stringify(token)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </Widget>
    </View>

  )
};

export default Maker;

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 60,
  },
  dropDownItem: {
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  header: {
    height: 35,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 12,
    color: 'rgb(74,74,74)',
    marginRight: 60,
    flexWrap: 'wrap',
  },
  txt: {
    fontSize: 14,
  },
});
