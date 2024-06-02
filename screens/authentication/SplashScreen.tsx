import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { BallIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const SplashScreen = ({ navigation }) => {
  const { appUser, setappUser } = useContext(AppContext);

  const getUser = async () => {
    if (appUser) {
      const docRef = doc(db, "users", appUser?.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setappUser(docSnap.data());
      }
    }
  };

  const checkUser = async () => {
    setTimeout(async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");

        if (jsonValue) {
          setappUser(JSON.parse(jsonValue));
          // await getUser();

          await console.log("From Splash", jsonValue);
          navigation.navigate("HomeStack");

          return true;
        }

        navigation.navigate(screens.AuthScreen);
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    }, 3000);
  };

  useEffect(() => {
    checkUser();
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
