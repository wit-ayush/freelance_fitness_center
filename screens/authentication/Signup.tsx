import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { images, screens } from "../../utils/constants";
import { auth, db } from "../../utils/firebase";
import * as AppleAuthentication from "expo-apple-authentication";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { appUser, setappUser } = useContext(AppContext);

  const saveCookie = async () => {
    try {
      const jsonValue = JSON.stringify(appUser);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const addUserToDatabase = async () => {
    const userDockRef = doc(db, "users", email);
    try {
      await setDoc(userDockRef, {
        name: name,
        email: email,
        photo: "",
        isTrainer: false,
        trainer: "",
      }).then(async () => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setappUser(docSnap.data());
        }
      });

      console.log("Document written with ID: ", userDockRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (appUser != null) {
      saveCookie();
      navigation.navigate(screens.Question);
    }
  }, [appUser]);

  const handleSignup = async () => {
    if (confirmPassword !== password) {
      Alert.alert("Passwords do not match", "");
      return;
    }
    if (name && email && password && confirmPassword) {
      console.log(name, email, password);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log("account created");
          const user = userCredential.user;
          console.log(user);
          if (user) {
            await addUserToDatabase();
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
        });
    } else {
      Alert.alert("Invalid Credentials", "Complete all fields to continue");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/dumbell.png")}
            />
            <Text style={styles.title}>Create your Account</Text>
          </View>
          <View style={styles.form}>
            <CustomInput
              label={"Email"}
              placeholder={"Enter Email"}
              value={email}
              onChangeText={setemail}
            />
            <CustomInput
              label={"Full Name"}
              placeholder={"Enter Full Name"}
              value={name}
              onChangeText={setname}
            />
            <CustomInput
              label={"Password"}
              placeholder={"Create Password"}
              value={password}
              onChangeText={setpassword}
              secureTextEntry
            />
            <CustomInput
              label={"Re-enter Password"}
              placeholder={"Re-enter Password"}
              value={confirmPassword}
              onChangeText={setconfirmPassword}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                onClick={handleSignup}
                title={"Create an Account"}
                textColor={"white"}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.Signin);
                }}
              >
                <Text style={styles.signInText}>
                  Already a Member?
                  <Text style={styles.signInLink}> Sign In</Text>
                </Text>
              </TouchableOpacity>
              <View style={styles.socialLoginContainer}>
                <Text style={styles.socialLoginText}>Or continue with</Text>
                <CustomButton
                  onClick={undefined}
                  title={"Sign up with Google"}
                  textColor={"black"}
                  colors={["#fff", "#fff"]}
                  iconSource={images.googleSignIn}
                />
                {Platform.OS === "ios" && (
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                      AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                    }
                    buttonStyle={
                      AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    }
                    style={styles.appleButton}
                    cornerRadius={10}
                    onPress={async () => {
                      try {
                        const credential =
                          await AppleAuthentication.signInAsync({
                            requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope
                                .FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope
                                .EMAIL,
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    height: 50,
    width: 50,
    marginLeft: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  signInLink: {
    textDecorationLine: "underline",
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  socialLoginText: {
    textAlign: "center",
  },
  appleButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    marginTop: 10,
  },
});
