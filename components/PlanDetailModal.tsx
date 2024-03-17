import {
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

const PlanDetailModal = ({ modal, setIsModal }) => {
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
          <ScrollView>
            <TableComponent
              header1={"Phase 1 ( Week 1 - 4 )"}
              header2={"Upper 1"}
            />
            <TableComponent header2={"Lower 1"} />
            <TableComponent
              header1={"Phase 1 ( Week 1 - 4 )"}
              header2={"Upper 1"}
            />
            <TableComponent header2={"Lower 1"} />
            <View style={{ height: 100 }} />
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
});
