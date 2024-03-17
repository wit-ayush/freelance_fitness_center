import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "../../utils/constants";
import HomeScreen from "./HomeScreen";
import Inbox from "./Inbox";
import ChatScreen from "./ChatScreen";
import DiaryScreen from "./DiaryScreen";
import ExerciseSearch from "../workoutscreens/ExerciseSearch";
import PaymentScreen from "../authentication/PaymentScreen";
import PaymentConfirmation from "../authentication/PaymentConfirmation";
import PlanDetails from "./PlanDetails";
import AddWorkouts from "./AddWorkouts";

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
      <Stack.Screen
        name={screens.Diary}
        component={DiaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.ExerciseSearch}
        component={ExerciseSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.Payment}
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.PaymentConfirm}
        component={PaymentConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.PlanDetails}
        component={PlanDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.AddWorkouts}
        component={AddWorkouts}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
