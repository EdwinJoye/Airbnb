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
import RoomScreen from "./Screens/RoomScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Tab.Screen name="Haaa">
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Stack.Screen name="SignIn">
          {() => <SignInScreen setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {() => <SignUpScreen setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="My Room">
          {() => <RoomScreen setToken={setToken} />}
        </Stack.Screen>
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
