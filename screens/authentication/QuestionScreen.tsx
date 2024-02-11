import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import CustomButton from "../../components/CustomButton";

const QuestionScreen = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Fitness Goals
      </Text>

      <View style={{ margin: 20, marginTop: 30 }}>
        <Image source={require("../../assets/images/questionIcon.png")} />
        <View
          style={{ marginTop: 10, flexDirection: "row", alignSelf: "center" }}
        >
          <Progress.Bar
            progress={0.2}
            width={400}
            height={10}
            borderRadius={20}
            unfilledColor="#7CD4FD"
            color="#065986"
            borderColor="#fff"
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          alignSelf: "center",
          width: "100%",
          position: "absolute",
          bottom: 100,
        }}
      >
        <CustomButton
          title={"Continue"}
          textColor={"white"}
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          onClick={undefined}
        />
        <CustomButton
          title={"Skip"}
          textColor={"black"}
          colors={["#fff", "#fff", "#fff"]}
          onClick={undefined}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({});
