import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const sendPushNotification = async (title, body) => {
  try {
    const token = await getToken(messaging);
    if (!token) {
      console.warn("No FCM token available.");
      return;
    }

    await fetch("/api/sendPush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, title, body }),
    });

    console.log("Push notification sent!");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};