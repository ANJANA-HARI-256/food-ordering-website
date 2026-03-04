
import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getMyOrders();
      console.log("Orders fetched:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        alert("Please login to view orders");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading orders...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>📜 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found. Start shopping!</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              margin: "15px 0",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong>Order #{order._id.substring(0, 8)}</strong>
              <span style={{ 
                color: order.orderStatus === 'delivered' ? 'green' : 
                       order.orderStatus === 'cancelled' ? 'red' : 'orange'
              }}>
                Status: {order.orderStatus || 'pending'}
              </span>
            </div>
            
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>

            <div style={{ margin: "10px 0" }}>
              {order.items.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ 
              borderTop: "1px solid #eee", 
              marginTop: "10px", 
              paddingTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold"
            }}>
              <span>Total:</span>
              <span>${order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;