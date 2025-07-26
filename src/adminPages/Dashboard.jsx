import { useEffect, useState } from "react";
import { db } from "../Services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../Services/firebase";
import { signOut } from "firebase/auth";



const Dashboard=()=>{
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);
    const handleLogout = async () => {
    await signOut(auth);
    navigate("/");};

    useEffect(() => {
      const fetchData = async () => {
      const appointmentsSnap = await getDocs(collection(db, "appointments"));
      const helpSnap = await getDocs(collection(db, "helpRequests"));

      setAppointments(appointmentsSnap.docs.map(doc => doc.data()));
      setHelpRequests(helpSnap.docs.map(doc => doc.data()));
    };

    fetchData();
    }, []);
    const countByStatus = (items, status) => {
    return items.filter(item => item.status === status).length;
    };


    return (
  <div className="bg-black min-h-screen">
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
         
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded shadow">
          Total Appointments: {appointments.length}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          Total Help Requests: {helpRequests.length}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          Pending: {countByStatus([...appointments, ...helpRequests], "pending")}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          Approved: {countByStatus([...appointments, ...helpRequests], "approved")}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          Rejected: {countByStatus([...appointments, ...helpRequests], "rejected")}
        </div>
      </div>
      

<div className="mt-6 flex gap-4">
  <button
    onClick={() => navigate("/admin/appointments")}
    className="bg-blue-600 px-4 py-2 rounded"
  >
    Appointments
  </button>
  <button
    onClick={() => navigate("/admin/help-requests")}
    className="bg-green-600 px-4 py-2 rounded"
  >
    Help Requests
  </button>
  <button onClick={() => navigate("/admin/users")} 
  className="bg-yellow-600 px-4 py-2 rounded">
    Users
  </button>
  <button
    onClick={handleLogout}
    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
    Logout
  </button>
    </div>

    </div>
    </div>
  );
};

export default Dashboard;