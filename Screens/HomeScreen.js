import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [data, setData] = useState();
  const getData = async (token) => {
    if (token) {
      await AsyncStorage.setItem();
    }
    // je recuprere mon token
    const myToken = await AsyncStorage.get("mytoken");
    // je fait ma request de biens airbnb avec axios et mon token dans les parans header
    // ICI =>
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token === null) {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms`
          );
          setData(response.data);
        } else {
          navigation.navigate("SignIn");
        }
      } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        console.log(data);
      }
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <ActivityIndicator size="small" color="#0000ff" />
  ) : (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "yellow",
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../img/airbnb.png")}
          style={{ marginBottom: 10, height: 40 }}
        ></Image>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log(data);
            return (
              <View style={styles.offerContainer}>
                <Text>
                  <Text style={styles.title}>{item.title}</Text>;
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.reviews}>{item.reviews} reviews</Text>
                </Text>
                <Image
                  style={styles.illustration}
                  source={item.user.account.photo.url}
                />
                <Image style={styles.avatar} source={item.photos[0]} />
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
