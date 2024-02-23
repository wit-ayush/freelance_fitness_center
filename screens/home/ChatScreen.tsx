import {
  Image,
  KeyboardAvoidingView,
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
import { db } from "../../utils/firebase";

const ChatScreen = ({ route, navigation }) => {
  const [userTrainer, setuserTrainer] = useState<any>();
  const { appUser, isTrainer } = useContext(AppContext);
  const { sender, reciever } = route?.params;
  const [message, setmessage] = useState("");
  const [allMessages, setallMessages] = useState<any>([]);
  useEffect(() => {
    if (appUser?.isTrainer == false) {
      console.log("User Account");
      getUserTrainer();
    }
    getAllInChatMessages();
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
            media: null,
          }
        );
        await getAllInChatMessages();
        setmessage("");
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // console.log(message);
    // allMessages.push({ sender: appUser.name, text: message });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
          Messages
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <View>
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
            {appUser?.isTrainer ? " - Senior Trainer" : " - User"}
          </Text>
        </View>
      </TouchableOpacity>

      <View>
        <ScrollView style={{ height: "75%", marginBottom: 10 }}>
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
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 15,
                      }}
                    >
                      {data?.text}
                    </Text>
                  </View>
                </View>
              );
            })}
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
            marginBottom: 10,
          }}
        >
          <TouchableOpacity style={{ marginLeft: 5, marginRight: 20 }}>
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
