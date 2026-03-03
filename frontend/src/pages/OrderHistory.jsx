// import { useEffect, useState } from "react";
// import { getMyOrders, cancelOrder } from "../services/api"; // Change getOrders to getMyOrders

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await getMyOrders(); // Use getMyOrders instead of getOrders
//       console.log("Orders fetched:", res.data); // Debug log
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       if (err.response?.status === 401) {
//         alert("Please login to view orders");
//       } else {
//         alert("Failed to fetch orders");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = async (orderId) => {
//     if (window.confirm("Are you sure you want to cancel this order?")) {
//       try {
//         await cancelOrder(orderId);
//         alert("Order cancelled successfully");
//         fetchOrders(); // Refresh the list
//       } catch (err) {
//         console.error("Cancel error:", err);
//         alert("Could not cancel order. It might already be processed.");
//       }
//     }
//   };

//   if (loading) {
//     return <div style={{ padding: "20px", textAlign: "center" }}>Loading orders...</div>;
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h2>📜 Your Order History</h2>

//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         orders.map((order) => (
//           <div
//             key={order._id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               margin: "15px 0",
//               padding: "15px",
//               backgroundColor: order.orderStatus === "cancelled" ? "#f8d7da" : "#fff",
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h4>Order ID: {order._id.substring(0, 8)}...</h4>
//               <strong style={{ 
//                 color: order.orderStatus === "cancelled" ? "red" : 
//                        order.orderStatus === "delivered" ? "green" : "orange" 
//               }}>
//                 Status: {order.orderStatus || "pending"}
//               </strong>
//             </div>
            
//             <p style={{ fontSize: "0.9rem", color: "#666" }}>
//               Date: {new Date(order.createdAt).toLocaleString()}
//             </p>

//             <div style={{ margin: "10px 0", paddingLeft: "10px", borderLeft: "3px solid #eee" }}>
//               {order.items.map((item, index) => (
//                 <div key={index} style={{ marginBottom: "5px" }}>
//                   {item.name} — ₹{item.price} × {item.quantity || item.qty || 1}
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
//               <h4>Total: ₹{order.totalPrice || order.totalAmount}</h4>

//               {order.orderStatus !== "cancelled" && order.orderStatus !== "delivered" && (
//                 <button
//                   onClick={() => handleCancel(order._id)}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     color: "#dc3545",
//                     textDecoration: "underline",
//                     cursor: "pointer",
//                     fontSize: "0.9rem"
//                   }}
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default OrderHistory;
// pages/OrderHistory.jsx
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