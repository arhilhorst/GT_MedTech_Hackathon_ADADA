import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const prescriptionsCollection = collection(db, "prescriptions");

export const messaging = getMessaging(app);
export const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: "BOaqu3pq1KWdaI0mPELecOeMa78AQumAXDgnqoIXgsRnd2VXWkibxKi1joRNw38dgF55A8Z_CactBRzt76hkpI0" });
        console.log("FCM Token:", token);
        return token;
      } else {
        console.log("Permission denied for notifications");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  
  // Listen for foreground messages
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  });