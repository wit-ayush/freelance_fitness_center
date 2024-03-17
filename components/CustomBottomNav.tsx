import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { images, screens } from "../utils/constants";
import { AppContext } from "../context/AppContext";

const CustomBottomNav = ({
  navigation,
  activeScreen,
  setActiveScreen,
}: {
  navigation;
  activeScreen;
  setActiveScreen;
}) => {
  const Icon = ({
    title,
    onClick,
    image,
  }: {
    title: string;
    onClick?: Function;
    image?: any;
  }) => {
    return (
      <TouchableOpacity onPress={onClick} style={{ alignItems: "center" }}>
        <Image
          style={{ height: 30, width: 30, alignSelf: "center" }}
          source={image}
        />
        <Text style={{ marginTop: 4, textAlign: "center" }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const { appUser } = useContext(AppContext);

  return (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        width: "100%",
        bottom: 0,
        backgroundColor: "white",
        paddingTop: 10,
        height: 80,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Icon
          onClick={() => {
            setActiveScreen(screens.HomeScreen);

            if (appUser?.isTrainer) {
              setActiveScreen(screens.TrainerHome);
            } else {
              setActiveScreen(screens.HomeScreen);
            }
          }}
          title={"Home"}
          image={images.homeIcon}
        />
        <Icon
          title={"Diary"}
          onClick={() => {
            setActiveScreen(screens.DiaryLog);
          }}
          image={images.diary}
        />
        <Icon title={"Posts"} image={images.postIcon} />
        <Icon
          onClick={() => {
            setActiveScreen(screens.PlanScreen);
          }}
          title={"Plans"}
          image={images.planIcon}
        />
        <Icon
          onClick={() => {
            setActiveScreen(screens.UserProfile);
          }}
          title={"Profile"}
          image={images.profileIcon}
        />
      </View>
    </View>
  );
};

export default CustomBottomNav;

const styles = StyleSheet.create({});
