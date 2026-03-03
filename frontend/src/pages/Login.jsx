// // // import { useState } from "react";
// // // import { useNavigate ,Link} from "react-router-dom";
// // // import API from "../services/api";
// // // // import React from 'react'

// // // function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const navigate = useNavigate();
// // //   const handleLogin = async () => {
// // //   try {
// // //     console.log("Sending:", email, password); 
// // //     const res = await API.post("/login", {
// // //       email,
// // //       password,
// // //     });

// // //     localStorage.setItem("token", res.data.token);
// // //     alert("Login successful");
// // //     navigate("/dashboard");
// // //   } catch (error) {
// // //     // 
// // //   //    console.log(error.response?.data || error.message);
// // //   // alert(error.response?.data?.message || "Login failed");
  
// // //   console.log(error.response?.data);
// // //   alert("Login failed");
// // //   }
// // //  };
// // //   return (
// // //     <div>
// // //       <h2>Login page</h2>
// // //       <input type="email" placeholder="Enter email address" onChange={(e)=> setEmail(e.target.value)}/>
// // //       <br /><br />
// // //       <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
// // //       <br /><br />
// // //       <button onClick={handleLogin}>Login</button>
// // //       <br />
// // // <p>
// // //   Don't have an account? <Link to="/signup">Signup</Link>
// // // </p>
// // //     </div>
// // //   );
// // // }

// // // export default Login;
// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import API from "../services/api";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     try {
// //       const res = await API.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //       localStorage.setItem("token", res.data.token);
// //       alert("Login successful");
// //       navigate("/menu");   // or dashboard if you created it
// //     } catch (error) {
// //       console.log(error.response?.data || error.message);
// //       alert(error.response?.data?.msg || "Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login page</h2>

// //       <input
// //         type="email"
// //         placeholder="Enter email"
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <br /><br />

// //       <input
// //         type="password"
// //         placeholder="Enter password"
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <br /><br />

// //       <button onClick={handleLogin}>Login</button>

// //       <p>
// //         Don't have an account? <Link to="/signup">Signup</Link>
// //       </p>
// //     </div>
// //   );
// // }

// // export default Login;
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";
// import "./Auth.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       alert("Login successful");
//       navigate("/menu");
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//       alert(error.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2> Login</h2>

//         <input
//           type="email"
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button onClick={handleLogin}>Login</button>

//         <p>
//           Don't have an account? <Link to="/signup">Signup</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
// pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        _id: res.data._id
      }));
      
      alert("Login successful");
      navigate("/"); // Redirect to restaurants page
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;