
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Cart.css';
// import { validateCoupon } from '../services/api';
// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const navigate = useNavigate();
//   // In Cart.jsx - Add these state variables
// const [couponCode, setCouponCode] = useState('');
// const [appliedCoupon, setAppliedCoupon] = useState(null);
// const [discount, setDiscount] = useState(0);
// const [couponError, setCouponError] = useState('');
// const [validatingCoupon, setValidatingCoupon] = useState(false);

// // Add this function to handle coupon application
// const applyCoupon = async () => {
//   if (!couponCode.trim()) {
//     setCouponError('Please enter a coupon code');
//     return;
//   }

//   setValidatingCoupon(true);
//   setCouponError('');

//   try {
//     const restaurantId = cartItems[0]?.restaurantId; // Get first item's restaurant
    
//     const response = await validateCoupon({
//       code: couponCode,
//       orderAmount: total,
//       restaurantId: restaurantId
//     });

//     if (response.data.valid) {
//       setAppliedCoupon(response.data.coupon);
//       setDiscount(response.data.coupon.discountAmount);
//       setCouponError('');
//       alert(`Coupon applied! You saved $${response.data.coupon.discountAmount.toFixed(2)}`);
//     }
//   } catch (error) {
//     console.error('Coupon error:', error);
//     setCouponError(error.response?.data?.message || 'Invalid coupon code');
//     setAppliedCoupon(null);
//     setDiscount(0);
//   } finally {
//     setValidatingCoupon(false);
//   }
// };

// const removeCoupon = () => {
//   setAppliedCoupon(null);
//   setDiscount(0);
//   setCouponCode('');
//   setCouponError('');
// };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   useEffect(() => {
//     calculateTotal();
//   }, [cartItems]);

//   const loadCart = () => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(cart);
//   };

//   const calculateTotal = () => {
//     const sum = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//     setTotal(sum);
//   };

