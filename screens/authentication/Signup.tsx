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
import React, { Children, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { images, screens } from "../../utils/constants";
import { auth, db } from "../../utils/firebase";
import * as AppleAuthentication from "expo-apple-authentication";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

const Signup = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const addUserToDatabase = async () => {
    const userDockRef = doc(db, "users", email);
    try {
      await setDoc(userDockRef, {
        name,
        email,
      });
      console.log("Document written with ID: ", userDockRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSignup = async () => {
    if (confirmPassword != password) {
      Alert.alert("Passwords donot match", "");
    }
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password == confirmPassword
    ) {
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
      return;
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
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
              Create your Account
            </Text>
          </View>
          <View>
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
            />
            <CustomInput
              label={"Re-enter Password"}
              placeholder={"Re-enter Password"}
              value={confirmPassword}
              onChangeText={setconfirmPassword}
            />
            <View style={{ marginTop: 20 }}>
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
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Already a Member?
                  <Text style={{ textDecorationLine: "underline" }}>
                    {" "}
                    Sign In
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

const styles = StyleSheet.create({});
