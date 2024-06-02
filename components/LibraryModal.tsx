import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DATA, images, screens } from "../utils/constants";
import WebView from "react-native-webview";
import VideoViewer from "../screens/home/VideoViewer";

const LibraryModal = ({
  modal,
  setModal,
  exerciseDataModal,
  setexerciseDataModal,
  navigation,
}) => {
  const [viewVideo, setviewVideo] = useState(false);
  const [videoURL, setvideoURL] = useState("");

  const OptionComponent = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setviewVideo(true);
        }}
        style={{
          borderRadius: 10,
          alignSelf: "flex-start",
          marginHorizontal: 3,
          marginTop: 20,
        }}
      >
        <View
          style={{
            height: 200,
            width: 180,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 0.9,
            borderColor: "black",
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
            }}
            source={images.fittness}
          />
        </View>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 0,
            backgroundColor: "lightgray",
            width: 180,
            borderWidth: 2,
            borderColor: "gray",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            padding: 8,
            opacity: 0.7,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ViewWorkoutOptions = ({}) => {
    return (
      <View style={{ height: "100%", backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => {
            setexerciseDataModal(null);
            setModal(false);
          }}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="close-outline" size={30} />
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          <Image
            source={images.fcTextLogo}
            style={{ height: 13, width: 200, alignSelf: "center" }}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <FlatList
            data={exerciseDataModal?.exercises}
            renderItem={({ item }) => <OptionComponent item={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </View>
    );
  };

  const ViewVideo = () => {
    return (
      <View style={{ height: "100%" }}>
        <TouchableOpacity
          onPress={() => {
            setviewVideo(false);
          }}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="close-outline" color={"black"} size={30} />
        </TouchableOpacity>
        <WebView
          style={{}}
          containerStyle={{}}
          scrollEnabled={false}
          source={{
            uri: `https://www.youtube.com/embed/${"BlkRLAL9NKs"}?&autoplay=1&showinfo=0&controls=1&fullscreen=1`,
          }}
        />
      </View>
    );
  };
  return (
    <Modal style={{ margin: 0 }} isVisible={modal}>
      <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
        {!viewVideo && <ViewWorkoutOptions />}
        {viewVideo && <ViewVideo />}
      </SafeAreaView>
    </Modal>
  );
};

export default LibraryModal;

const styles = StyleSheet.create({});
