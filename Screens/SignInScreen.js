import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { axios } from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function SignInScreen(setUser) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        " https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
        <View>
          <View
            style={{
              height: 200,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 50,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../img/airbnb.png")}
              style={{ marginBottom: 10 }}
            ></Image>
            <Text
              style={{ color: "#8B8B8B", fontSize: 18, fontWeight: "bold" }}
            >
              Sign In
            </Text>
          </View>

          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            secureTextEntry={true}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 200,
                borderRadius: 50,
                borderColor: "#eb5a62",
                borderWidth: 2,
                marginBottom: 20,
                padding: 10,
                marginTop: 10,
              }}
            >
              <Button onPress={handleSubmit} title="Sign" />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: "grey", fontSize: 12 }}>
                No account ? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
