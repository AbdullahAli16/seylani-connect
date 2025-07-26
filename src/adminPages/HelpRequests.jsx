import { useEffect, useState } from "react";
import { db } from "../Services/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const HelpRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snap = await getDocs(collection(db, "helpRequests"));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const ref = doc(db, "helpRequests", id); // 🔧 fixed collection name
    await updateDoc(ref, { status: newStatus });

    setRequests(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Help Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-gray-700">
                <td className="py-2 px-4">{req.name || "N/A"}</td>
                <td className="py-2 px-4">{req.email}</td>
                <td className="py-2 px-4">{req.type}</td>
                <td className="py-2 px-4">{req.description}</td>
                <td className="py-2 px-4 capitalize">{req.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded"
                    onClick={() => handleStatusChange(req.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded"
                    onClick={() => handleStatusChange(req.id, "rejected")}
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

export default HelpRequests;
