import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BallIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils/constants";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(screens.AuthScreen);
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0086C9",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          alignSelf: "center",
          position: "absolute",
          top: -50,
          left: -40,
          opacity: 0.7,
        }}
        source={require("../../assets/images/splashRunner.png")}
      />

      <Image
        style={{
          alignSelf: "center",
        }}
        source={require("../../assets/images/splashLogo.png")}
      />
      <BallIndicator
        color="white"
        style={{ position: "absolute", bottom: 50, alignSelf: "center" }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
