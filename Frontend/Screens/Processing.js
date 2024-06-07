import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

function Processing({ route }) {
    const navigation = useNavigation();
    const Check = async () => {
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        fetch('http://'+ip_add['ip'] +'/api/Check/'+route.params.ID, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // storeData(route.params.ID) 
                navigation.navigate("Upload")

            })
            .catch((error) => {
                console.error(error);
            });
    
      }
    
      useEffect(() => {
        Check();
      }, []);
    return (
        <LottieView style={styles.Anistyle} source={require('../assets/id1')} autoPlay />

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    Anistyle: {
        position: 'absolute',
        alignSelf: 'center',
        height: 240,
        // marginBottom:12,
        marginTop: 80,
    },



});

export default Processing;