import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

const PlanDetailModal = ({ modal, setIsModal, planDetails }) => {
  const tableData = {
    tableHead: ["Workouts", "Reps", "Duration"],
    tableData: [
      ["Chest", "4 x 12", "3 mins+"],
      ["Chest", "4 x 12", "3 mins+"],
      ["Chest", "4 x 12", "3 mins+"],
    ],
  };

  const TableComponent = ({
    header1,
    header2,
  }: {
    header1?: string;
    header2: string;
  }) => {
    return (
      <View>
        {header1 && (
          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 24, letterSpacing: 0.2 }}
            >
              {header1}
            </Text>
          </View>
        )}
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 14, letterSpacing: 0.2 }}
          >
            {header2}
          </Text>
        </View>
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
              data={tableData.tableHead}
              style={styles.head}
              textStyle={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            />
            <Rows
              data={tableData.tableData}
              textStyle={{ padding: 6, textAlign: "center" }}
              style={{}}
            />
          </Table>
        </View>
      </View>
    );
  };

  const WorkoutComponent = () => {
    return (
      <View style={{ marginTop: 10, width: "90%", alignSelf: "center" }}>
        <View style={{ backgroundColor: "#E0F2FE", padding: 10 }}>
          <Text style={styles.outText}>Upper 1</Text>
        </View>
        <View
          style={{
            backgroundColor: "#F5FBFF",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.inText}>Upper 1</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.inText, { marginRight: 20 }]}>13 x 5</Text>
              <Text style={styles.inText}>3 mins+</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.inText}>Upper 1</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.inText, { marginRight: 20 }]}>13 x 5</Text>
              <Text style={styles.inText}>3 mins+</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.inText}>Upper 1</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.inText, { marginRight: 20 }]}>13 x 5</Text>
              <Text style={styles.inText}>3 mins+</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal style={{ margin: 0, height: "100%" }} isVisible={modal}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{ backgroundColor: "white", height: "100%", paddingTop: 20 }}
        >
          <TouchableOpacity
            onPress={() => setIsModal(false)}
            style={{ margin: 10, marginTop: 20 }}
          >
            <Ionicons name="close-outline" size={30} />
          </TouchableOpacity>

          <ImageBackground
            style={{ height: 130, justifyContent: "center", marginTop: 20 }}
            source={{ uri: "https://i.ibb.co/XxZX1Qw/1-1.png" }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Progressive bodybuilding
              </Text>
            </View>
          </ImageBackground>

          <ScrollView>
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  fontWeight: "bold",
                  fontSize: 21,
                }}
              >
                Phase (Weeks 1-4)
              </Text>
              <WorkoutComponent />
              <WorkoutComponent />
              <WorkoutComponent />
              <WorkoutComponent />
              <WorkoutComponent />
              <WorkoutComponent />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PlanDetailModal;

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "white" },
  text: { margin: 6 },
  inText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "500",
  },
  outText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
