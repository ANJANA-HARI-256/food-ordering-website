import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
// import React from 'react'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
  try {
    console.log("Sending:", email, password); 
    const res = await API.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    alert("Login successful");
    navigate("/dashboard");
  } catch (error) {
    // 
  //    console.log(error.response?.data || error.message);
  // alert(error.response?.data?.message || "Login failed");
  
  console.log(error.response?.data);
  alert("Login failed");
  }
 };
  return (
    <div>
      <h2>Login page</h2>
      <input type="email" placeholder="Enter email address" onChange={(e)=> setEmail(e.target.value)}/>
      <br /><br />
      <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
