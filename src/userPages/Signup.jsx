import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../Services/firebase";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        name,
        phone,
        email,
        createdAt: new Date(),
      });
      alert("Signed up successfully! Please login to continue.");
      navigate("/user/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white-400 mb-6">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
