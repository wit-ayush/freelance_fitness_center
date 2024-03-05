import {
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import ChatBox from "../../components/ChatBox";
import CustomInput from "../../components/CustomInput";
import { AppContext } from "../../context/AppContext";
import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase";
import { getBlobFroUri, getChatTimeFormat } from "../../utils/constants";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ChatScreen = ({ route, navigation }) => {
  const [userTrainer, setuserTrainer] = useState<any>();
  const { appUser, isTrainer } = useContext(AppContext);
  const { sender, reciever } = route?.params;
  const [message, setmessage] = useState("");
  const [allMessages, setallMessages] = useState<any>([]);
  const [mediaSelected, setmediaSelected] = useState(null);
  const [mediaBlob, setmediaBlob] = useState(null);

  useEffect(() => {
    if (appUser?.isTrainer == false) {
      console.log("User Account");
      getUserTrainer();
    }
    getAllInChatMessages();
    // setInterval(() => {
    //   getAllInChatMessages();
    // }, 5000);
  }, []);

  const getAllInChatMessages = async () => {
    const messages = [];
    if (appUser?.isTrainer) {
      const query = collection(
        db,
        `chats/${reciever?.email + sender?.email}/chat`
      );
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach(async (doc) => {
        //   console.log("Message Data", doc.data());
        await messages.push(doc.data());
      });
    } else {
      const query = collection(
        db,
        `chats/${sender?.email + reciever?.email}/chat`
      );
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach(async (doc) => {
        //   console.log("Message Data", doc.data());
        await messages.push(doc.data());
      });
    }
    setallMessages(messages);
    console.log(messages);
  };

  const getUserTrainer = async () => {
    const docRef = doc(db, "users", appUser.trainer);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setuserTrainer(docSnap.data());

      console.log("Document Trainer data:", docSnap.data().name.toLowerCase());
      console.log(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const sendMessage = async () => {
    const textTime = getChatTimeFormat();

    let downloadMediaURL;
    const imageRef = ref(
      storage,
      `users/${appUser?.name}/media/${mediaSelected?.name}`
    );

    if (mediaSelected && mediaBlob) {
      await uploadBytes(imageRef, mediaBlob)
        .then(async (snapshot) => {
          downloadMediaURL = await getDownloadURL(imageRef);
          // await console.log(downloadURL);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (message) {
      try {
        const docRef = await addDoc(
          collection(
            db,
            `chats/${
              appUser?.isTrainer
                ? reciever?.email + sender?.email
                : sender?.email + reciever?.email
            }/chat`
          ),
          {
            sender: sender,
            receiver: reciever,
            timestamp: serverTimestamp(),
            text: message,
            media: downloadMediaURL ? downloadMediaURL : null,
            timeSent: textTime,
            mediaName: mediaSelected?.name,
          }
        );
        await getAllInChatMessages();
        setmessage("");
        setmediaBlob(null);
        setmediaSelected(null);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // console.log(message);
    // allMessages.push({ sender: appUser.name, text: message });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
        
        </Text>
      </View> */}
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={25} color={"black"} />
          </TouchableOpacity>
          <Image
            src={reciever?.photo}
            style={{ height: 50, width: 50, borderRadius: 25, marginLeft: 10 }}
          />
        </View>
        <View
          style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold" }}>{reciever?.name}</Text>
          <Text style={{ fontWeight: "bold" }}>
            {!appUser?.isTrainer ? " - Senior Trainer" : " - User"}
          </Text>
        </View>
      </View>

      <View>
        <ScrollView keyboardDismissMode="on-drag" style={{ height: "75%" }}>
          {allMessages &&
            allMessages.map((data, i) => {
              console.log(data);
              return (
                <View key={i}>
                  <View
                    key={i}
                    style={{
                      backgroundColor: "#0086C9",
                      padding: 7,
                      marginTop: 10,
                      borderRadius: 10,
                      margin: 10,
                      alignSelf:
                        data?.sender?.email == sender?.email
                          ? "flex-end"
                          : "flex-start",
                      paddingHorizontal: 14,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 17,
                      }}
                    >
                      {data?.text}
                    </Text>
                    {data?.timeSent && (
                      <Text
                        style={{
                          color: "lightgray",
                          fontWeight: "600",
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        {data?.timeSent}
                      </Text>
                    )}
                  </View>
                  {data?.media && (
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(data?.media);
                      }}
                      style={{
                        backgroundColor: "white",
                        marginHorizontal: 10,
                        borderColor: "lightgray",
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 10,
                        marginVertical: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignSelf:
                          data?.sender?.email == sender?.email
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons name="document" size={35} color={"black"} />
                        <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                          {data?.mediaName}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => setmediaSelected(null)}
                      >
                        <Ionicons
                          name="open-outline"
                          size={23}
                          color={"black"}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          {/* <View style={{ height: 200 }} /> */}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        style={{ position: "absolute", bottom: 30, width: "100%" }}
        contentContainerStyle={{
          height: "100%",
          width: "100%",
          alignSelf: "center",
        }}
        behavior="position"
      >
        {mediaSelected && (
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 10,
              borderColor: "lightgray",
              borderWidth: 0.5,
              padding: 8,
              borderRadius: 10,
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="document" size={35} color={"black"} />
              <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                {mediaSelected?.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setmediaSelected(null)}>
              <Ionicons name="close-outline" size={26} color={"black"} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            borderColor: "#D0D5DD",
            borderWidth: 2.7,
            padding: 10,
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            marginHorizontal: 10,
            flexDirection: "row",
            marginBottom: 3,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              let result = await DocumentPicker.getDocumentAsync({});
              setmediaSelected(result.assets[0]);
              const blob = await getBlobFroUri(result.assets[0].uri);
              console.log(blob);
              setmediaBlob(blob);
            }}
            style={{ marginLeft: 5, marginRight: 20 }}
          >
            <Ionicons name="document-outline" size={20} color={"gray"} />
          </TouchableOpacity>

          <TextInput
            onChangeText={setmessage}
            style={{ flex: 1 }}
            placeholder="Enter Message"
            value={message}
          />

          <TouchableOpacity onPress={sendMessage} style={{ marginRight: 10 }}>
            <Ionicons name="paper-plane-outline" size={20} color={"gray"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
