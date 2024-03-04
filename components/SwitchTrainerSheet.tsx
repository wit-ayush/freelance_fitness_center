import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "./CustomButton";
import Carousel from "react-native-snap-carousel";

const SwitchTrainerSheet = ({ modal, setModal }) => {
  const isCarousel = React.useRef(null);

  const data = ["1", "2"];

  const SLIDER_WIDTH = Dimensions.get("window").width + 80;

  const SwitchTrainerComponent = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          width: 300,
          alignItems: "center",
          borderWidth: 2,
          padding: 15,
          borderColor: "#D0D5DD",
          borderRadius: 10,
          marginRight: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <Image
              source={require("../assets/images/avatar.png")}
              height={100}
              width={100}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 18 }}>
              Khushaal Choithramani
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontWeight: "400",
                fontSize: 15,
                color: "#475467",
              }}
            >
              Yoga Expert
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <View>
            <Text style={{ fontWeight: "500", fontSize: 17, color: "#475467" }}>
              Experience
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>4 Years</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 17, color: "#475467" }}>
              Gender
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Male</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 17, color: "#475467" }}>
              Age
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>30 years</Text>
          </View>
        </View>

        <View style={{ alignSelf: "flex-start", marginTop: 20 }}>
          <Text style={{ color: "#475467", fontWeight: "bold", fontSize: 15 }}>
            Training Philosophy
          </Text>
          <Text style={{ marginTop: 10 }}>
            At justo diam amet magna sadipscing amet voluptua sea clita. Dolores
            ea et vero sanctus et nonumy sanctus et sed. Et duo amet tempor sed
            voluptua consetetur dolore lorem, sea.....
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: "#F5FBFF",
            borderColor: "#7CD4FD",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={25}
            color={"#0086C9"}
            style={{ marginRight: 14 }}
          />
          <Text style={{ width: "80%" }}>
            Recommended for you based on your interest in weight loss and HIIT
            workouts.
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: 40 }}>
          <CustomButton
            onClick={undefined}
            title={"Select Trainer"}
            textColor={"white"}
          />
          <CustomButton
            onClick={undefined}
            title={"Learn More"}
            textColor={"#344054"}
            colors={["#fff", "#fff"]}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal
      style={{ margin: 0 }}
      onBackdropPress={() => setModal(false)}
      isVisible={modal}
      hasBackdrop
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            height: "85%",
          }}
        >
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{ margin: 10 }}
          >
            <Ionicons name="close-outline" size={25} />
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              flexGrow: 1,
            }}
          >
            {data.map((item, i) => {
              return <SwitchTrainerComponent key={i} />;
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SwitchTrainerSheet;

const styles = StyleSheet.create({});
