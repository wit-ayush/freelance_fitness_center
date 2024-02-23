import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { images, screens } from "../../utils/constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { AppContext } from "../../context/AppContext";
import * as AppleAuthentication from "expo-apple-authentication";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = ({ navigation }) => {
  const { appUser, setappUser } = useContext(AppContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const saveCookie = async () => {
    try {
      const jsonValue = JSON.stringify(appUser);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (appUser) {
      console.log("User Found and logged in", appUser);
      saveCookie();
      navigation.navigate("HomeStack");
    }
  }, [appUser]);

  return (
    <SafeAreaView>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            marginLeft: 20,
          }}
          source={require("../../assets/images/dumbell.png")}
        />
        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
          Sign in
        </Text>
      </View>
      <View>
        <CustomInput
          label={"Email"}
          placeholder={"Enter Email"}
          value={email}
          onChangeText={setemail}
          type="email-address"
        />
        <CustomInput
          label={"Password"}
          placeholder={"Enter Password"}
          value={password}
          onChangeText={setpassword}
        />
        <CustomButton
          onClick={async () => {
            await signInWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {
                const user = userCredential.user;
                if (email == "trainer@gmail.com") {
                  const docRef = doc(db, "trainers", "khush");
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                    await setappUser(docSnap.data());
                    console.log("Document data:", docSnap.data());
                  } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                  }
                } else {
                  const docRef = doc(db, "users", email);
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                    await setappUser(docSnap.data());
                    console.log("Document data:", docSnap.data());
                  } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                  }
                }
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
              });
          }}
          title={"Sign in"}
          textColor={"white"}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.Signin);
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginTop: 15,
              color: "#344054",
              fontWeight: "700",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.Signup);
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Not a Member?
            <Text
              style={{
                textDecorationLine: "underline",
                color: "#344054",
                fontWeight: "700",
              }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center" }}>Or continue with</Text>
          <CustomButton
            onClick={undefined}
            title={"Sign up with Google"}
            textColor={"black"}
            colors={["#fff", "#fff"]}
            iconSource={images.googleSignIn}
          />
          {Platform.OS == "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              style={{
                width: "90%",
                height: 50,
                alignSelf: "center",
                marginTop: 10,
              }}
              cornerRadius={10}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  }).then((result) => {
                    console.log(result.fullName);
                  });
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    console.log(e);
                  } else {
                    console.log(e);
                  }
                }
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
