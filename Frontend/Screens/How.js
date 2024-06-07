import React, { useState, useContext } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import BackgroundImage from '../assets/icon.png';

import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { useNavigation } from '@react-navigation/native';
function How() {
    const navigation = useNavigation();
    const back1 = require("../assets/Mainicon.png");
    const back_arrow_icon = require("../assets/back_arrow_icon.png")
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });
    if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={{ marginLeft: 10, marginTop: 35 }}
                onPress={() => navigation.navigate("Upload")}
            >
                <Image
                    source={back_arrow_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    // marginLeft:20,
                    height: 250, marginTop: 20, marginLeft: 110,
                    resizeMode: 'contain'
                }}
                source={back1}
            />
            <Text style={{ fontFamily: 'SourceSansProBold', fontSize: 20, marginTop: -40, color: '#6b4eff', marginLeft: 110 }} onPress={() => navigation.navigate("Upload")} >
                {'Crowd Counter'}
            </Text>

            <Text style={{ fontFamily: 'SourceSansProRegular', fontSize: 15, marginTop: 13, marginLeft: 70 }}>
                1. Select the image from gallery you want to count crowd of
            </Text>
            <Text style={{ fontFamily: 'SourceSansProRegular', fontSize: 15, marginTop: 13, marginLeft: 70 }}>
                2. After selecting the image simply press “crowd count” button
            </Text>
            <Text style={{ fontFamily: 'SourceSansProRegular', fontSize: 15, marginTop: 13, marginLeft: 70 }}>
                3. Report will be generated after processing
            </Text>


        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 17,
        fontSize: 16,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        marginLeft: 40
    },
    btn: {
        backgroundColor: '#6b4eff',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 55,

    },
    btn2: {
        backgroundColor: '#6b4eff',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,

    },
    Anistyle: {
        position: 'absolute',
        alignSelf: 'center',
        height: 200,
        marginBottom: 12,
        marginTop: 50,


    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 30,
        padding: 5,
        borderWidth: 1,

        height: 50,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 30,

        borderColor: '#6b4eff',
    },
});
export default How;






