import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import { logWorkouts } from "../../utils/constants";
import Slider from "@react-native-community/slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { customAppStyles } from "../../utils/styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { AppContext } from "../../context/AppContext";

const DiaryEntryModal = ({ modal, setIsModal }) => {
  const [workoutSelected, setworkoutSelected] = useState(logWorkouts[0].value);
  const [isFocus, setIsFocus] = useState(false);
  const [workoutDuration, setworkoutDuration] = useState(10);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelected, setdateSelected] = useState<Date>();
  const [showDateModal, setshowDateModal] = useState(false);

  const { appUser } = useContext(AppContext);

  const saveWorkoutLog = async () => {
    const docRef = await addDoc(
      collection(db, `workoutlogs/${appUser?.email}/logs`),
      {
        selectedWorkout: workoutSelected,
        durationOfWorkout: workoutDuration,
        setsPerformed: 3,
        repsPerformed: 5,
        dateSelect: dateSelected.toDateString(),
      }
    )
      .then(() => {
        setIsModal(false);
      })
      .catch((e) => console.log(e));

    // console.log("Workout Registered here: ", docRef.id);
  };

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
            value={workoutSelected}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setworkoutSelected(item.value);
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
          <CustomInput
            label={"Number of sets performed"}
            placeholder={"0"}
            value={undefined}
            onChangeText={undefined}
            type="number-pad"
          />
          <Text
            style={{
              marginLeft: 12,
              fontSize: 15,
              marginTop: 10,
              marginBottom: 2,
            }}
          >
            Date
          </Text>
          <TouchableOpacity
            onPress={() => setshowDateModal(true)}
            style={[customAppStyles.custInputViewStyle, {}]}
          >
            <Text style={{ color: "gray" }}>
              {dateSelected ? dateSelected.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDateModal}
            mode="date"
            onConfirm={(date) => {
              setdateSelected(date), setshowDateModal(false);
            }}
            onCancel={() => {
              setshowDateModal(false);
            }}
          />
          <View style={{ position: "absolute", width: "100%", bottom: 20 }}>
            <CustomButton
              onClick={async () => {
                await saveWorkoutLog();
              }}
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
