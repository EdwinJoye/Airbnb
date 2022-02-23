import { useState } from "react";
import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (email && username && password && confirmPassword && description) {
        setError("");
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              password: password,
              description: description,
            }
          );
          navigation.navigate("Home");
          console.log(response.data);
          setToken(response.data.token);
        } else {
          ("les deux mots de passe ne sont pas identiques");
        }
      } else {
        setError("Tous les champs ne sont pas remplis");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
    }
    if (
      error.response.data.error === "This username already has an account" ||
      error.response.data.error === "This email already has an account."
    ) {
      setError(error.response.data.error);
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
        <View>
          <View
            style={{
              height: 150,
              alignItems: "center",
              justifyContent: "center",
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
              Sign Up
            </Text>
          </View>

          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 20,
            }}
            autoCapitalize="none"
            value={email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            autoCapitalize="none"
            value={username}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Describe yourself in a few words..."
            style={{
              borderColor: "#eb5a62",
              borderWidth: 1,
              marginBottom: 20,
              height: 80,
            }}
            autoCapitalize="none"
            value={description}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => setDescription(text)}
          ></TextInput>
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            autoCapitalize="none"
            value={confirmPassword}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(text) => setconfirmPassword(text)}
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
              <Button onPress={handleSubmit} title="Sign Up" />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={{ color: "grey", fontSize: 12 }}>
                Already Have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
