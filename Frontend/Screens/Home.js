import React, { useState, useContext } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import BackgroundImage from '../assets/icon.png';
import { useFonts } from 'expo-font';

import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import NunitoSansBlackItalic from '../assets/fonts/NunitoSans-BlackItalic.ttf';

import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const back1 = require("../assets/Mainicon.png");

  const [loaded] = useFonts({
    SourceSansProLight,
    SourceSansProRegular,
    SourceSansProBold,
    NunitoSansBlackItalic,
  });
  if (!loaded || !BackgroundImage) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container} >
      <Image
        style={{
          width: 350,
          height: 351,
          // marginLeft:20,
          height: 250, marginTop: -300, marginLeft: 10,
          resizeMode: 'contain'
        }}
        source={back1}
      />
      <Text style={{ fontFamily: 'SourceSansProBold', fontSize: 40, marginTop: 20, color: '#6b4eff', marginLeft: 13 }} onPress={() => navigation.navigate("Upload")} >
        {'Crowd Counter'}
      </Text>
      <Text style={{ fontFamily: 'SourceSansProLight', fontSize: 10, marginTop: 20, marginLeft: 30 }} onPress={() => navigation.navigate("Ipsaver")}>
        {' Set IP Address '}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;