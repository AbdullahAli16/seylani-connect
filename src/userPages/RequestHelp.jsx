import { useState } from "react";
import { db } from "../Services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const RequestHelp = () => {
  const { currentUser } = useAuth();
  const [type, setType] = useState("Food");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "helpRequests"), {
      name: currentUser.displayName || "User",
      email: currentUser.email,
      phone: "N/A",
      type,
      description,
      status: "pending",
    });
    alert("Help request submitted!");
    setType("Food");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-400">Request Help</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded text-white"
            required
          >
            <option>Food</option>
            <option>Health</option>
            <option>Education</option>
            <option>Other</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your situation..."
            className="w-full bg-gray-800 p-3 rounded text-white placeholder-gray-400 resize-none"
            rows={4}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold transition duration-200"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelp;
