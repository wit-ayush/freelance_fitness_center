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
  Payment: "PaymentScreen",
  PaymentConfirm: "PaymentConfirm",
  PlanDetails: "PlanDetails",
  AddWorkouts: "AddWorkouts",
};

export const images = {
  googleSignIn: require("../assets/images/google.png"),
  profileImage: require("../assets/images/avatar.png"),
  homeIcon: require("../assets/icons/homeIcon.png"),
  diary: require("../assets/icons/diary.png"),
  dumbell: require("../assets/images/dumbell.png"),
  planIcon: require("../assets/icons/plan.png"),
  postIcon: require("../assets/icons/post.png"),
  profileIcon: require("../assets/icons/profile.png"),
};

export const logWorkouts = [
  { label: "Chest", value: "Chest" },
  { label: "Biceps", value: "Biceps" },
  { label: "Back", value: "Back" },
  { label: "Triceps", value: "Triceps" },
  { label: "Legs", value: "Legs" },
];

const MET_VALUES = {
  running: 8,
  weightlifting: {
    Chest: 3.5,
    Biceps: 3,
    Back: 3.5,
    Triceps: 3,
    Legs: 4,
    // Add more workouts and their MET values as needed
  },
  // Add more exercises and their MET values as needed
};

function calculateCaloriesBurnt(exercise, bodyWeight, durationInMinutes) {
  const lowerCaseExercise = exercise.toLowerCase();
  let MET;

  // Check if the exercise is a specific weightlifting exercise
  if (
    MET_VALUES["weightlifting"] &&
    MET_VALUES["weightlifting"][lowerCaseExercise]
  ) {
    MET = MET_VALUES["weightlifting"][lowerCaseExercise];
  } else {
    MET = MET_VALUES[lowerCaseExercise];
  }

  if (!MET) {
    console.error("MET value not found for the provided exercise.");
    return null;
  }

  const durationInHours = durationInMinutes / 60;
  const caloriesBurnt = MET * bodyWeight * durationInHours;
  return caloriesBurnt;
}

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
