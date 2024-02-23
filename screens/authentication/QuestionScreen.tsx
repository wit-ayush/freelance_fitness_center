import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import CustomButton from "../../components/CustomButton";
import { screens } from "../../utils/constants";
import QuestionSection from "../../components/QuestionSection";

const QuestionScreen = ({ navigation }) => {
  const [questionNumber, setquestionNumber] = useState(0);
  const [progressBarController, setprogressBarController] = useState(0.1);

  const [gender, setgender] = useState("");
  const [age, setage] = useState("");
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Fitness Goals
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screens.Signup); //  for now later just incremenat the counter
        }}
      >
        <Text
          style={{
            textAlign: "right",
            fontSize: 13,
            fontWeight: "bold",
            marginRight: 10,
            textDecorationLine: "underline",
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>

      <View style={{ margin: 20, marginTop: 10 }}>
        <Image source={require("../../assets/images/questionIcon.png")} />
        <View
          style={{ marginTop: 10, flexDirection: "row", alignSelf: "center" }}
        >
          <Progress.Bar
            progress={progressBarController}
            width={350}
            height={10}
            borderRadius={20}
            unfilledColor="#7CD4FD"
            color="#065986"
            borderColor="#fff"
          />
        </View>

        {questionNumber == 0 && (
          <QuestionSection
            question="What is your Gender?"
            allOptions={["Male", "Female"]}
            setSelectedOption={setgender}
            option={gender}
          />
        )}
        {questionNumber == 1 && (
          <QuestionSection
            question="What is your age?"
            setSelectedOption={setage}
            option={age}
            keyboardType="numeric"
            textBox
            placeholder="Enter Your Age"
          />
        )}
        {questionNumber == 2 && (
          <>
            <QuestionSection
              question="How much do you weigh?"
              setSelectedOption={setage}
              option={age}
              keyboardType="numeric"
              textBox
              placeholder="Enter Your Weight"
            />
            <QuestionSection
              question="How tall are you?"
              setSelectedOption={setage}
              option={age}
              keyboardType="numeric"
              textBox
              placeholder="Enter Your Height"
            />
          </>
        )}
        {questionNumber == 3 && (
          <QuestionSection
            question="What is your Main Goal for training?"
            allOptions={[
              "Gain Muscle",
              "Lose Body Fat",
              "Improve Indurance",
              "Increase Strength",
            ]}
            setSelectedOption={setgender}
            option={gender}
          />
        )}
      </View>

      <View
        style={{
          marginTop: 25,
          alignSelf: "center",
          width: "100%",
          // position: "absolute",
          // bottom: 320,
        }}
      >
        <CustomButton
          title={"Continue"}
          textColor={"white"}
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          onClick={() => {
            setquestionNumber(questionNumber + 1);
            setprogressBarController(progressBarController + 0.1);
            console.log("Gender Selected: ", gender);
            console.log("Age Entered: ", age);
          }}
        />
        <CustomButton
          title={"Back"}
          textColor={"black"}
          colors={["#fff", "#fff", "#fff"]}
          onClick={() => {
            if (questionNumber != 0) {
              setquestionNumber(questionNumber - 1);
            }
            if (progressBarController != 0.1) {
              setprogressBarController(progressBarController - 0.1);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({});
