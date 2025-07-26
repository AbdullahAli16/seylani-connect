import { useEffect, useState } from "react";
import { db } from "../Services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyRequests = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apptSnap = await getDocs(collection(db, "appointments"));
      const helpSnap = await getDocs(collection(db, "helpRequests"));

      setAppointments(
        apptSnap.docs
          .map((doc) => doc.data())
          .filter((a) => a.email === currentUser.email)
      );
      setHelpRequests(
        helpSnap.docs
          .map((doc) => doc.data())
          .filter((h) => h.email === currentUser.email)
      );
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <h2 className="text-2xl font-bold mb-6 text-center">My Requests:</h2>

      {/* Appointments Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">My Appointments:</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-400 text-sm">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((a, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p><span className="font-semibold">Reason:</span> {a.reason}</p>
                <p><span className="font-semibold">Date:</span> {a.date}</p>
                <p><span className="font-semibold">Time:</span> {a.time}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={
                    a.status === "approved" ? "text-green-400" :
                    a.status === "rejected" ? "text-red-400" : "text-yellow-400"
                  }>
                    {a.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Requests Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">My Help Requests:</h3>
        {helpRequests.length === 0 ? (
          <p className="text-gray-400 text-sm">No help requests found.</p>
        ) : (
          <div className="space-y-4">
            {helpRequests.map((h, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <p><span className="font-semibold">Type:</span> {h.type}</p>
                <p><span className="font-semibold">Description:</span> {h.description}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={
                    h.status === "approved" ? "text-green-400" :
                    h.status === "rejected" ? "text-red-400" : "text-yellow-400"
                  }>
                    {h.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
