import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/authentication/SplashScreen";
import AuthStack from "./screens/authentication/AuthStack";
import AppProvider from "./context/AppContext";
import HomeStack from "./screens/home/HomeStack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />

        <Stack.Navigator>
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
