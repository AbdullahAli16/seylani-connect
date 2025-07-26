import { useState } from "react"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../Services/firebase"; 
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); try {
      await signInWithEmailAndPassword(auth, email, password); navigate("/admin/dashboard");
    } catch (err) { setError("Invalid admin credentials"); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" required className="w-full mb-3 p-2 bg-gray-800 rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full mb-4 p-2 bg-gray-800 rounded" />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded">Login</button>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}

        <div className="mt-4 text-sm text-gray-400 text-center">
          Are you a user?{" "}
          <Link to="/user/login" className="text-blue-400 hover:underline">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
