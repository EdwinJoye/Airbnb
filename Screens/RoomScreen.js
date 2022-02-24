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

export default function RoomScreen({ props }) {
  //route pour afficher la room voulue
  console.log(props.route);
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
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms`
        );
        setData(response.data);
        gation.navigate("SignIn");
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
      <View></View>
    </ScrollView>
  );
}
