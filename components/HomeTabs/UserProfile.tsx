import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getBlobFroUri } from "../../utils/constants";

const UserProfile = ({ navigation }) => {
  const { appUser, getUser } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    const imageRef = ref(storage, `users/profileImages/${appUser?.name}`);
    const imageBlob: any = await getBlobFroUri(result.assets[0].uri);

    console.log("Blob", imageBlob);

    await uploadBytes(imageRef, imageBlob)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        // await console.log(downloadURL);
        await updateDoc(doc(db, "users", appUser?.email), {
          photo: downloadURL,
        });
      })
      .then(async (result) => {
        // console.log(result);
        await getUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const OptionsBox = ({ onClick, title }) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          backgroundColor: "white",
          padding: 10,
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="heart-outline" size={25} />
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 15 }}>
            {title}
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </TouchableOpacity>
    );
  };

  const DataBox = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          width: "auto",
          alignSelf: "flex-start",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Ionicons color={"#0086C9"} name="flame-outline" size={25} />
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          20,000
        </Text>
        <Text
          style={{ textAlign: "center", fontWeight: "400", color: "#344054" }}
        >
          Calories Burned
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#EAECF0",
        height: "100%",
      }}
    >
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Profile
        </Text>
      </View>

      <View style={{ alignSelf: "center", marginTop: 30 }}>
        <TouchableOpacity
          onPress={async () => {
            await pickImage();
          }}
        >
          {appUser && appUser?.photo && (
            <Image
              style={{ height: 70, width: 70, borderRadius: 35 }}
              source={{ uri: appUser?.photo }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            marginTop: 10,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {appUser?.name}
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <DataBox />
        <DataBox />
        <DataBox />
      </View>

      <View style={{ marginTop: 20, justifyContent: "center" }}>
        {/* <OptionsBox onClick={undefined} />
        <OptionsBox onClick={undefined} />
        <OptionsBox onClick={undefined} />
        <OptionsBox onClick={undefined} />
        <OptionsBox onClick={undefined} />
        <OptionsBox onClick={undefined} /> */}
        <OptionsBox title={"Subscribe"} onClick={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
