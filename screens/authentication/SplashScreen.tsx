import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { BallIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

const SplashScreen = ({ navigation }) => {
  const {
    appUser,
    setappUser,
    promoSections,
    setpromoSections,
    settingOptions,
    setsettingOptions,
    allPosts,
    setallPosts,
    userWorkoutLog,
    setuserWorkoutLog,
    trainerWorkoutLog,
    settrainerWorkoutLog,
  } = useContext(AppContext);
  // const navigation = useNavigation();

  const getUser = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setappUser(docSnap.data());
    }
  };
  const getHomePromo = async () => {
    const promos: any = [];
    const querySnapshot = await getDocs(collection(db, "home"));
    querySnapshot.forEach((doc) => {
      promos.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setpromoSections(promos);
  };
  const getSettings = async () => {
    const settings: any = [];
    const querySnapshot = await getDocs(collection(db, "settings"));
    querySnapshot.forEach((doc) => {
      settings.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    setsettingOptions(settings);
  };

  const getAllPosts = async () => {
    const allPostsInline: any = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      allPostsInline.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    setallPosts(allPostsInline);
  };

  const getAllWorkoutLogs = async () => {
    const workoutLogs = [];
    const query = collection(db, `workoutlogs/${appUser?.email}/logs`);
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach(async (doc) => {
      await workoutLogs.push({ id: doc.id, ...doc.data() });
      console.log(doc.data());
    });
    setuserWorkoutLog(workoutLogs);
    // console.log(workoutLogs);
  };

  const getTrainerLogs = async () => {
    const workoutLogs = [];
    const query = collection(db, `workoutlogs/${appUser?.email}/trainerLog`);
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach(async (doc) => {
      await workoutLogs.push({ id: doc.id, ...doc.data() });
      console.log(doc.data());
    });
    settrainerWorkoutLog(workoutLogs);
    // console.log(workoutLogs);
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
          await getHomePromo();
          await getSettings();
          await getAllPosts();
          await getAllWorkoutLogs();
          await getTrainerLogs();
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
