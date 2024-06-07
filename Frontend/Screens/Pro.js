import React, { useState, useContext } from 'react';
import { StyleSheet,ActivityIndicator, Image, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import BackgroundImage from '../assets/icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { useNavigation } from '@react-navigation/native';
function Pro({ route }) {
    const navigation = useNavigation();
    const back1 = require("../assets/Mainicon.png");
    const back_arrow_icon = require("../assets/back_arrow_icon.png")
    const [isLoading1, setisLoading1] = useState(false);

    // onPress={() => navigation.navigate("Processing", { "ID": route.params.ID })}
    const postToServer = async (img) => {
        setisLoading1(true)
        const ip = await AsyncStorage.getItem('@Data_Ip')
        const ip_add = JSON.parse(ip)
        const formData = new FormData();
        let name_pic = "Testing" + ".jpg"
        formData.append()
        formData.append(
            'file', {
            uri: img.uri,
            type: 'image/${img.type}',
            name: name_pic
        }
        )
        const options = {
            method: 'POST',
            body: formData,
            // If you add this, upload won't work
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        fetch('http://' + ip_add['ip'] + '/api/Repupload/', options)
            .then((response) => response.json())
            .then((responseJson) => {
                setisLoading1(false)
                navigation.navigate("Processing", { "ID": responseJson["id"] })
                // navigation.navigate("Processing", { "ID": 10 })
                // console.log(responseJson)

            })
            .catch((error) => {
                // setisLoading(false)
                // console.error(error);
            });
            
    }
    
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
                    alignItems: 'center',
                    position: 'absolute',
                    height: 250, marginTop: 20, marginLeft: 120,
                    resizeMode: 'contain'
                }}
                source={back1}
            />
            <Text style={{ fontFamily: 'SourceSansProBold', alignItems: 'center', fontSize: 20, marginTop: 180, color: '#6b4eff', marginLeft: 120 }}  >
                {'Crowd Counter'}
            </Text>

            <Text style={{ fontFamily: 'SourceSansProRegular', color: '#6b4eff', fontSize: 30, marginTop: 50, marginLeft: 70 }}>
                1 Image is Selected
            </Text>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => postToServer(route.params.ID)}
            >
                
                {isLoading1 == false ? <Text style={styles.buttonTextStyle}>Crowd Count</Text> : <ActivityIndicator size="small" color="#000000" />}



            </TouchableOpacity>


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
        paddingVertical: 13,
        fontSize: 16,
        fontFamily: 'SourceSansProBold'
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
        marginLeft: 75,
        marginRight: 45,
        marginTop: 55,

    },
    btn2: {
        backgroundColor: '#6b4eff',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 30,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 15,
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

export default Pro;