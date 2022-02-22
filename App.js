import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [formulaire, setformulaire] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIp">
          {(props) => <SignInScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => (
            <SignUpScreen
              {...props}
              setUsername={setUsername}
              usernameValue={username}
              setEmail={setEmail}
              emailValue={email}
              setPassword={setPassword}
              passwordValue={password}
              setConfirmpassword={setConfirmpassword}
              confirmpasswordValue={confirmpassword}
              setformulaire={setformulaire}
              formulaire={formulaire}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
