import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import CustomFloatingButton from "../CustomFloatingButton";
import DiaryEntryModal from "./DiaryEntryModal";
import moment, { Moment } from "moment";

import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const DiaryLog = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [dateTapped, setdateTapped] = useState<Date>(new Date());

  const LogComponent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 140,
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            height: "95%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>11:35</Text>
          <View style={styles.verticalLine} />
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>11:35</Text>
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            borderColor: "#D0D5DD",
            borderWidth: 2,
            borderRadius: 8,
            alignSelf: "center",
            marginTop: 10,
            height: "100%",
            backgroundColor: "#FFFCF5",
            padding: 10,
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/heartIcon.png")}
                style={{ height: 30, width: 35 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text>Cardio</Text>
                <Text>Legs</Text>
              </View>
            </View>
            <View>
              <Ionicons name="ellipsis-vertical-outline" size={25} />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text>Exercise</Text>
            <Progress.Bar
              progress={0.6}
              width={170}
              height={10}
              borderRadius={20}
              unfilledColor="#7CD4FD"
              color="#065986"
              borderColor="#fff"
              style={{ height: 10 }}
            />
            <Text>4 of 6</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>1200 kcal</Text>
              <Text>Calories burned</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>90bpm</Text>
              <Text>Heart Rate</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>90bpm</Text>
              <Text>Heart Rate</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const markedDatesArray = [
    {
      date: new Date(),
      dots: [
        {
          color: "#000",
          selectedColor: "#000",
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <DiaryEntryModal setIsModal={setModalVisible} modal={isModalVisible} />
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Diary Log
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <CalendarStrip
          dateNameStyle={{}}
          dateNumberStyle={{}}
          dayContainerStyle={{
            height: 70,
            backgroundColor: "lightblue",
          }}
          selectedDate={dateTapped}
          calendarHeaderPosition="below"
          calendarHeaderStyle={{ textAlign: "left" }}
          style={{ width: "100%", height: 100 }}
          markedDates={markedDatesArray}
          calendarAnimation={{ type: "sequence", duration: 1000 / 4 }}
          onDateSelected={(date) => {
            setdateTapped(date.toDate());
            // markedDatesArray.push({
            //   date: date.toDate(),
            //   dots: [
            //     {
            //       color: "#000",
            //       selectedColor: "#000",
            //     },
            //   ],
            // });
            // markedDatesArray.forEach((item) => {
            //   console.log(item.date.toDateString());
            // });
          }}
        />
      </View>
      <View style={styles.horizontalLine} />

      <View>
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Text style={{ color: "#667085", fontWeight: "500", fontSize: 14 }}>
            Time
          </Text>
          <Text
            style={{
              color: "#667085",
              fontWeight: "500",
              fontSize: 14,
              marginLeft: 20,
            }}
          >
            Exercise
          </Text>
        </View>
        <ScrollView style={{ height: "100%" }}>
          <LogComponent />
          <LogComponent />
          <LogComponent />
          <LogComponent />
          <LogComponent />
          <LogComponent />
          <View
            style={{ height: 300, backgroundColor: "white", marginTop: 10 }}
          />
        </ScrollView>
      </View>

      <CustomFloatingButton
        onClick={() => {
          setModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
};

export default DiaryLog;

const styles = StyleSheet.create({
  horizontalLine: { backgroundColor: "#D0D5DD", height: 2, marginVertical: 20 },
  verticalLine: {
    backgroundColor: "#D0D5DD",
    height: "40%",
    marginVertical: 20,
    width: 2,
  },
});
