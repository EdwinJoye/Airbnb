import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { StyleSheet } from "react-native-web";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("myToken", token);
    } else {
      await AsyncStorage.removeItem("myoken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("myToken");
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Tab.Screen name="Home">
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Stack.Screen name="SignIn">
          {(props) => <SignInScreen {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => <SignUpScreen {...props} setToken={setToken} />}
        </Stack.Screen>
        {/* <Tab.Screen name="My profile"></Tab.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const style = StyleSheet.create({
  scrollView: {
    margintop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

export default App;
