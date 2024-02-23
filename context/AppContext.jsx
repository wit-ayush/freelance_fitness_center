import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appUser, setappUser] = useState(null);
  const [isTrainer, setisTrainer] = useState("");
  const [trainerData, settrainerData] = useState();

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
  useEffect(() => {
    checkTrainer();
    console.log(isTrainer);
  }, [isTrainer]);

  return (
    <AppContext.Provider
      value={{ appUser, setappUser, isTrainer, trainerData, checkTrainer }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const styles = StyleSheet.create({});
