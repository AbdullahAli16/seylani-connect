import { useEffect, useState } from "react";
import { db } from "../Services/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const snap = await getDocs(collection(db, "appointments"));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const ref = doc(db, "appointments", id);
    await updateDoc(ref, { status: newStatus });

    setAppointments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b border-gray-700">
                <td className="py-2 px-4">{appt.name || "N/A"}</td>
                <td className="py-2 px-4">{appt.email}</td>
                <td className="py-2 px-4">{appt.reason}</td>
                <td className="py-2 px-4">{appt.date}</td>
                <td className="py-2 px-4">{appt.time}</td>
                <td className="py-2 px-4 capitalize">{appt.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded"
                    onClick={() => handleStatusChange(appt.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded"
                    onClick={() => handleStatusChange(appt.id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
