import React, { useState, useContext ,useEffect} from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl, Button, Image, Text, LogBox, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackgroundImage from '../assets/icon.png';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import SourceSansProLight from '../assets/Font/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../assets/Font/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../assets/Font/SourceSansPro-Bold.ttf';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
function Upload() {
    const [text, onChangeText] = useState("");
    const back1 = require("../assets/Mainicon.png");
    const [image, setImage] = useState(null);
    const [ID, setId] = useState(null);
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const [isLoading1, setisLoading1] = useState(false);
    const [isLoading2, setisLoading2] = useState(false);
    const postToServer = async (img) => {
        console.log("hello")
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
                console.log("Hello")
                setisLoading1(false)
                setisLoading2(false)
                navigation.navigate("Processing", { "ID": responseJson["id"] })
                

            })
            .catch((error) => {
               
            });
            
    }

    const pickImage = async () => {
        setisLoading1(true)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setImage(null)
            setImage(result.assets[0].uri);
            postToServer(result)            
            

        }
    };
    const getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }
    };
    const pickImageFromCamera = async () => {
        setisLoading2(true)
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            postToServer(result) 
            setisLoading2(false)
            // navigation.navigate("Pro", { "ID": result })
        }
    };
    useEffect(() => {
        getCameraPermission();
    }, []);
    

    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });
    if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    // marginLeft:20,
                    alignItems: 'center',
                    position: 'absolute',
                    height: 250,
                    marginTop: 20, marginLeft: 130,
                    resizeMode: 'contain'
                }}
                source={back1}
            />
            <Text style={{ fontFamily: 'SourceSansProBold', fontSize: 20, marginTop: 240, color: '#6b4eff', marginLeft: 130 }} onPress={() => navigation.navigate("Upload")} >
                {'Crowd Counter'}
            </Text>
            <TouchableOpacity
                style={styles.btn1}
                activeOpacity={0.5}
                onPress={pickImageFromCamera}
            >
                {isLoading2 == false ? <Text style={styles.buttonTextStyle}>Camera</Text> : <ActivityIndicator size="small" color="#000000" />}


            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={pickImage}
            >
                {isLoading1 == false ? <Text style={styles.buttonTextStyle}>Add Image</Text> : <ActivityIndicator size="small" color="#000000" />}


            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Report")}>
                <Text style={{ color: '#6b4eff', fontFamily: 'SourceSansProBold', fontSize: 17 }}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('How')}>
                <Text style={{ color: '#6b4eff', fontFamily: 'SourceSansProBold', fontSize: 17 }}>How To Use</Text>
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
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'SourceSansProBold',
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
        marginTop: 30,

    },
    btn1: {
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
export default Upload;
