import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import { logWorkouts } from "../../utils/constants";
import Slider from "@react-native-community/slider";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

const DiaryEntryModal = ({ modal, setIsModal }) => {
  const [value, setValue] = useState(logWorkouts[0].value);
  const [isFocus, setIsFocus] = useState(false);
  const [workoutDuration, setworkoutDuration] = useState(10);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <Modal
      style={{ height: "50%" }}
      onBackdropPress={() => {
        setIsModal(false);
      }}
      isVisible={modal}
    >
      <View style={{ height: "87%" }}>
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
          }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsModal(false);
              }}
            >
              <Ionicons name="close-outline" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Add a new workout log
            </Text>
          </View>
          <Text style={{ marginTop: 20 }}>Select Workout</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={logWorkouts}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : logWorkouts[0].label}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: 30,
            }}
          >
            Duration of the workout
          </Text>
          <Slider
            style={{ width: "90%", alignSelf: "center", height: 20 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#0086C9"
            maximumTrackTintColor="#ffff"
            tapToSeek={true}
            thumbTintColor="#0086C9"
            step={10}
            onValueChange={setworkoutDuration}
            value={workoutDuration}
          />
          <Text style={{ marginTop: 20, fontWeight: "500" }}>
            Time Selected: {workoutDuration} mins
          </Text>
          {/* <RNDateTimePicker
          mode="date"
          value={new Date()}
          style={{
            borderWidth: 1,
            alignSelf: "center",
            backgroundColor: "black",
          }}
          textColor="blue"
          themeVariant="dark"
        /> */}
          <CustomInput
            label={"Number of sets performed"}
            placeholder={"0"}
            value={undefined}
            onChangeText={undefined}
            type="number-pad"
          />
          <View style={{ position: "absolute", width: "100%", bottom: 20 }}>
            <CustomButton
              onClick={undefined}
              title={"Save Workout Log"}
              textColor={"white"}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default DiaryEntryModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
