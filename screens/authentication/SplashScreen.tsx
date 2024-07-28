import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
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
  // const navigation = useNavigation();

  const getUser = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setappUser(docSnap.data());
    }
  };

  const checkUser = async () => {
    setTimeout(async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");

        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          setappUser(user);

          console.log("From Splash", user?.email);

          // Fetch the latest user data from Firebase
          await getUser(user.email);

          // Navigate to the home screen
          navigation.navigate("HomeStack");

          return true;
        }

        // If no user data is found, navigate to the Auth screen
        navigation.navigate(screens.AuthScreen);
        return false;
      } catch (e) {
        console.log(e);
        navigation.navigate(screens.AuthScreen);
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
