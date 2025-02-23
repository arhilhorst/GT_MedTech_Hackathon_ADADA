import { motion } from "framer-motion";
import Button from "./Button";
import RefillButton from "./RefillButton";

export default function PrescriptionCard({ pill, onMarkAsTaken }) {
  const isLowStock = pill.remaining <= 5; // Low stock condition
  const isOutOfStock = pill.remaining <= 0; // Out of stock condition

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
    >
      {/* Prescription Details */}
      <div>
        <h3 className="text-lg font-bold">{pill.name}</h3>
        <p className="text-sm text-gray-600">Dosage: {pill.dosage}</p>
        <p className="text-sm text-gray-600">Frequency: {pill.frequency}</p>
        <p className="text-sm text-gray-600">Remaining: {pill.remaining}</p>

        {/* Low Stock Warning */}
        {isLowStock && !isOutOfStock && (
          <p className="text-sm text-red-500">⚠️ Low stock!</p>
        )}

        {/* Out of Stock Warning */}
        {isOutOfStock && (
          <p className="text-sm text-red-500">❌ Out of stock!</p>
        )}

        {/* Missed Dose Warning */}
        {pill.missed && (
          <p className="text-sm text-red-500">Missed dose!</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center">
        {/* "Mark as Taken" Button */}
        <Button
          onClick={() => onMarkAsTaken(pill.id)}
          disabled={isOutOfStock} // Disable if stock is zero
        >
          Mark as Taken
        </Button>

        {/* "Refill" Button (conditionally rendered) */}
        {isLowStock && <RefillButton pill={pill} />}
      </div>
    </motion.div>
  );
}