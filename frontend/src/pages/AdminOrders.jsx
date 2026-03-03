import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Admin access only");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - All Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h4>User: {order.userId?.name}</h4>
          <p>Email: {order.userId?.email}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

          {order.items.map((item, index) => (
            <div key={index}>
              {item.name} — ₹{item.price} × {item.qty}
            </div>
          ))}

          <h4>Total: ₹{order.totalAmount}</h4>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;