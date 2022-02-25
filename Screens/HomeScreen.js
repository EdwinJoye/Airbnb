import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";

export default function HomeScreen({ props }) {
  const navigation = useNavigation();
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
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        // console.log(response.data);
        // navigation.navigate("SignIn");
      } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        console.log(data);
      }
    };
    fetchData();
  }, []);

  //CREATION D'UN TABLEAU POUR RECUPERER LES ETOILES//
  const generateStars = (numberOfStars) => {
    let starsArrays = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        starsArrays.push(
          <Entypo name="star" size={22} color="#DAA520" key={i} />
        );
      } else {
        starsArrays.push(<Entypo name="star" size={22} color="grey" key={i} />);
      }
    }
    return starsArrays;
  };
  return !isLoading ? (
    <ActivityIndicator size="small" color="#0000ff" />
  ) : (
    <View style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "grey",
          marginBottom: 10,
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
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                    title: item.title,
                    location: item.location,
                    photo: item.user.account.photo.url,
                    photo2: item.photos[0],
                  });
                }}
              >
                <Text style={{ flexDirection: "column", paddingTop: 20 }}>
                  <View>
                    <ImageBackground
                      source={item.photos[0]}
                      style={{
                        height: 200,
                        width: Dimensions.get("window").width * 0.9,
                        justifyContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          height: 40,
                          width: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ color: "white" }}>{item.price}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 80,
                      paddingTop: 5,
                      borderBottomColor: "grey",
                      borderBottomWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        height: 80,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ overflow: "scroll", width: 245 }}
                      >
                        {item.title}
                      </Text>
                      <Text>{item.reviews} reviews</Text>
                      <View style={{ flexDirection: "row" }}>
                        {generateStars(item.ratingValue)}
                      </View>
                    </View>
                    <View style={{ height: 80 }}>
                      <Image
                        style={{
                          borderRadius: 50,
                        }}
                        source={{
                          height: 70,
                          width: 70,
                          uri: item.user.account.photo.url,
                        }}
                      />
                    </View>
                  </View>
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
