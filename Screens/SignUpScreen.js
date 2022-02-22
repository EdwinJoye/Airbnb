import { useNavigation } from "@react-navigation/core";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function SignUpScreen({
  usernameValue,
  setUsername,
  emailValue,
  setEmail,
  passwordValue,
  setPassword,
  confirmpasswordValue,
  setConfirmpassword,
  setformulaire,
  formulaire,
}) {
  const handleSubmit = (event) => {
    confirmpasswordValue &&
    passwordValue &&
    confirmpasswordValue === passwordValue
      ? setformulaire(true)
      : alert("Vos deux mots de passe ne sont pas identiques");
    event.preventDefault();
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
            placeholder="Email"
          />
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            placeholder="Username"
          />
          <TextInput
            placeholder="Describe yourself in a few words..."
            style={{
              borderColor: "#eb5a62",
              borderWidth: 1,
              marginBottom: 20,
              height: 80,
            }}
          ></TextInput>
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            style={{
              padding: 10,
              borderBottomColor: "#eb5a62",
              borderBottomWidth: 1,
              marginBottom: 30,
            }}
            placeholder="Confirm password"
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
              <Button title="Sign" />
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
