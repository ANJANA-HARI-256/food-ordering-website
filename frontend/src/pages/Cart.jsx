// // // import { useEffect, useState } from "react";
// // // import { placeOrder } from "../services/api";

// // // function Cart() {
// // //   const [cart, setCart] = useState([]);

// // //   useEffect(() => {
// // //     const data = JSON.parse(localStorage.getItem("cart")) || [];
// // //     setCart(data);
// // //   }, []);

// // //   const removeItem = (id) => {
// // //     const updated = cart.filter(item => item._id !== id);
// // //     setCart(updated);
// // //     localStorage.setItem("cart", JSON.stringify(updated));
// // //   };

// // //   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>Your Cart</h2>

// // //       {cart.length === 0 && <p>Cart is empty</p>}

// // //       {cart.map(item => (
// // //         <div key={item._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
// // //           <h3>{item.name}</h3>
// // //           <p>₹{item.price} × {item.qty}</p>
// // //           <button onClick={() => removeItem(item._id)}>Remove</button>
// // //         </div>
// // //       ))}

// // //       <h3>Total: ₹{total}</h3>
// // //     </div>
// // //   );
// // // }

// // // export default Cart;
// // import { useEffect, useState } from "react";
// // import { placeOrder } from "../services/api";

// // function Cart() {
// //   const [cart, setCart] = useState([]);

// //   useEffect(() => {
// //     const data = JSON.parse(localStorage.getItem("cart")) || [];
// //     setCart(data);
// //   }, []);

// //   const removeItem = (id) => {
// //     const updated = cart.filter(item => item._id !== id);
// //     setCart(updated);
// //     localStorage.setItem("cart", JSON.stringify(updated));
// //   };

// //   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

// //   // ✅ Place Order Function
// //   const handleOrder = async () => {
// //     if (cart.length === 0) {
// //       alert("Cart is empty");
// //       return;
// //     }

// //     try {
// //       const orderData = {
// //         items: cart,
// //         totalAmount: total,
// //       };

// //       const res = await placeOrder(orderData);

// //       alert(res.data.message || "Order placed successfully");

// //       // Clear cart
// //       localStorage.removeItem("cart");
// //       setCart([]);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Order failed. Please login again.");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Your Cart</h2>

// //       {cart.length === 0 && <p>Cart is empty</p>}

// //       {cart.map(item => (
// //         <div
// //           key={item._id}
// //           style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
// //         >
// //           <h3>{item.name}</h3>
// //           <p>₹{item.price} × {item.qty}</p>
// //           <button onClick={() => removeItem(item._id)}>Remove</button>
// //         </div>
// //       ))}

// //       <h3>Total: ₹{total}</h3>

// //       {/* ✅ Place Order Button */}
// //       {cart.length > 0 && (
// //         <button onClick={handleOrder} style={{ marginTop: "10px" }}>
// //           Place Order
// //         </button>
// //       )}
// //     </div>
// //   );
// // }

// // export default Cart;
// import { useEffect, useState } from "react";
// import { placeOrder } from "../services/api";

// function Cart() {
//   const [cart, setCart] = useState([]);
//   const [coupon, setCoupon] = useState(""); // Track input text
//   const [discount, setDiscount] = useState(0); // Track discount amount
//   const [isCouponApplied, setIsCouponApplied] = useState(false);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(data);
//   }, []);

//   const removeItem = (id) => {
//     const updated = cart.filter(item => item._id !== id);
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // Calculations
//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const finalTotal = subtotal - discount;

//   // ✅ Handle Coupon logic
//   const applyCoupon = () => {
//     if (coupon.toUpperCase() === "SAVE10") {
//       const discountValue = subtotal * 0.1; // 10% discount
//       setDiscount(discountValue);
//       setIsCouponApplied(true);
//       alert("Coupon Applied! You got 10% off.");
//     } else {
//       alert("Invalid Coupon Code");
//       setDiscount(0);
//       setIsCouponApplied(false);
//     }
//   };

//   const handleOrder = async () => {
//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {
//       const orderData = {
//         items: cart,
//         totalAmount: finalTotal,
//         couponUsed: isCouponApplied ? coupon : "NONE",
//       };

//       const res = await placeOrder(orderData);
      
//       // ✅ Requirement: Instant order confirmation
//       alert("🎉 Order Confirmed! " + (res.data.message || "Your food is on the way."));

//       localStorage.removeItem("cart");
//       setCart([]);
//       setDiscount(0);
//       setCoupon("");
//     } catch (err) {
//       console.error(err);
//       alert("Order failed. Please login again.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>🛒 Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <>
//           {cart.map(item => (
//             <div key={item._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
//               <h3>{item.name}</h3>
//               <p>₹{item.price} × {item.qty} = <strong>₹{item.price * item.qty}</strong></p>
//               <button onClick={() => removeItem(item._id)} style={{ color: "red" }}>Remove</button>
//             </div>
//           ))}

//           <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
//             {/* ✅ Coupon Input Field */}
//             <div style={{ marginBottom: "10px" }}>
//               <input 
//                 type="text" 
//                 placeholder="Enter Coupon (e.g. SAVE10)" 
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//                 style={{ padding: "8px", marginRight: "10px" }}
//               />
//               <button onClick={applyCoupon}>Apply Coupon</button>
//             </div>

//             <p>Subtotal: ₹{subtotal}</p>
//             {discount > 0 && <p style={{ color: "green" }}>Discount: -₹{discount}</p>}
//             <hr />
//             <h3>Total to Pay: ₹{finalTotal}</h3>

//             <button 
//               onClick={handleOrder} 
//               style={{ 
//                 marginTop: "10px", 
//                 padding: "10px 20px", 
//                 backgroundColor: "#28a745", 
//                 color: "white", 
//                 border: "none",
//                 cursor: "pointer",
//                 width: "100%"
//               }}
//             >
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // const handleCheckout = () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login', { state: { from: '/cart' } });
  //   } else {
  //     navigate('/checkout');
  //   }
  // };
  // In Cart.jsx, update the handleCheckout function
const handleCheckout = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login', { state: { from: '/cart' } });
  } else {
    navigate('/checkout'); // Change this from '/checkout' to '/checkout'
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <h1>Your Cart is Empty</h1>
          <p>Add some delicious items to your cart!</p>
          <button onClick={() => navigate('/')} className="btn">
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeItem(item._id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>$2.99</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total + 2.99).toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;