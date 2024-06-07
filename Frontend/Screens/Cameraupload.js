import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

function Cameraupload(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        getCameraPermission();
    }, []);
    const getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }
    };
    const pickImageFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            // uploadImage(result.uri);
        }
    };

    const uploadImage = async (imageUri) => {
        const apiUrl = 'https://your-django-api-endpoint.com/upload-image';

        // Create a FormData object to send the image file
        let formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpg',
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            console.log(data); // Handle the server response
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={styles.container}>
        <Button title="Take Photo" onPress={pickImageFromCamera} />
  
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 16,
    },
  });
export default Cameraupload;