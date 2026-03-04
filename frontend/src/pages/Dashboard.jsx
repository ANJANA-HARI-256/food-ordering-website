
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Step 1: Protect Dashboard (redirect if no token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Step 2: Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        alert("Session expired. Please login again.");
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Step 3: Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.role === "admin" && <p>Admin Access Granted</p>}
{user.role === "seller" && <p>Seller Panel Access</p>}
{user.role === "user" && <p>Welcome User</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;