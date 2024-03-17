import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../../components/Header";
import CustomInput from "../../components/CustomInput";
import { Dropdown } from "react-native-element-dropdown";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { AppContext } from "../../context/AppContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CustomButton from "../../components/CustomButton";

const AddWorkouts = ({ route, navigation }) => {
  const { appUser } = useContext(AppContext);
  const trainerUsers = route?.params?.allUsers;
  const [isFocus, setIsFocus] = useState(false);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [counter, setcounter] = useState<number[]>([]);
  const [workoutName, setworkoutName] = useState<string>("");
  const [repsCount, setrepsCount] = useState("");
  const [duration, setduration] = useState("");
  const [addedWorkouts, setaddedWorkouts] = useState([]);

  const saveExercise = async () => {
    await addDoc(collection(db, `users/${appUser?.email}/exercisePlans`), {
      trainer: appUser?.email,
      workouts: addedWorkouts,
      phaseTitle: "test",
      focusPart: "test",
      setDescription:
        "Sed ipsum accusam amet no ipsum. Rebum aliquyam sit consetetur ipsum erat dolor et lorem elitr, no est ut diam.",
      users: selectedUsers,
    }).then(() => {
      Alert.alert("Exercise Posted");
      navigation.goBack();
    });
  };

  const tableHead = ["Workouts", "Reps", "Duration"];
  const [tableData, settableData] = useState([["Chest", "4 x 12", "3 mins+"]]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View>
        <View style={{ height: "100%" }}>
          <ScrollView contentContainerStyle={{}}>
            <Header title={"Add New Exercise"} navigation={navigation} />

            <Text style={{ marginTop: 20, fontSize: 14, marginLeft: 20 }}>
              Add Users
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={trainerUsers}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={"Add Users"}
              searchPlaceholder="Search..."
              value={selectedUsers[0]}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                // setworkoutSelected(item.value);
                const userExists = selectedUsers.some(
                  (user) => user === item.email
                );
                if (!userExists) {
                  setselectedUsers([...selectedUsers, item.email]);
                  //   console.log(selectedUsers);
                }
              }}
            />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              {selectedUsers.map((data, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setselectedUsers([]);
                    }}
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "lightgray",
                      alignSelf: "flex-start",
                      borderRadius: 10,
                      padding: 3,
                      marginTop: 2,
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={20}
                      style={{ marginRight: 5 }}
                    />
                    <Text>{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <CustomInput
              label={"Enter Phase Title"}
              placeholder={"Enter here"}
              value={undefined}
              onChangeText={undefined}
            />
            <CustomInput
              label={"Enter Focus"}
              placeholder={"Enter here"}
              value={undefined}
              onChangeText={undefined}
            />
            <CustomInput
              label={"Enter Phase Title"}
              placeholder={"Enter Description"}
              value={undefined}
              onChangeText={undefined}
              multiLine
            />

            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: "bold",
              }}
            >
              Add Workouts
            </Text>

            <View style={{ marginTop: 10 }}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "lightgray",
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                style={{ width: "90%", alignSelf: "center" }}
              >
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                />
                <Rows
                  data={tableData}
                  textStyle={{ padding: 6, textAlign: "center" }}
                  style={{}}
                />
              </Table>
            </View>
            {/* <WorkoutComponent /> */}

            <View>
              <View style={{ width: "100%" }}>
                <CustomInput
                  label={"Workout Name"}
                  placeholder={"Enter Here"}
                  value={workoutName}
                  onChangeText={setworkoutName}
                />
                <CustomInput
                  label={"Reps"}
                  placeholder={undefined}
                  value={repsCount}
                  onChangeText={setrepsCount}
                />
                <CustomInput
                  label={"Duration"}
                  placeholder={undefined}
                  value={duration}
                  onChangeText={setduration}
                />

                <View
                  style={{
                    height: 2,
                    width: "90%",
                    backgroundColor: "lightgray",
                    marginTop: 20,
                    alignSelf: "center",
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  //   setcounter([...counter, counter[0] + 1]);
                  if (!workoutName || !repsCount || !duration) {
                    return Alert.alert("Complete all fields");
                  }
                  settableData([
                    ...tableData,
                    [workoutName, repsCount, duration],
                  ]);
                  setaddedWorkouts([
                    ...addedWorkouts,
                    {
                      workoutName: workoutName,
                      reps: repsCount,
                      duration: duration,
                    },
                  ]);
                  console.log(addedWorkouts);
                  setworkoutName("");
                  setrepsCount("");
                  setduration("");
                }}
                style={{ marginLeft: 20, marginTop: 20 }}
              >
                <Ionicons name="add-circle-outline" size={30} />
              </TouchableOpacity>
            </View>

            <CustomButton
              onClick={saveExercise}
              title={"Post Exercise"}
              textColor={"white"}
            />

            {/* <View style={{ height: 300 }} /> */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddWorkouts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
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
    color: "gray",
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
  head: { height: 40, backgroundColor: "white" },
  text: { margin: 6 },
});
