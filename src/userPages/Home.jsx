import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Services/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        }
      }
    };

    fetchName();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="bg-gray-900 p-5 rounded-lg shadow text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome,</h1>
        <p className="text-lg text-blue-400">{name || currentUser.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/user/book" className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-center font-medium shadow transition duration-200">📅 Book Appointment</Link>
        <Link to="/user/help" className="bg-green-600 hover:bg-green-700 p-4 rounded-lg text-center font-medium shadow transition duration-200">🤝 Request Help</Link>
        <Link to="/user/requests" className="bg-yellow-600 hover:bg-yellow-700 p-4 rounded-lg text-center font-medium shadow transition duration-200">📂 My Requests</Link>
        <Link to="/user/profile" className="bg-gray-700 hover:bg-gray-800 p-4 rounded-lg text-center font-medium shadow transition duration-200">👤 Profile</Link>

      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={async () => {
          await signOut(auth);
          navigate("/user/login");}}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-sm font-medium shadow transition duration-200">
          Logout
    </button>
</div>

    </div>
  );
};

export default Home;
