// // // 
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";

// // function Signup() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();
// //   const handleSignup = async () => {
// //   try {
// //     await API.post("/signup", {
// //       name,
// //       email,
// //       password,
// //       role: "user"
// //     });

// //     alert("Signup successful");
// //     navigate("/"); // go to login page
// //   } catch (error) {
// //     console.log(error.response?.data);
// //     alert("Signup failed");
// //   }
// // };
// //   return (
// //     <div>
// //       <h2>Signup Page</h2>

// //       <input
// //         type="text"
// //         placeholder="Enter name"
// //         onChange={(e) => setName(e.target.value)}
// //       />
// //       <br /><br />

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
// //       <button onClick={handleSignup}>Signup</button>
      
// //     </div>
// //   );
// // }

// // export default Signup;
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";
// import "./Auth.css";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await API.post("/auth/signup", {
//         name,
//         email,
//         password,
//         role: "user"
//       });

//       alert("Signup successful");
//       navigate("/"); // back to login
//     } catch (error) {
//       console.log(error.response?.data);
//       alert(error.response?.data?.msg || "Signup failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Create Account</h2>

//         <input
//           type="text"
//           placeholder="Enter name"
//           onChange={(e) => setName(e.target.value)}
//         />

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

//         <button onClick={handleSignup}>Signup</button>

//         <p>
//           Already have an account? <Link to="/">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
// pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role: "user"
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;