import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { screens } from "../../utils/constants";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-snap-carousel";

const HomeScreen = ({ navigation }) => {
  const SLIDER_WIDTH = Dimensions.get("window").width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

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

  const { appUser } = useContext(AppContext);
  console.log(appUser);
  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate(screens.Signin);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={signOut}>
          <Image
            src={appUser?.photo}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          {appUser?.email}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.Inbox);
            }}
            style={{ marginRight: 10 }}
          >
            <Ionicons size={27} name="chatbox-ellipses-outline" />
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Ionicons size={27} name="notifications-outline" />
          </TouchableOpacity>
        </View>
      </View>

      <View
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
          <TextInput
            style={{ flex: 1, marginHorizontal: 10 }}
            placeholder="Search"
          />
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
      </View>

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

      <View style={{ alignSelf: "center" }}>
        <Carousel
          layout="default"
          // layoutCardOffset={10}
          ref={isCarousel}
          data={data}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={450}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
