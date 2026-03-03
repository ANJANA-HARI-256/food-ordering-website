// pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Your cart is empty!');
      navigate('/cart');
      return;
    }
    setCartItems(cart);
    
    // Calculate total
    const sum = cart.reduce((acc, item) => acc + (item.price * (item.quantity || item.qty || 1)), 0);
    setTotal(sum);
    
    // Load user data if available
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.address) setAddress(user.address);
    if (user.phone) setPhone(user.phone);
  }, [navigate]);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('Please enter delivery address');
      return;
    }

    if (!phone.trim()) {
      alert('Please enter phone number');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || item.qty || 1,
          _id: item._id
        })),
        totalPrice: total + 2.99, // Including delivery fee
        shippingAddress: address,
        phone: phone
      };

      console.log('Placing order:', orderData);
      
      const response = await createOrder(orderData);
      console.log('Order response:', response.data);

      // Clear cart
      localStorage.removeItem('cart');
      
      alert('Order placed successfully!');
      navigate('/orders'); // Redirect to order history
    } catch (error) {
      console.error('Order error:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Delivery Details</h2>
            
            <div className="form-group">
              <label>Delivery Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            
            {cartItems.map((item) => (
              <div key={item._id} className="summary-item">
                <span>{item.name} x {item.quantity || item.qty || 1}</span>
                <span>${((item.price * (item.quantity || item.qty || 1))).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="summary-divider"></div>
            
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

            <button 
              onClick={handlePlaceOrder}
              className="btn place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            <button 
              onClick={() => navigate('/cart')}
              className="btn back-btn"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;