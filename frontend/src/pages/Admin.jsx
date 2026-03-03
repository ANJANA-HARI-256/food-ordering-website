// // // import { useState } from "react";
// // // import API from "../services/api";

// // // function Admin() {
// // //   const [name, setName] = useState("");
// // //   const [price, setPrice] = useState("");

// // //   const addFood = async () => {
// // //     try {
// // //       await API.post("/foods", { name, price });
// // //       alert("Food added successfully");
// // //       setName("");
// // //       setPrice("");
// // //     } catch (error) {
// // //       console.log(error.response?.data || error.message);
// // //       alert("Failed to add food");
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>Admin Panel - Add Food</h2>

// // //       <input
// // //         type="text"
// // //         placeholder="Food name"
// // //         value={name}
// // //         onChange={(e) => setName(e.target.value)}
// // //       />
// // //       <br /><br />

// // //       <input
// // //         type="number"
// // //         placeholder="Price"
// // //         value={price}
// // //         onChange={(e) => setPrice(e.target.value)}
// // //       />
// // //       <br /><br />

// // //       <button onClick={addFood}>Add Food</button>
// // //     </div>
// // //   );
// // // }

// // // export default Admin;
// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { getAllOrders, getFoods, createFood, updateFood, deleteFood } from '../services/api';
// // import './Admin.css';

