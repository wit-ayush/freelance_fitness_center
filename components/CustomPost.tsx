import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { customAppStyles } from "../utils/styles";
import { AppContext } from "../context/AppContext";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import CustomInput from "./CustomInput";

const CustomPost = ({ data }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { appUser } = useContext(AppContext);
  const [isCommenting, setisCommenting] = useState(false);
  const [comment, setcomment] = useState("");
  const [comments, setComments] = useState(data?.comments || []);

  const isLikedChecker = () => {
    if (data?.likedBy?.includes(appUser?.email)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const likePost = async () => {
    const postRef = doc(db, "posts", data?.id);

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    await updateDoc(postRef, {
      likedBy: newIsLiked
        ? arrayUnion(appUser?.email)
        : arrayRemove(appUser?.email),
    }).then(() => {
      console.log(newIsLiked ? "Post liked" : "Post unliked");
    });
  };

  const addComment = async () => {
    const postRef = doc(db, "posts", data?.id);
    await updateDoc(postRef, {
      comments: arrayUnion({ comment: comment, doneBy: appUser?.email }),
    }).then(() => {
      setcomment("");
      console.log("comment added");
    });
  };

  useEffect(() => {
    isLikedChecker();
  }, [data?.likedBy, appUser?.email]);

  useEffect(() => {
    const postRef = doc(db, "posts", data?.id);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setComments(doc.data().comments || []);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [data?.id]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View>
      <View style={customAppStyles.horizontalLine} />

      <View style={{ marginTop: 10 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 25 }}
            source={{ uri: data?.uploadedBy?.photo }}
          />
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
            {data?.uploadedBy?.name}
          </Text>
        </View>
        <Text style={{ marginHorizontal: 10, marginTop: 10 }}>
          {data?.content}
        </Text>
      </View>

      {data && data?.media && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={{ position: "absolute" }}
            />
          )}
          <Image
            style={{
              borderRadius: 10,
              opacity: 0.9,
              position: "relative",
              marginHorizontal: 20,
              width: "95%",
              height: 140,
              alignSelf: "center",
            }}
            source={{ uri: data?.media }}
            onLoad={handleImageLoad}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
      )}

      <View style={[customAppStyles.horizontalLine, { marginTop: 20 }]} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "70%",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={likePost}>
          <Icon
            color={isLiked ? "blue" : "gray"}
            name={isLiked ? "thumbs-up" : "thumbs-o-up"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            color={"gray"}
            onPress={() => setisCommenting(!isCommenting)}
            name="comments-o"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon color={"gray"} name="share" size={30} />
        </TouchableOpacity>
      </View>
      {isCommenting && (
        <View>
          <View>
            <CustomInput
              mt={20}
              label={"Add a Comment"}
              placeholder={"Enter comment"}
              value={comment}
              onChangeText={setcomment}
            />
            <TouchableOpacity
              onPress={addComment}
              style={{ alignSelf: "flex-end", marginRight: 20, marginTop: 10 }}
            >
              <Text style={{ color: "blue", fontSize: 14, fontWeight: "bold" }}>
                Post
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontWeight: "500", marginLeft: 20 }}>
              {"All Comments"}
            </Text>
            {comments.map((data, i) => {
              return (
                <View
                  style={{
                    // width: "95%",
                    alignSelf: "flex-start",
                    backgroundColor: "lightgray",
                    padding: 13,
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                  key={i}
                >
                  <Text style={{ fontWeight: "500" }}>{data?.comment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomPost;

const styles = StyleSheet.create({});
