import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appUser, setappUser] = useState();

  return (
    <AppContext.Provider value={{ appUser, setappUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

const styles = StyleSheet.create({});
