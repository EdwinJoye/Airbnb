import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";
import { ScrollView } from "react-native-web";

const RoomScreen = ({ route }) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    console.log("route==", route.params.id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );

        console.log("pass2", response.data);
        setData(response.data);

        console.log("pass3", data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          console.log("On passe à la suite");
          const location = await Location.getCurrentPositionAsync();

          setLatitude(route.params.location[0]);
          setLongitude(route.params.location[1]);
        } else {
          alert("Permission Refusée !");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    getPermission();
  }, []);

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

  return isLoading ? (
    <ActivityIndicator size="small" color="#0000ff" />
  ) : (
    <View>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
        data={data.photos}
        renderItem={({ item }) => (
          <Image
            style={{ width: Dimensions.get("window").width, height: 240 }}
            source={{ uri: item.url }}
          ></Image>
        )}
      />
      <Text style={{ color: "white" }}>{data.price}</Text>
      <View style={{ marginTop: 20, backgroundColor: "yellow" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 300 }}>
            <Text numberOfLines={1} style={{ fontSize: 20 }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                {generateStars(data.ratingValue)}
              </View>
              <Text>{data.reviews} reviews</Text>
            </View>
          </View>
          <Image
            style={{ height: 70, width: 70, borderRadius: 50 }}
            source={{ uri: route.params.photo }}
          ></Image>
        </View>
        <Text
          style={{
            height: 100,
            fontSize: 15,
            fontWeight: "500",
            overflow: "scroll",
          }}
        >
          {data.description}
        </Text>

        <MapView
          style={{ height: 220, width: Dimensions.get("window").width }}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>

      <Text>{data.price}</Text>
    </View>
  );
};

export default RoomScreen;
