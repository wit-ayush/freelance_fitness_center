import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/authentication/SplashScreen";
import AuthStack from "./screens/authentication/AuthStack";
import AppProvider from "./context/AppContext";
import HomeStack from "./screens/home/HomeStack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { screens } from "./utils/constants";
import PaymentScreen from "./screens/authentication/PaymentScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <StripeProvider publishableKey="pk_test_51OfpGCCm75vwzAvzWZhqlCSipLrIff087TuIbTxu1qoOV9WHrOpZ1eOdcPQVBSME8SsnV539S2z0BRGJDnverNQR00nnrhkK8D">
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="auto" />

          <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
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
    </StripeProvider>
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
