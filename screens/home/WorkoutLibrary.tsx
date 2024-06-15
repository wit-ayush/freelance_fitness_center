import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DATA, exercises, images } from "../../utils/constants";
import LibraryModal from "../../components/LibraryModal";

const WorkoutLibrary = ({ navigation }) => {
  const [libraryModal, setlibraryModal] = useState(false);
  const [exerciseDataModal, setexerciseDataModal] = useState(null);
  useEffect(() => {
    if (exerciseDataModal) {
      setlibraryModal(true);
    }
  }, [exerciseDataModal]);

  const OptionComponent = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setexerciseDataModal(item)}
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
            // backgroundColor: "lightgray",
            width: 180,
            // borderWidth: 2,
            borderColor: "gray",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            padding: 8,
            opacity: 0.7,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {item.category?.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white", flex: 1 }}>
      <LibraryModal
        navigation={navigation}
        exerciseDataModal={exerciseDataModal}
        setexerciseDataModal={setexerciseDataModal}
        modal={libraryModal}
        setModal={setlibraryModal}
      />
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
          data={exercises}
          renderItem={({ item }) => <OptionComponent item={item} />}
          keyExtractor={(item) => item?.id}
          numColumns={2}
        />
      </View>
      {/* <View style={{ height: 200 }} /> */}
    </SafeAreaView>
  );
};

export default WorkoutLibrary;

const styles = StyleSheet.create({});
