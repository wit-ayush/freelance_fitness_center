import {
  Dimensions,
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
import { screens } from "../../utils/constants";

const UserScreen = ({ navigation }) => {
  <HomeHeader navigation={navigation} />;
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          key={index}
          style={{
            height: 150,
            width: 350,
            alignSelf: "center",
            marginTop: 20,
          }}
          source={{ uri: item?.imgUrl }}
        ></ImageBackground>
      </TouchableOpacity>
    );
  };
  const isCarousel = React.useRef(null);
  const SLIDER_WIDTH = Dimensions.get("window").width + 80;

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView style={{ flex: 1 }}>
        <HomeHeader navigation={navigation} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.ExerciseSearch);
          }}
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              borderColor: "#D0D5DD",
              borderWidth: 1,
              width: "75%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="search-outline"
              size={30}
              style={{ marginLeft: 10 }}
              color={"#667085"}
            />
            <Text style={{ color: "gray", marginLeft: 10 }}>Search</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#F0F9FF",
              alignSelf: "center",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="filter-outline" size={30} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontWeight: "600",
            color: "black",
            fontSize: 18,
          }}
        >
          Trainer's Latest Updates
        </Text>

        {/* <View style={{ alignSelf: "center", margin: 0 }}>
          <Carousel
            layout="default"
            layoutCardOffset={10}
            ref={isCarousel}
            data={data}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={450}
            style={{ margin: 0 }}
          />
        </View> */}

        <View
          style={{
            backgroundColor: "#26272B",
            padding: 10,
            margin: 10,
            height: 170,
            borderRadius: 20,
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              padding: 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Today's{"\n"}Activities
              </Text>
              <Text style={{ color: "white", marginTop: 8 }}>Body Weight</Text>
            </View>
            <Progress.Circle
              size={50}
              // borderWidth={5}
              progress={0.5}
              // borderColor="white"
              thickness={6}
              unfilledColor="white"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 5,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>1200 kcal</Text>
              <Text style={{ color: "white" }}>Calories burned</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>90bpm</Text>
              <Text style={{ color: "white" }}>Heart Rate</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>90bpm</Text>
              <Text style={{ color: "white" }}>Heart Rate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
