import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";

const WeightInputModal = ({
  modal,
  setModal,
  weightInput,
  setWeightInput,
  userWeights,
  setuserWeights,
}) => {
  const [imageCollection, setimageCollection] = useState([]);
  const [image, setimage] = useState(null);
  const uploadImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setimage();
      setimageCollection([...imageCollection, result.assets[0].uri]);
    }
  };
  return (
    <Modal
      onBackdropPress={() => setModal(false)}
      style={{ margin: 0 }}
      isVisible={modal}
    >
      <View
        style={{
          backgroundColor: "white",
          height: "70%",
          width: "90%",
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <CustomInput
          label={"Enter Weight"}
          placeholder={"Weight"}
          value={weightInput}
          onChangeText={setWeightInput}
        />

        <CustomButton
          onClick={() => {
            const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

            setuserWeights([
              ...userWeights,
              { weight: parseFloat(weightInput), date },
            ]);
            console.log(userWeights);
            setModal(false);
          }}
          title={"Add Weight"}
          textColor={"white"}
        />
        <CustomButton
          onClick={uploadImages}
          title={"Upload Photo"}
          textColor={"white"}
        />

        <ScrollView horizontal style={{}}>
          {imageCollection.map((data, i) => {
            return (
              <View style={{ marginTop: 30, marginLeft: 20 }}>
                <Image
                  style={{ height: 200, width: 120, borderRadius: 20 }}
                  src={data}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default WeightInputModal;

const styles = StyleSheet.create({});
