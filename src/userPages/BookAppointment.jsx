import { useState } from "react";
import { db } from "../Services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const BookAppointment = () => {
  const { currentUser } = useAuth();
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "appointments"), {
      name: currentUser.displayName || "User",
      email: currentUser.email,
      phone: "N/A",
      reason,
      date,
      time,
      status: "pending",
    });
    alert("Appointment submitted!");
    setReason("");
    setDate("");
    setTime("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            className="w-full bg-gray-800 p-3 rounded placeholder-gray-400 text-white"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded text-white"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition duration-200"
          >
            Submit Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
