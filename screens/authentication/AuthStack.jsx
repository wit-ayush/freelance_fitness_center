import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./AuthScreen";
import SplashScreen from "./SplashScreen";
import { screens } from "../../utils/constants";
import QuestionScreen from "./QuestionScreen";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name={screens.SplashScreen}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.AuthScreen}
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.Question}
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
