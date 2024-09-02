import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
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
import { useSignIn } from "@clerk/clerk-expo";

const Signin = ({ navigation }) => {
  const { appUser, setappUser } = useContext(AppContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const getUser = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setappUser(docSnap.data());
      navigation.navigate("HomeStack");
    } else {
      Alert.alert("Error Occured");
    }
  };

  const saveCookie = async () => {
    try {
      const jsonValue = JSON.stringify(appUser);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const { signIn, setActive, isLoaded } = useSignIn();

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        await getUser(email);
      } else {
        Alert.alert("Invalid Email / Password");

        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      if (err.errors[0].message) {
        Alert.alert(err.errors[0].message);
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, email, password]);
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
          isPassword
        />
        <CustomButton
          onClick={async () => {
            await onSignInPress();
            // await signInWithEmailAndPassword(auth, email, password)
            //   .then(async (userCredential) => {
            //     const user = userCredential.user;
            //     const docRef = doc(db, "users", email);
            //     const docSnap = await getDoc(docRef);

            //     if (docSnap.exists()) {
            //       await setappUser(docSnap.data());
            //       console.log("Document data:", docSnap.data());
            //     } else {
            //       // docSnap.data() will be undefined in this case
            //       console.log("No such document!");
            //     }
            //   })
            //   .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.log(errorMessage);
            //   });
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
          {/* <Text style={{ textAlign: "center" }}>Or continue with</Text>
          {/* <SignInWithOAuth /> */}
          {/* <CustomButton
            onClick={undefined}
            title={"Sign up with Google"}
            textColor={"black"}
            colors={["#fff", "#fff"]}
            iconSource={images.googleSignIn}
          /> */}
          {/* {Platform.OS == "ios" && (
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
                  }).then(async (result) => {
                    await console.log(result);
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
          )} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
