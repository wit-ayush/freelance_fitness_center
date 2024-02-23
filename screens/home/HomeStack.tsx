import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "../../utils/constants";
import HomeScreen from "./HomeScreen";
import Inbox from "./Inbox";
import ChatScreen from "./ChatScreen";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name={screens.HomeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.Inbox}
        component={Inbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.ChatScreen}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
