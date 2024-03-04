import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import SwitchTrainerSheet from "../SwitchTrainerSheet";

const PlanScreen = ({ navigation }) => {
  const planOptions = ["Workout", "Meals", "Walking", "Updates"];
  const [planOptionSelected, setplanOptionSelected] = useState(planOptions[0]);
  const [switchTrainerModal, setswitchTrainerModal] = useState(false);
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <SwitchTrainerSheet
        modal={switchTrainerModal}
        setModal={setswitchTrainerModal}
      />

      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Plans
      </Text>

      <TouchableOpacity style={styles.trainerSwitchBox}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Khushaal Choithramani
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 15, color: "#475467" }}>
            Yoga Expert
          </Text>
          <TouchableOpacity onPress={() => setswitchTrainerModal(true)}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 15,
                color: "#026AA2",
                marginTop: 2,
                textAlign: "right",
                marginRight: 20,
              }}
            >
              Switch Trainer
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 20, marginLeft: 10 }}>
        <Text>Categories of plans to help you reach your goals.</Text>
      </View>

      <View style={styles.optionStrip}>
        {planOptions.map((data, i) => {
          return (
            <TouchableOpacity
              onPress={() => setplanOptionSelected(data)}
              style={
                data == planOptionSelected
                  ? styles.button
                  : { backgroundColor: "transparent" }
              }
              key={i}
            >
              <Text
                style={
                  data == planOptionSelected
                    ? { fontWeight: "bold" }
                    : { fontWeight: "bold", color: "#667085" }
                }
              >
                {data}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <Text style={{ color: "#026AA2", fontWeight: "bold" }}>
          Active Plans
        </Text>
      </View>

      <View></View>
    </SafeAreaView>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  optionStrip: {
    backgroundColor: "#F9FAFB",
    height: 50,
    alignSelf: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#F2F4F7",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  trainerSwitchBox: {
    height: 100,
    width: "80%",
    borderWidth: 1,
    borderColor: "#98A2B3",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    padding: 5,
  },
});
