import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../Services/firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            name: data.name || "N/A",
            phone: data.phone || "N/A",
            email: data.email || currentUser.email,
          });
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">My Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <div className="bg-gray-800 p-3 rounded text-white">{userData.name}</div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Phone</label>
            <div className="bg-gray-800 p-3 rounded text-white">{userData.phone}</div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <div className="bg-gray-800 p-3 rounded text-white">{userData.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
