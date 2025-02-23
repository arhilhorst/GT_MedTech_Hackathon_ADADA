// app/services/firestore.js

import { db, prescriptionsCollection } from "../lib/firebase";
import { doc, updateDoc, addDoc, getDoc } from "firebase/firestore";

// Function to mark a dose as taken
export async function markDoseTaken(prescriptionId) {
  try {
    const docRef = doc(db, "prescriptions", prescriptionId);
    await updateDoc(docRef, { lastDispensed: new Date() });
    alert("Dose marked as taken!");
  } catch (error) {
    console.error("Error marking dose as taken: ", error);
  }
}

// Function to add a new prescription
export async function addPrescription(userId, name, dosage, frequency) {
  try {
    const docRef = await addDoc(prescriptionsCollection, {
      userId,
      name,
      dosage,
      frequency,
      remaining: 30, // Default value
    });
    console.log("Prescription added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding prescription: ", error);
  }
}

// Function to fetch a specific prescription by ID
export async function getPrescriptionById(prescriptionId) {
  try {
    const docRef = doc(db, "prescriptions", prescriptionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching prescription: ", error);
  }
}