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
    let subscription = null;

    const fetchStepCountFromFirebase = async () => {
      if (!appUser?.email) return;

      const docRef = doc(db, "users", appUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPastStepCount(data.pastStepCount || 0);
        setCurrentStepCount(data.currentStepCount || 0);
      } else {
        // Initialize if no data exists
        await setDoc(docRef, {
          pastStepCount: 0,
          currentStepCount: 0,
        });
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
        const newPastStepCount = pastStepCountResult.steps || 0;
        const totalStepCount = newPastStepCount + currentStepCount;

        setPastStepCount(newPastStepCount);
        setCurrentStepCount(totalStepCount);

        await setDoc(
          doc(db, "users", appUser.email),
          {
            pastStepCount: newPastStepCount,
            currentStepCount: totalStepCount,
          },
          { merge: true }
        );

        subscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount((prevCount) => {
            const newCount = prevCount + result.steps;
            setDoc(
              doc(db, "users", appUser.email),
              {
                pastStepCount: pastStepCount,
                currentStepCount: newCount,
              },
              { merge: true }
            );
            return newCount;
          });
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [appUser?.email, currentStepCount, pastStepCount]);

  return {
    isPedometerAvailable,
    pastStepCount,
    currentStepCount,
  };
};

export default usePedometer;