// // const Admin = () => {
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [orders, setOrders] = useState([]);
// //   const [foods, setFoods] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showFoodModal, setShowFoodModal] = useState(false);
// //   const [editingFood, setEditingFood] = useState(null);
// //   const [foodForm, setFoodForm] = useState({
// //     name: '',
// //     description: '',
// //     price: '',
// //     category: 'Main Course',
// //     restaurant: '',
// //   });

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     if (!user || user.role !== 'admin') {
// //       navigate('/login');
// //       return;
// //     }
// //     fetchData();
// //   }, [activeTab]);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       if (activeTab === 'orders') {
// //         const ordersData = await getAllOrders();
// //         setOrders(ordersData.data);
// //       } else if (activeTab === 'menu') {
// //         const foodsData = await getFoods();
// //         setFoods(foodsData.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //     setLoading(false);
// //   };

// //   const handleFoodSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editingFood) {
// //         await updateFood(editingFood._id, foodForm);
// //       } else {
// //         await createFood(foodForm);
// //       }
// //       setShowFoodModal(false);
// //       setEditingFood(null);
// //       setFoodForm({
// //         name: '',
// //         description: '',
// //         price: '',
// //         category: 'Main Course',
// //         restaurant: '',
// //       });
// //       fetchData();
// //     } catch (error) {
// //       console.error('Error saving food:', error);
// //     }
// //   };

// //   const handleEditFood = (food) => {
// //     setEditingFood(food);
// //     setFoodForm({
// //       name: food.name,
// //       description: food.description,
// //       price: food.price,
// //       category: food.category,
// //       restaurant: food.restaurant,
// //     });
// //     setShowFoodModal(true);
// //   };

// //   const handleDeleteFood = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this item?')) {
// //       try {
// //         await deleteFood(id);
// //         fetchData();
// //       } catch (error) {
// //         console.error('Error deleting food:', error);
// //       }
// //     }
// //   };

// //   const updateOrderStatus = async (orderId, newStatus) => {
// //     try {
// //       // Implement order status update API call
// //       console.log('Update order', orderId, newStatus);
// //       // Refresh orders after update
// //       fetchData();
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //     }
// //   };

// //   const getStats = () => {
// //     const totalOrders = orders.length;
// //     const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
// //     const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    
// //     return { totalOrders, totalRevenue, pendingOrders };
// //   };

// //   const stats = getStats();

// //   return (
// //     <div className="admin-dashboard">
// //       <div className="admin-sidebar">
// //         <h2>Admin Panel</h2>
// //         <ul>
// //           <li className={activeTab === 'dashboard' ? 'active' : ''}>
// //             <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
// //           </li>
// //           <li className={activeTab === 'orders' ? 'active' : ''}>
// //             <button onClick={() => setActiveTab('orders')}>Orders</button>
// //           </li>
// //           <li className={activeTab === 'menu' ? 'active' : ''}>
// //             <button onClick={() => setActiveTab('menu')}>Menu Items</button>
// //           </li>
// //         </ul>
// //       </div>

// //       <div className="admin-content">
// //         {activeTab === 'dashboard' && (
// //           <div className="dashboard">
// //             <h1>Dashboard</h1>
// //             <div className="stats-grid">
// //               <div className="stat-card">
// //                 <h3>Total Orders</h3>
// //                 <p>{stats.totalOrders}</p>
// //               </div>
// //               <div className="stat-card">
// //                 <h3>Total Revenue</h3>
// //                 <p>${stats.totalRevenue.toFixed(2)}</p>
// //               </div>
// //               <div className="stat-card">
// //                 <h3>Pending Orders</h3>
// //                 <p>{stats.pendingOrders}</p>
// //               </div>
// //               <div className="stat-card">
// //                 <h3>Menu Items</h3>
// //                 <p>{foods.length}</p>
// //               </div>
// //             </div>

// //             <div className="recent-orders">
// //               <h2>Recent Orders</h2>
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Order #</th>
// //                     <th>Customer</th>
// //                     <th>Total</th>
// //                     <th>Status</th>
// //                     <th>Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {orders.slice(0, 5).map(order => (
// //                     <tr key={order._id}>
// //                       <td>{order.orderNumber}</td>
// //                       <td>{order.user?.name}</td>
// //                       <td>${order.totalPrice}</td>
// //                       <td>
// //                         <span className={`status ${order.orderStatus}`}>
// //                           {order.orderStatus}
// //                         </span>
// //                       </td>
// //                       <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === 'orders' && (
// //           <div className="orders-management">
// //             <h1>Manage Orders</h1>
// //             <table className="orders-table">
// //               <thead>
// //                 <tr>
// //                   <th>Order #</th>
// //                   <th>Customer</th>
// //                   <th>Items</th>
// //                   <th>Total</th>
// //                   <th>Status</th>
// //                   <th>Payment</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {orders.map(order => (
// //                   <tr key={order._id}>
// //                     <td>{order.orderNumber}</td>
// //                     <td>{order.user?.name}</td>
// //                     <td>{order.orderItems?.length} items</td>
// //                     <td>${order.totalPrice}</td>
// //                     <td>
// //                       <select 
// //                         value={order.orderStatus}
// //                         onChange={(e) => updateOrderStatus(order._id, e.target.value)}
// //                       >
// //                         <option value="pending">Pending</option>
// //                         <option value="confirmed">Confirmed</option>
// //                         <option value="preparing">Preparing</option>
// //                         <option value="ready">Ready</option>
// //                         <option value="delivered">Delivered</option>
// //                         <option value="cancelled">Cancelled</option>
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <span className={`payment-status ${order.paymentStatus}`}>
// //                         {order.paymentStatus}
// //                       </span>
// //                     </td>
// //                     <td>
// //                       <button className="btn-small">View</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {activeTab === 'menu' && (
// //           <div className="menu-management">
// //             <div className="menu-header">
// //               <h1>Manage Menu Items</h1>
// //               <button 
// //                 className="btn"
// //                 onClick={() => {
// //                   setEditingFood(null);
// //                   setFoodForm({
// //                     name: '',
// //                     description: '',
// //                     price: '',
// //                     category: 'Main Course',
// //                     restaurant: '',
// //                   });
// //                   setShowFoodModal(true);
// //                 }}
// //               >
// //                 Add New Item
// //               </button>
// //             </div>

// //             <table className="menu-table">
// //               <thead>
// //                 <tr>
// //                   <th>Image</th>
// //                   <th>Name</th>
// //                   <th>Restaurant</th>
// //                   <th>Category</th>
// //                   <th>Price</th>
// //                   <th>Status</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {foods.map(food => (
// //                   <tr key={food._id}>
// //                     <td>
// //                       <img src={food.image} alt={food.name} width="50" />
// //                     </td>
// //                     <td>{food.name}</td>
// //                     <td>{food.restaurant}</td>
// //                     <td>{food.category}</td>
// //                     <td>${food.price}</td>
// //                     <td>
// //                       <span className={`status ${food.isAvailable ? 'available' : 'unavailable'}`}>
// //                         {food.isAvailable ? 'Available' : 'Unavailable'}
// //                       </span>
// //                     </td>
// //                     <td>
// //                       <button 
// //                         className="btn-small"
// //                         onClick={() => handleEditFood(food)}
// //                       >
// //                         Edit
// //                       </button>
// //                       <button 
// //                         className="btn-small btn-danger"
// //                         onClick={() => handleDeleteFood(food._id)}
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       {/* Food Modal */}
// //       {showFoodModal && (
// //         <div className="modal">
// //           <div className="modal-content">
// //             <h2>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</h2>
// //             <form onSubmit={handleFoodSubmit}>
// //               <div className="form-group">
// //                 <label>Name:</label>
// //                 <input
// //                   type="text"
// //                   value={foodForm.name}
// //                   onChange={(e) => setFoodForm({...foodForm, name: e.target.value})}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Description:</label>
// //                 <textarea
// //                   value={foodForm.description}
// //                   onChange={(e) => setFoodForm({...foodForm, description: e.target.value})}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Price:</label>
// //                 <input
// //                   type="number"
// //                   step="0.01"
// //                   value={foodForm.price}
// //                   onChange={(e) => setFoodForm({...foodForm, price: e.target.value})}
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Category:</label>
// //                 <select
// //                   value={foodForm.category}
// //                   onChange={(e) => setFoodForm({...foodForm, category: e.target.value})}
// //                 >
// //                   <option value="Appetizer">Appetizer</option>
// //                   <option value="Main Course">Main Course</option>
// //                   <option value="Dessert">Dessert</option>
// //                   <option value="Beverage">Beverage</option>
// //                   <option value="Fast Food">Fast Food</option>
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Restaurant:</label>
// //                 <input
// //                   type="text"
// //                   value={foodForm.restaurant}
// //                   onChange={(e) => setFoodForm({...foodForm, restaurant: e.target.value})}
// //                   required
// //                 />
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="submit" className="btn">
// //                   {editingFood ? 'Update' : 'Create'}
// //                 </button>
// //                 <button 
// //                   type="button" 
// //                   className="btn btn-secondary"
// //                   onClick={() => setShowFoodModal(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Admin;
// // pages/Admin.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllOrders, getFoods, createFood, updateFood, deleteFood } from '../services/api';
// import './Admin.css';

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [orders, setOrders] = useState([]);
//   //
//   // In Admin.jsx - Add these state variables
// const [selectedOrder, setSelectedOrder] = useState(null);
// const [showOrderModal, setShowOrderModal] = useState(false);
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showFoodModal, setShowFoodModal] = useState(false);
//   const [editingFood, setEditingFood] = useState(null);
//   const [foodForm, setFoodForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: 'Main Course',
//     restaurant: '',
//     image: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     // Check if user is admin
//     if (!user || user.role !== 'admin') {
//       alert('Access denied. Admin only.');
//       navigate('/');
//       return;
//     }
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'orders' || activeTab === 'dashboard') {
//         const ordersData = await getAllOrders();
//         console.log('Fetched orders:', ordersData.data); 
//         setOrders(ordersData.data);
//       }
//       if (activeTab === 'menu' || activeTab === 'dashboard') {
//         const foodsData = await getFoods();
//         setFoods(foodsData.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//     setLoading(false);
//   };

//   const handleFoodSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingFood) {
//         await updateFood(editingFood._id, foodForm);
//         alert('Food item updated successfully!');
//       } else {
//         await createFood(foodForm);
//         alert('Food item added successfully!');
//       }
//       setShowFoodModal(false);
//       setEditingFood(null);
//       setFoodForm({
//         name: '',
//         description: '',
//         price: '',
//         category: 'Main Course',
//         restaurant: '',
//         image: ''
//       });
//       fetchData();
//     } catch (error) {
//       console.error('Error saving food:', error);
//       alert('Failed to save food item');
//     }
//   };

//   const handleEditFood = (food) => {
//     setEditingFood(food);
//     setFoodForm({
//       name: food.name,
//       description: food.description || '',
//       price: food.price,
//       category: food.category || 'Main Course',
//       restaurant: food.restaurant || '',
//       image: food.image || ''
//     });
//     setShowFoodModal(true);
//   };

//   const handleDeleteFood = async (id) => {
//     if (window.confirm('Are you sure you want to delete this item?')) {
//       try {
//         await deleteFood(id);
//         alert('Food item deleted successfully!');
//         fetchData();
//       } catch (error) {
//         console.error('Error deleting food:', error);
//         alert('Failed to delete food item');
//       }
//     }
//   };

//   // const updateOrderStatus = async (orderId, newStatus) => {
//   //   try {
//   //     // You'll need to implement this API endpoint
//   //     // await updateOrderStatus(orderId, newStatus);
//   //     alert(`Order status updated to ${newStatus}`);
//   //     fetchData();
//   //   } catch (error) {
//   //     console.error('Error updating order:', error);
//   //   }
//   // };
//   // In Admin.jsx - Update this function
// const updateOrderStatus = async (orderId, newStatus) => {
//   try {
//     console.log(`Updating order ${orderId} to status: ${newStatus}`);
    
//     // Get token
//     const token = localStorage.getItem('token');
    
//     // Make API call to update status
//     const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ status: newStatus })
//     });
//     // In Admin.jsx - Add this function
// const viewOrderDetails = (order) => {
//   setSelectedOrder(order);
//   setShowOrderModal(true);
// };
//     const data = await response.json();
//     console.log('Update response:', data);
    
//     if (response.ok) {
//       alert(`Order status updated to ${newStatus} successfully!`);
      
//       // IMPORTANT: Refresh the orders list to show updated status
//       fetchData(); // This will reload all orders from the server
//     } else {
//       alert('Failed to update order: ' + (data.message || 'Unknown error'));
//     }
//   } catch (error) {
//     console.error('Error updating order:', error);
//     alert('Error updating order. Check console for details.');
//   }
// };

//   // In Admin.jsx - Replace the updateOrderStatus function

// // const updateOrderStatus = async (orderId, newStatus) => {
// //   try {
// //     // Show loading state (optional)
// //     const orderToUpdate = orders.find(o => o._id === orderId);
// //     const oldStatus = orderToUpdate?.orderStatus;
    
// //     // Optimistically update UI
// //     setOrders(orders.map(order => 
// //       order._id === orderId ? { ...order, orderStatus: newStatus } : order
// //     ));
    
// //     // Call API to update in database
// //     await updateOrderStatus(orderId, newStatus); // Make sure this function is imported
    
// //     alert(`Order status updated to ${newStatus} successfully!`);
    
// //     // Refresh orders to get latest data
// //     fetchData();
// //   } catch (error) {
// //     console.error('Error updating order:', error);
// //     alert('Failed to update order status. Please try again.');
    
// //     // Revert on error
// //     fetchData(); // Refresh to get original state
// //   }
// // };

//   const getDashboardStats = () => {
//     const totalOrders = orders.length;
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
//     const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
//     const totalMenuItems = foods.length;
    
//     return { totalOrders, totalRevenue, pendingOrders, totalMenuItems };
//   };

//   const stats = getDashboardStats();

//   if (loading && activeTab === 'dashboard') {
//     return <div className="loading">Loading admin dashboard...</div>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <div className="admin-sidebar">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li className={activeTab === 'dashboard' ? 'active' : ''}>
//             <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
//           </li>
//           <li className={activeTab === 'orders' ? 'active' : ''}>
//             <button onClick={() => setActiveTab('orders')}>Manage Orders</button>
//           </li>
//           <li className={activeTab === 'menu' ? 'active' : ''}>
//             <button onClick={() => setActiveTab('menu')}>Manage Menu</button>
//           </li>
//           <li className={activeTab === 'restaurants' ? 'active' : ''}>
//             <button onClick={() => setActiveTab('restaurants')}>Restaurants</button>
//           </li>
//         </ul>
//       </div>

//       <div className="admin-content">
//         {activeTab === 'dashboard' && (
//           <div className="dashboard">
//             <h1>Admin Dashboard</h1>
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <h3>Total Orders</h3>
//                 <p>{stats.totalOrders}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Total Revenue</h3>
//                 <p>${stats.totalRevenue.toFixed(2)}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Pending Orders</h3>
//                 <p>{stats.pendingOrders}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Menu Items</h3>
//                 <p>{stats.totalMenuItems}</p>
//               </div>
//             </div>

//             <div className="recent-orders">
//               <h2>Recent Orders</h2>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Customer</th>
//                     <th>Total</th>
//                     <th>Status</th>
//                     <th>Date</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.slice(0, 5).map(order => (
//                     <tr key={order._id}>
//                       <td>{order._id.substring(0, 8)}...</td>
//                       <td>{order.user?.name || 'Unknown'}</td>
//                       <td>${order.totalPrice?.toFixed(2)}</td>
//                       <td>
//                         <span className={`status ${order.orderStatus}`}>
//                           {order.orderStatus || 'pending'}
//                         </span>
//                       </td>
//                       <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         <button 
//                           className="btn-small"
//                           onClick={() => setActiveTab('orders')}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === 'orders' && (
//           <div className="orders-management">
//             <h1>Manage Orders</h1>
//             {loading ? (
//               <p>Loading orders...</p>
//             ) : (
//               <table className="orders-table">
//                 <thead>
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Customer</th>
//                     <th>Items</th>
//                     <th>Total</th>
//                     <th>Status</th>
//                     <th>Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <tr key={order._id}>
//                       <td>{order._id.substring(0, 8)}...</td>
//                       <td>{order.user?.name || 'Unknown'}<br/>
//                         <small>{order.user?.email}</small>
//                       </td>
//                       <td>{order.items?.length || 0} items</td>
//                       <td>${order.totalPrice?.toFixed(2)}</td>
//                       <td>
//                         <select 
//                           value={order.orderStatus || 'pending'}
//                           onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                           className="status-select"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="preparing">Preparing</option>
//                           <option value="ready">Ready</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </td>
//                       <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         <button className="btn-small" onClick={()=>viewOrderDetails(order)}>View Details</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {activeTab === 'menu' && (
//           <div className="menu-management">
//             <div className="menu-header">
//               <h1>Manage Menu Items</h1>
//               <button 
//                 className="btn btn-primary"
//                 onClick={() => {
//                   setEditingFood(null);
//                   setFoodForm({
//                     name: '',
//                     description: '',
//                     price: '',
//                     category: 'Main Course',
//                     restaurant: '',
//                     image: ''
//                   });
//                   setShowFoodModal(true);
//                 }}
//               >
//                 + Add New Item
//               </button>
//             </div>

//             {loading ? (
//               <p>Loading menu items...</p>
//             ) : (
//               <table className="menu-table">
//                 <thead>
//                   <tr>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Restaurant</th>
//                     <th>Category</th>
//                     <th>Price</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {foods.map(food => (
//                     <tr key={food._id}>
//                       <td>
//                         <img 
//                           src={food.image || 'https://via.placeholder.com/50'} 
//                           alt={food.name} 
//                           width="50" 
//                           height="50"
//                           style={{ objectFit: 'cover', borderRadius: '4px' }}
//                         />
//                       </td>
//                       <td>{food.name}</td>
//                       <td>{food.restaurant || 'Unknown'}</td>
//                       <td>{food.category || 'Main Course'}</td>
//                       <td>${food.price?.toFixed(2)}</td>
//                       <td>
//                         <span className={`status ${food.isAvailable ? 'available' : 'unavailable'}`}>
//                           {food.isAvailable ? 'Available' : 'Unavailable'}
//                         </span>
//                       </td>
//                       <td>
//                         <button 
//                           className="btn-small"
//                           onClick={() => handleEditFood(food)}
//                         >
//                           Edit
//                         </button>
//                         <button 
//                           className="btn-small btn-danger"
//                           onClick={() => handleDeleteFood(food._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {activeTab === 'restaurants' && (
//           <div className="restaurants-management">
//             <h1>Manage Restaurants</h1>
//             <p>Restaurant management features coming soon...</p>
//           </div>
//         )}
//       </div>

//       {/* Food Modal */}
//       {showFoodModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</h2>
//             <form onSubmit={handleFoodSubmit}>
//               <div className="form-group">
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   value={foodForm.name}
//                   onChange={(e) => setFoodForm({...foodForm, name: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description:</label>
//                 <textarea
//                   value={foodForm.description}
//                   onChange={(e) => setFoodForm({...foodForm, description: e.target.value})}
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Price ($):</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={foodForm.price}
//                   onChange={(e) => setFoodForm({...foodForm, price: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Category:</label>
//                 <select
//                   value={foodForm.category}
//                   onChange={(e) => setFoodForm({...foodForm, category: e.target.value})}
//                 >
//                   <option value="Appetizer">Appetizer</option>
//                   <option value="Main Course">Main Course</option>
//                   <option value="Dessert">Dessert</option>
//                   <option value="Beverage">Beverage</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Restaurant:</label>
//                 <input
//                   type="text"
//                   value={foodForm.restaurant}
//                   onChange={(e) => setFoodForm({...foodForm, restaurant: e.target.value})}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Image URL:</label>
//                 <input
//                   type="url"
//                   value={foodForm.image}
//                   onChange={(e) => setFoodForm({...foodForm, image: e.target.value})}
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//               <div className="modal-actions">
//                 <button type="submit" className="btn btn-primary">
//                   {editingFood ? 'Update' : 'Create'}
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary"
//                   onClick={() => setShowFoodModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;
// pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getFoods, createFood, updateFood, deleteFood } from '../services/api';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [foodForm, setFoodForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    restaurant: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'orders' || activeTab === 'dashboard') {
        const ordersData = await getAllOrders();
        console.log('Fetched orders:', ordersData.data); 
        setOrders(ordersData.data);
      }
      if (activeTab === 'menu' || activeTab === 'dashboard') {
        const foodsData = await getFoods();
        setFoods(foodsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFood) {
        await updateFood(editingFood._id, foodForm);
        alert('Food item updated successfully!');
      } else {
        await createFood(foodForm);
        alert('Food item added successfully!');
      }
      setShowFoodModal(false);
      setEditingFood(null);
      setFoodForm({
        name: '',
        description: '',
        price: '',
        category: 'Main Course',
        restaurant: '',
        image: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving food:', error);
      alert('Failed to save food item');
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      description: food.description || '',
      price: food.price,
      category: food.category || 'Main Course',
      restaurant: food.restaurant || '',
      image: food.image || ''
    });
    setShowFoodModal(true);
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteFood(id);
        alert('Food item deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting food:', error);
        alert('Failed to delete food item');
      }
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log(`Updating order ${orderId} to status: ${newStatus}`);
      
      // Get token
      const token = localStorage.getItem('token');
      
      // Make API call to update status
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      console.log('Update response:', data);
      
      if (response.ok) {
        alert(`Order status updated to ${newStatus} successfully!`);
        
        // Refresh the orders list to show updated status
        fetchData();
      } else {
        alert('Failed to update order: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Check console for details.');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getDashboardStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    const totalMenuItems = foods.length;
    
    return { totalOrders, totalRevenue, pendingOrders, totalMenuItems };
  };

  const stats = getDashboardStats();

  if (loading && activeTab === 'dashboard') {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          </li>
          <li className={activeTab === 'orders' ? 'active' : ''}>
            <button onClick={() => setActiveTab('orders')}>Manage Orders</button>
          </li>
          <li className={activeTab === 'menu' ? 'active' : ''}>
            <button onClick={() => setActiveTab('menu')}>Manage Menu</button>
          </li>
          <li className={activeTab === 'restaurants' ? 'active' : ''}>
            <button onClick={() => setActiveTab('restaurants')}>Restaurants</button>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{stats.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p>${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p>{stats.pendingOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Menu Items</h3>
                <p>{stats.totalMenuItems}</p>
              </div>
            </div>

            <div className="recent-orders">
              <h2>Recent Orders</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.user?.name || 'Unknown'}</td>
                      <td>${order.totalPrice?.toFixed(2)}</td>
                      <td>
                        <span className={`status ${order.orderStatus}`}>
                          {order.orderStatus || 'pending'}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-small"
                          onClick={() => setActiveTab('orders')}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-management">
            <h1>Manage Orders</h1>
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>
                        {order.user?.name || 'Unknown'}<br/>
                        <small>{order.user?.email}</small>
                      </td>
                      <td>{order.items?.length || 0} items</td>
                      <td>${order.totalPrice?.toFixed(2)}</td>
                      <td>
                        <select 
                          value={order.orderStatus || 'pending'}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="status-select"
                          style={{
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            backgroundColor: 
                              order.orderStatus === 'delivered' ? '#d4edda' :
                              order.orderStatus === 'cancelled' ? '#f8d7da' :
                              order.orderStatus === 'pending' ? '#fff3cd' :
                              order.orderStatus === 'confirmed' ? '#cce5ff' :
                              order.orderStatus === 'preparing' ? '#d1ecf1' :
                              order.orderStatus === 'ready' ? '#d4edda' : 'white'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-small"
                          onClick={() => viewOrderDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="menu-management">
            <div className="menu-header">
              <h1>Manage Menu Items</h1>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setEditingFood(null);
                  setFoodForm({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Main Course',
                    restaurant: '',
                    image: ''
                  });
                  setShowFoodModal(true);
                }}
              >
                + Add New Item
              </button>
            </div>

            {loading ? (
              <p>Loading menu items...</p>
            ) : (
              <table className="menu-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Restaurant</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map(food => (
                    <tr key={food._id}>
                      <td>
                        <img 
                          src={food.image || 'https://via.placeholder.com/50'} 
                          alt={food.name} 
                          width="50" 
                          height="50"
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </td>
                      <td>{food.name}</td>
                      <td>{food.restaurant || 'Unknown'}</td>
                      <td>{food.category || 'Main Course'}</td>
                      <td>${food.price?.toFixed(2)}</td>
                      <td>
                        <span className={`status ${food.isAvailable ? 'available' : 'unavailable'}`}>
                          {food.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-small"
                          onClick={() => handleEditFood(food)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleDeleteFood(food._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div className="restaurants-management">
            <h1>Manage Restaurants</h1>
            <p>Restaurant management features coming soon...</p>
          </div>
        )}
      </div>

      {/* Food Modal */}
      {showFoodModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</h2>
            <form onSubmit={handleFoodSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({...foodForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={foodForm.description}
                  onChange={(e) => setFoodForm({...foodForm, description: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Price ($):</label>
                <input
                  type="number"
                  step="0.01"
                  value={foodForm.price}
                  onChange={(e) => setFoodForm({...foodForm, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={foodForm.category}
                  onChange={(e) => setFoodForm({...foodForm, category: e.target.value})}
                >
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div className="form-group">
                <label>Restaurant:</label>
                <input
                  type="text"
                  value={foodForm.restaurant}
                  onChange={(e) => setFoodForm({...foodForm, restaurant: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={foodForm.image}
                  onChange={(e) => setFoodForm({...foodForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingFood ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowFoodModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <h2>Order Details</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Customer:</strong> {selectedOrder.user?.name || 'Unknown'}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> 
                <span className={`status ${selectedOrder.orderStatus}`} style={{ marginLeft: '10px' }}>
                  {selectedOrder.orderStatus || 'pending'}
                </span>
              </p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress || 'Not provided'}</p>
            </div>

            <h3>Items</h3>
            <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Item</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Quantity</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items?.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{item.name}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>${item.price?.toFixed(2)}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{item.quantity || item.qty || 1}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>${((item.price || 0) * (item.quantity || item.qty || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold' }}>Total:</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>${selectedOrder.totalPrice?.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowOrderModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;