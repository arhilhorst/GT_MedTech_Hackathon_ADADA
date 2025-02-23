import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import Button from "./Button";
import Alert from "./Alert";

export default function RefillButton({ pill }) {
  const [alert, setAlert] = useState(null);

  const handleRefillRequest = async () => {
    try {
      await addDoc(collection(db, "refillRequests"), {
        userId: pill.userId,
        medication: pill.name,
        requestedAt: new Date(),
      });

      setAlert("Refill request sent!");
    } catch (error) {
      setAlert("Error requesting refill.");
    }
  };

  return (
    <div>
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
      <Button onClick={handleRefillRequest} className="mt-2">Request Refill</Button>
    </div>
  );
}