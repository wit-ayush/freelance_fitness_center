import { collection, query, where, onSnapshot } from "firebase/firestore";

export const screens = {
  SplashScreen: "Splash",
  AuthScreen: "Auth",
  Question: "Question",
  Signup: "Signup",
  Signin: "Signin",
  HomeScreen: "HomeScreen",
  Inbox: "InboxScreen",
  ChatScreen: "ChatScreen",
  Diary: "DiaryScreen",
  DiaryLog: "DiaryLog",
  PlanScreen: "PlanScreen",
  UserProfile: "UserProfile",
  TrainerHome: "TrainerHome",
  ExerciseSearch: "ExerciseSearch",
};

export const images = {
  googleSignIn: require("../assets/images/google.png"),
  profileImage: require("../assets/images/avatar.png"),
  homeIcon: require("../assets/icons/homeIcon.png"),
  diary: require("../assets/icons/diary.png"),
  dumbell: require("../assets/images/dumbell.png"),
};

export const logWorkouts = [
  { label: "Chest", value: "Chest" },
  { label: "Biceps", value: "Biceps" },
  { label: "Back", value: "Back" },
  { label: "Triceps", value: "Triceps" },
  { label: "Legs", value: "Legs" },
];

export function getChatTimeFormat() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const currentTime = `${hours}:${minutes}`;

  return currentTime;
}

export const getBlobFroUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};
