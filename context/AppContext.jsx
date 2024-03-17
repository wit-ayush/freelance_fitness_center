import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appUser, setappUser] = useState(null);
  const [isTrainer, setisTrainer] = useState("");
  const [trainerData, settrainerData] = useState();

  const saveCookie = async () => {
    try {
      const jsonValue = JSON.stringify(appUser);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async () => {
    if (appUser) {
      const docRef = doc(db, "users", appUser?.email);
      const docSnap = await getDoc(docRef);
      await saveCookie();

      if (docSnap.exists()) {
        await setappUser(docSnap.data());
      }
    }
  };

  const checkTrainer = async () => {
    console.log(appUser.trainer);
    if (appUser?.isTrainer != true) {
      setisTrainer(false);
      console.log(appUser?.trainer);
      const docRef = doc(db, "users", appUser?.trainer);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await settrainerData(docSnap.data());

        console.log(
          "Document Trainer data:",
          docSnap.data().name.toLowerCase()
        );
        console.log(docSnap.data());
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document! : from Context");
        return null;
      }
    } else {
      setisTrainer(true);
    }
  };
  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        appUser,
        setappUser,
        isTrainer,
        trainerData,
        checkTrainer,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const styles = StyleSheet.create({});
