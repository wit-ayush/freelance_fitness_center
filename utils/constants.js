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
};

export const images = {
  googleSignIn: require("../assets/images/google.png"),
  profileImage: require("../assets/images/avatar.png"),
  homeIcon: require("../assets/icons/homeIcon.png"),
  diary: require("../assets/icons/diary.png"),
};

export const logWorkouts = [
  { label: "Chest", value: "1" },
  { label: "Biceps", value: "2" },
  { label: "Back", value: "3" },
  { label: "Triceps", value: "4" },
  { label: "Legs", value: "5" },
];

export const getTrainerUsers = async (arraySetter) => {
  const q = query(
    collection(db, "users"),
    where("trainer", "==", "trainer@gmail.com")
  );
  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  await arraySetter(users);
};
