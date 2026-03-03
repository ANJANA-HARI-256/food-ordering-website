// // App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Restaurant from './pages/Restaurant';
// import Menu from './pages/Menu';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Admin from './pages/Admin';
// import OrderHistory from './pages/OrderHistory';
// import './App.css';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           {/* Public Routes - Only login and signup are public */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           {/* Protected Routes - All other pages require login */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Restaurant />
//             </ProtectedRoute>
//           } />
//           <Route path="/menu" element={
//             <ProtectedRoute>
//               <Menu />
//             </ProtectedRoute>
//           } />
//           <Route path="/cart" element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           } />
//           <Route path="/orders" element={
//             <ProtectedRoute>
//               <OrderHistory />
//             </ProtectedRoute>
//           } />
//           <Route path="/admin" element={
//             <ProtectedRoute>
//               <Admin />
//             </ProtectedRoute>
//           } />
          
//           {/* Catch all - redirect to login if no match */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.jsx - Add Checkout import and route
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Restaurant from './pages/Restaurant';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // Add this import
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import OrderHistory from './pages/OrderHistory';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Restaurant />
            </ProtectedRoute>
          } />
          <Route path="/menu" element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={  // Add this route
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;