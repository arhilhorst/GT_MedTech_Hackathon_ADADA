import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Prescriptions() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [remaining, setRemaining] = useState(""); // Optional input
  const [message, setMessage] = useState("");

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage("You must be logged in to add prescriptions.");
      return;
    }

    const userId = auth.currentUser.uid;
    try {
      await addDoc(collection(db, "prescriptions"), {
        userId,
        name,
        dosage,
        frequency,
        remaining: remaining || 30, // Default to 30 if not specified
        createdAt: new Date(),
      });

      setMessage("Prescription added successfully!");
      setName("");
      setDosage("");
      setFrequency("");
      setRemaining(""); // Reset the optional field
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Prescription</h2>
      {message && <p className="text-sm text-red-500">{message}</p>}
      <form onSubmit={handleAddPrescription} className="space-y-4">
        <input
          type="text"
          placeholder="Medication Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg)"
          className="w-full p-2 border rounded"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Frequency (e.g., Twice a day)"
          className="w-full p-2 border rounded"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <input
          type="number"
          placeholder="Remaining Stock (default: 30)"
          className="w-full p-2 border rounded"
          value={remaining}
          onChange={(e) => setRemaining(e.target.value)}
        />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          Add Prescription
        </button>
      </form>
    </div>
  );
}