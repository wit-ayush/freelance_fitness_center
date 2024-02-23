import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { BallIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const { appuser, setappUser } = useContext(AppContext);

  const checkUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");

      if (jsonValue) {
        setappUser(JSON.parse(jsonValue));
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    checkUser();

    setTimeout(() => {
      if (appuser && appuser?.name) {
        navigation.navigate("HomeStack");
      } else {
        navigation.navigate(screens.AuthScreen);
      }
    }, 3000);
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
