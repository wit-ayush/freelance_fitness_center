import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import * as Progress from "react-native-progress";
import CustomButton from "../../components/CustomButton";
import { screens } from "../../utils/constants";
import QuestionSection from "../../components/QuestionSection";
import { AppContext } from "../../context/AppContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useSessionList } from "@clerk/clerk-expo";

const QuestionScreen = ({ navigation , route}) => {
  const [questionNumber, setquestionNumber] = useState(0);
  const [progressBarController, setprogressBarController] = useState(0.0);
const userEmail = route?.params?.userEmail

console.log(userEmail)
const [loading, setloading] = useState(false)

  const [gender, setgender] = useState("");
  const [age, setage] = useState();
  const [height, setheight] = useState<number>();
  const [weight, setweight] = useState<number>();
  const [trainingGoal, settrainingGoal] = useState("");
  const [sleepHours, setsleepHours] = useState<number>();
  const [trainingHours, settrainingHours] = useState<number>();
  const [allergies, setallergies] = useState();
  return (
    <SafeAreaView
      style={{ height: "100%", width: "100%", backgroundColor: "white" }}
    >
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Fitness Goals
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screens.HomeScreen); //  for now later just incremenat the counter
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

        <ScrollView keyboardDismissMode="on-drag">
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
                setSelectedOption={(text: string) => setweight(parseInt(text))}
                option={weight}
                keyboardType="numeric"
                textBox
                placeholder="Enter Your weight"
              />
              <QuestionSection
                question="How tall are you?"
                setSelectedOption={(text) => setheight(parseInt(text))}
                option={height}
                keyboardType="numeric"
                textBox
                placeholder="Enter Your Height (in cm)"
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
              setSelectedOption={settrainingGoal}
              option={trainingGoal}
            />
          )}
          {questionNumber == 4 && (
            <>
              <QuestionSection
                question="How many hours can you put inn?"
                setSelectedOption={(text) => settrainingHours(parseInt(text))}
                option={trainingHours}
                keyboardType="numeric"
                textBox
                placeholder="Enter hours"
              />
              <QuestionSection
                question="How many hours do you sleep?"
                setSelectedOption={(text) => setsleepHours(parseInt(text))}
                option={sleepHours}
                keyboardType="numeric"
                textBox
                placeholder="Enter Sleeping hours"
              />
              <QuestionSection
                question="Any Allergies? Please Describe"
                setSelectedOption={setallergies}
                option={allergies}
                textBox
                placeholder="Describe about your allergies (if they exist)"
                multiLine={true}
              />
            </>
          )}
          {loading&&
<View style={{marginTop:20}}>
  <ActivityIndicator color={'black'}/>
</View>
          }
          {/* {questionNumber == 5 && <></>} */}
        </ScrollView>
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
          onClick={async () => {
            if (questionNumber > 4) {
              return;
            }
            if (questionNumber == 4) {
              setloading(true)
              // navigation.navigate(screens.HomeScreen);

              try {
                 await updateDoc(doc(db, "users", 'khushaal.choithramani@gmail.com'), {
                gender,
                sleepHours,
                trainingHours,
                trainingGoal,
                allergies,
                age,
                userHealthData: {
                  height,
                  weight,
                },
              }).then(async () => {
                setloading(false)
               navigation.navigate(screens.HomeScreen);
              });
              } catch (error) {
                Alert.alert(error)
                 setloading(false)
              }
             
            }

            setquestionNumber(questionNumber + 1);
            setprogressBarController(progressBarController + 0.3);
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


// khushaal.choithramani@gmail.com