import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { screens } from "../../utils/constants";
import { LinearGradient } from "expo-linear-gradient";

const AuthScreen = ({ navigation }) => {
  return (
    <View>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#0086C9"]}
        style={{ height: "100%", width: "100%", justifyContent: "center" }}
      >
        <Image
          style={{
            alignSelf: "center",
          }}
          source={require("../../assets/images/splashLogo.png")}
        />
        <View
          style={{
            justifyContent: "center",
            position: "absolute",
            bottom: "10%",
            width: "100%",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              marginTop: 20,
            }}
          >
            <CustomButton
              onClick={() => navigation.navigate(screens.Question)}
              title={"Sign Up"}
              textColor={"white"}
              colors={["#4c669f", "#3b5998", "#192f6a"]}
            />
            <CustomButton
              title={"Login"}
              textColor={"black"}
              colors={["#fff", "#fff", "#fff"]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
