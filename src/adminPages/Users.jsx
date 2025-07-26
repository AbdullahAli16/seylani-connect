import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Services/firebase";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users")); // ✅ Collection must exist
      const data = snap.docs.map(doc => doc.data());
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="py-2 px-4">{user.name || "N/A"}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
