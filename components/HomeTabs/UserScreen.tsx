import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import HomeHeader from "../HomeHeader";
import { images, screens } from "../../utils/constants";
import SearchExercise from "../SearchExercise";
import usePedometer from "../../hooks/usePedometer";

const UserScreen = ({ navigation }) => {
  const HomeCard = ({
    cardTitle,
    imageURL,
  }: {
    cardTitle: string;
    imageURL: string;
  }) => {
    return (
      <TouchableOpacity style={{}}>
        {imageURL && (
          <Image
            height={200}
            width={180}
            style={{ borderRadius: 10 }}
            source={{
              uri: imageURL,
            }}
          />
        )}

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{cardTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CallCard = () => {
    return (
      <ImageBackground
        style={{
          padding: 14,
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 20,
        }}
        source={images.lightblue_bggradeint}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: 17,
            }}
          >
            Schedule a Call with a Trainer
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  const StatComponent = ({ text, data }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#E5E4E2",
          alignSelf: "flex-start",
          height: 120,
          padding: 10,
          width: 150,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>{text}</Text>
        <Text style={{ marginTop: 4, fontSize: 20, fontWeight: "bold" }}>
          {data}
        </Text>
      </TouchableOpacity>
    );
  };

  // const { steps, distance, flights } = useHealthData();
  // const { isPedometerAvailable, pastStepCount, currentStepCount } =
  //   usePedometer();

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <HomeHeader navigation={navigation} />
        <SearchExercise navigation={navigation} />
        <View
          style={{
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
            marginTop: 30,
            flexDirection: "row",
          }}
        >
          <HomeCard
            imageURL={
              "https://plus.unsplash.com/premium_photo-1669261221863-b1221762b4da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            cardTitle={"Shop Gym Clothing"}
          />
          <HomeCard
            imageURL={
              "https://images.unsplash.com/photo-1709976142411-26dfc86b13fc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bSUyMHByb3RlaW58ZW58MHx8MHx8fDA%3D"
            }
            cardTitle={"Shop Gym Essentials"}
          />
        </View>
        <CallCard />

        <TouchableOpacity
          onPress={() => navigation.navigate(screens.TrackProgress)}
          style={{
            backgroundColor: "#E5E4E2",
            width: "90%",
            alignSelf: "center",
            marginTop: 40,
            padding: 20,
            borderRadius: 20,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Track your Workout Progress
          </Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 30,
          }}
        >
          <StatComponent text={"Sleep"} data={"10 hours"} />
          {/* <StatComponent text={"Steps"} data={currentStepCount} /> */}
          <StatComponent text={"Steps"} data={"Test"} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <StatComponent text={"Heart Rate"} data={"104 BPM"} />
          <StatComponent text={"Avg Calories"} data={"1670"} />
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
});
