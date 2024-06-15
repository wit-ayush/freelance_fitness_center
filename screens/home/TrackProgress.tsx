import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomIcon from "../../components/CustomIcon";
import { images } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import CustomButton from "../../components/CustomButton";
import { LineChart } from "react-native-chart-kit";
import WeightInputModal from "../../components/WeightInputModal";

const TrackProgress = ({ navigation }) => {
  const { appUser } = useContext(AppContext);
  const [weightInput, setweightInput] = useState<number>(20);
  const [userWeights, setuserWeights] = useState([]);

  const [weightModal, setweightModal] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const [data, setData] = useState([]);
  const [view, setView] = useState("week");

  const filterData = (data, view) => {
    const now = new Date();
    let filteredData;
    switch (view) {
      case "week":
        filteredData = data.filter(
          (d) => new Date(d.date) > new Date(now.setDate(now.getDate() - 7))
        );
        break;
      case "month":
        filteredData = data.filter(
          (d) => new Date(d.date) > new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case "year":
        filteredData = data.filter(
          (d) =>
            new Date(d.date) > new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      default:
        filteredData = data;
    }
    return filteredData;
  };

  const graphData = filterData(userWeights, view);

  return (
    <SafeAreaView>
      <WeightInputModal
        modal={weightModal}
        setModal={setweightModal}
        weightInput={weightInput}
        setWeightInput={setweightInput}
        userWeights={userWeights}
        setuserWeights={setuserWeights}
      />
      <View style={{ marginTop: 10 }}>
        <Image
          source={images.fcTextLogo}
          style={{ height: 13, width: 200, alignSelf: "center" }}
        />
      </View>
      <CustomIcon
        styles={{ marginLeft: 10, marginTop: 10 }}
        name={"chevron-back-outline"}
        onClick={() => navigation.goBack()}
        size={24}
      />
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 20,
          color: "gray",
        }}
      >
        Your Progress
      </Text>
      {/* <TextInput
        value={weightInput}
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 5,
          color: "black",
          fontWeight: "bold",
        }}
        onChangeText={setweightInput}
        placeholder="--"
      /> */}
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 5 }}
        onPress={() => {}}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {weightInput + " kg"}
        </Text>
      </TouchableOpacity>
      <View style={{ width: "60%", alignSelf: "center" }}>
        <CustomButton
          onClick={() => setweightModal(!weightModal)}
          title={"Update"}
          textColor={"white"}
        />
      </View>
      <View
        style={{ alignSelf: "center", marginTop: 40, justifyContent: "center" }}
      >
        {graphData.length > 0 && (
          <LineChart
            data={{
              labels: graphData.map((d) => d.date),
              datasets: [{ data: graphData.map((d) => d.weight) }],
            }}
            width={screenWidth - 16} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            chartConfig={{
              backgroundColor: "#e26a00",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </View>

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "80%",
          marginTop: 20,
          backgroundColor: "lightgray",
          padding: 5,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setView("year")}
          style={{
            backgroundColor: view == "year" ? "white" : "transparent",
            padding: 5,
            borderRadius: 10,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Year</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setView("month")}
          style={{
            backgroundColor: view == "month" ? "white" : "transparent",

            padding: 5,
            borderRadius: 10,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setView("week")}
          style={{
            backgroundColor: view == "week" ? "white" : "transparent",

            padding: 5,
            borderRadius: 10,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Week</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TrackProgress;

const styles = StyleSheet.create({});