//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     const updatedCart = cartItems.map(item =>
//       item._id === itemId ? { ...item, quantity: newQuantity } : item
//     );
    
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeItem = (itemId) => {
//     const updatedCart = cartItems.filter(item => item._id !== itemId);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   // const handleCheckout = () => {
//   //   const token = localStorage.getItem('token');
//   //   if (!token) {
//   //     navigate('/login', { state: { from: '/cart' } });
//   //   } else {
//   //     navigate('/checkout');
//   //   }
//   // };
//   // In Cart.jsx, update the handleCheckout function
// const handleCheckout = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     navigate('/login', { state: { from: '/cart' } });
//   } else {
//     navigate('/checkout'); // Change this from '/checkout' to '/checkout'
//   }
// };

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart-page empty-cart">
//         <div className="container">
//           <h1>Your Cart is Empty</h1>
//           <p>Add some delicious items to your cart!</p>
//           <button onClick={() => navigate('/')} className="btn">
//             Browse Restaurants
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="container">
//         <h1>Shopping Cart</h1>
        
//         <div className="cart-content">
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div key={item._id} className="cart-item">
//                 <img src={item.image} alt={item.name} />
//                 <div className="item-details">
//                   <h3>{item.name}</h3>
//                   <p className="item-price">${item.price.toFixed(2)}</p>
//                 </div>
//                 <div className="item-quantity">
//                   <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
//                     +
//                   </button>
//                 </div>
//                 <div className="item-total">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </div>
//                 <button 
//                   onClick={() => removeItem(item._id)}
//                   className="remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h2>Order Summary</h2>
//              {/* Coupon Section */}
//   <div className="coupon-section">
//     <h3>Have a coupon?</h3>
//     {!appliedCoupon ? (
//       <div className="coupon-input-group">
//         <input
//           type="text"
//           placeholder="Enter coupon code"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//           disabled={validatingCoupon}
//         />
//         <button 
//           onClick={applyCoupon}
//           disabled={validatingCoupon}
//           className="apply-coupon-btn"
//         >
//           {validatingCoupon ? 'Applying...' : 'Apply'}
//         </button>
//       </div>
//     ) : (
//       <div className="applied-coupon">
//         <span className="coupon-code">{appliedCoupon.code}</span>
//         <span className="coupon-discount">
//           -${appliedCoupon.discountAmount.toFixed(2)}
//         </span>
//         <button onClick={removeCoupon} className="remove-coupon">×</button>
//       </div>
//     )}
//     {couponError && <p className="coupon-error">{couponError}</p>}
//   </div>
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             {/* 👇 ADD THIS CONDITIONAL DISCOUNT ROW */}
//   {appliedCoupon && (
//     <div className="summary-row discount">
//       <span>Discount ({appliedCoupon.code}):</span>
//       <span>-${discount.toFixed(2)}</span>
//     </div>
//   )}
//             <div className="summary-row">
//               <span>Delivery Fee:</span>
//               <span>$2.99</span>
//             </div>
//               {/* 👇 UPDATE TOTAL ROW TO INCLUDE DISCOUNT */}
//   <div className="summary-row total">
//     <span>Total:</span>
//     <span>${(total + 2.99 - discount).toFixed(2)}</span>
//   </div>
  
//   <button onClick={handleCheckout} className="btn checkout-btn">
//     Proceed to Checkout
//   </button>
//             {/* <div className="summary-row total">
//               <span>Total:</span>
//               <span>${(total + 2.99).toFixed(2)}</span>
//             </div>
//             <button onClick={handleCheckout} className="btn checkout-btn">
//               Proceed to Checkout
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
// pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { validateCoupon } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  // Coupon state variables
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  // Apply coupon function
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setValidatingCoupon(true);
    setCouponError('');

    try {
      const restaurantId = cartItems[0]?.restaurantId;
      
      const response = await validateCoupon({
        code: couponCode,
        orderAmount: total,
        restaurantId: restaurantId
      });

      if (response.data.valid) {
        setAppliedCoupon(response.data.coupon);
        setDiscount(response.data.coupon.discountAmount);
        setCouponError('');
        alert(`Coupon applied! You saved $${response.data.coupon.discountAmount.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Coupon error:', error);
      setCouponError(error.response?.data?.message || 'Invalid coupon code');
      setAppliedCoupon(null);
      setDiscount(0);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
    setCouponError('');
  };

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

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
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
                  
                  {/* Show customizations if any */}
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="item-customizations">
                      <small style={{ color: '#666' }}>
                        <strong>Options:</strong> {item.customizations.map(c => c.name).join(', ')}
                      </small>
                    </div>
                  )}
                  
                  {/* Show base price if customized */}
                  {item.basePrice && item.basePrice !== item.price && (
                    <div className="item-base-price">
                      <small style={{ color: '#888' }}>
                        Base: ${item.basePrice.toFixed(2)} + 
                        ${(item.customizationCost || 0).toFixed(2)} customizations
                      </small>
                    </div>
                  )}
                  
                  {/* Show special instructions if any */}
                  {item.specialInstructions && (
                    <div className="item-instructions">
                      <small style={{ color: '#e67e22', fontStyle: 'italic' }}>
                        📝 Note: {item.specialInstructions}
                      </small>
                    </div>
                  )}
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
            
            {/* Coupon Section */}
            <div className="coupon-section">
              <h3>Have a coupon?</h3>
              {!appliedCoupon ? (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={validatingCoupon}
                  />
                  <button 
                    onClick={applyCoupon}
                    disabled={validatingCoupon}
                    className="apply-coupon-btn"
                  >
                    {validatingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </div>
              ) : (
                <div className="applied-coupon">
                  <span className="coupon-code">{appliedCoupon.code}</span>
                  <span className="coupon-discount">
                    -${appliedCoupon.discountAmount.toFixed(2)}
                  </span>
                  <button onClick={removeCoupon} className="remove-coupon">×</button>
                </div>
              )}
              {couponError && <p className="coupon-error">{couponError}</p>}
            </div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {/* Discount Row */}
            {appliedCoupon && (
              <div className="summary-row discount">
                <span>Discount ({appliedCoupon.code}):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>$2.99</span>
            </div>
            
            {/* Total Row with Discount */}
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total + 2.99 - discount).toFixed(2)}</span>
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