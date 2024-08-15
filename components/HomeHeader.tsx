import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { images, screens } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";

const HomeHeader = ({ navigation, onImagePress }) => {
  const { appUser } = useContext(AppContext);

  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("user").then(() => {
      navigation.navigate(screens.Signin);
    });
  };
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {appUser && appUser?.photo ? (
        <TouchableOpacity onPress={onImagePress}>
          {appUser && appUser?.photo && (
            <Image
              source={{ uri: appUser?.photo }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: "lightgray",
              }}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onImagePress}>
          <Ionicons name="person-circle-outline" size={30} />
        </TouchableOpacity>
      )}
      {/* <Text style={{ fontWeight: "bold", fontSize: 17 }}>{appUser?.email}</Text> */}
      <View style={{}}>
        <Image
          source={images.fcTextLogo}
          style={{ height: 10, width: 130, alignSelf: "center" }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.Inbox);
          }}
          style={{ marginRight: 10 }}
        >
          <Ionicons color={"black"} size={27} name="chatbox-ellipses-outline" />
        </TouchableOpacity>

        <TouchableOpacity style={{}}>
          <Ionicons size={27} name="notifications-outline" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
