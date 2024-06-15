import { useState, useEffect, useContext } from "react";
import { Pedometer } from "expo-sensors";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AppContext } from "../context/AppContext";

const usePedometer = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const { appUser } = useContext(AppContext);

  useEffect(() => {
    let subscription;

    const fetchStepCountFromFirebase = async () => {
      const docRef = doc(db, "users", appUser?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPastStepCount(data.pastStepCount || 0);
        setCurrentStepCount(data.currentStepCount || 0);
      }
    };

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        await fetchStepCountFromFirebase();

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        const pastStepCountResult = await Pedometer.getStepCountAsync(
          start,
          end
        );
        if (pastStepCountResult) {
          const newPastStepCount = pastStepCountResult.steps;
          const totalStepCount = newPastStepCount + currentStepCount;

          setPastStepCount(newPastStepCount);
          setCurrentStepCount(totalStepCount);

          await setDoc(
            doc(db, "users", appUser?.email),
            {
              pastStepCount: newPastStepCount,
              currentStepCount: totalStepCount,
            },
            { merge: true }
          );
        }

        subscription = Pedometer.watchStepCount(async (result) => {
          const newCurrentStepCount = result.steps + pastStepCount;
          setCurrentStepCount(newCurrentStepCount);

          await setDoc(
            doc(db, "users", appUser?.email),
            {
              pastStepCount,
              currentStepCount: newCurrentStepCount,
            },
            { merge: true }
          );
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [appUser?.email]);

  return {
    isPedometerAvailable,
    pastStepCount,
    currentStepCount,
  };
};

export default usePedometer;
