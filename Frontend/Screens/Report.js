import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Report() {

  const back_arrow_icon = require("../assets/back_arrow_icon.png")
  // {route}
  const navigation = useNavigation();
  // var posts=[];
  const [posts, setposts] = useState([]);
  const Check = async () => {
    const ip = await AsyncStorage.getItem('@Data_Ip')
    const ip_add = JSON.parse(ip)
    console.log(ip_add['ip'])
    fetch('http://' + ip_add['ip'] + '/api/Repupload', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)


        setposts(responseJson)
        // navigation.navigate("Report", { posts } )

      })
      .catch((error) => {
        console.error(error);
      });

  }

  useEffect(() => {
    Check();
  }, []);
  return (

    <ScrollView>

      <TouchableOpacity
        style={{ marginLeft: 20, marginTop: 55 }}
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
      <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 30, marginLeft: 150 }} >Report</Text>
      {posts.map(post => (
        <TouchableOpacity key={post.id} style={styles.post}>
          <Image source={{ uri: post.Result }} style={styles.postImage} />
          <View style={styles.postContent}>
            <Text style={styles.postMeta}>
              Crowd Type {post.crowdtype}| Crowd Count {post.crowdcount}
            </Text>

          </View>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postContent: {
    padding: 20,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postMeta: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  postExcerpt: {
    fontSize: 14,
  },
});

export default Report;