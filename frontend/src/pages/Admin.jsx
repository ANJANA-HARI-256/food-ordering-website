
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllOrders, getFoods, createFood, updateFood, deleteFood,
  getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant,
  getUsers, getAllCoupons, createCoupon, updateCoupon, deleteCoupon
} from '../services/api';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Food modal state
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    restaurant: '',
    image: ''
  });

  // Restaurant modal state
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    phone: '',
    email: '',
    cuisine: [],
    openingTime: '09:00',
    closingTime: '22:00',
    image: '',
    isActive: true
  });
  const [cuisineInput, setCuisineInput] = useState('');

  // Coupon modal state
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponForm, setCouponForm] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: 0,
    maxDiscountAmount: '',
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: '',
    usageLimit: '',
    perUserLimit: 1,
    isActive: true
  });

  // Order modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
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
        setOrders(ordersData.data);
      }
      if (activeTab === 'menu' || activeTab === 'dashboard') {
        const foodsData = await getFoods();
        setFoods(foodsData.data);
      }
      if (activeTab === 'restaurants' || activeTab === 'dashboard') {
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData.data);
      }
      if (activeTab === 'customers') {
        await fetchUsers();
      }
      if (activeTab === 'coupons' || activeTab === 'dashboard') {
        await fetchCoupons();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await getAllCoupons();
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  // Food Handlers
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

  // Restaurant Handlers
  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRestaurant) {
        await updateRestaurant(editingRestaurant._id, restaurantForm);
        alert('Restaurant updated successfully!');
      } else {
        await createRestaurant(restaurantForm);
        alert('Restaurant added successfully!');
      }
      setShowRestaurantModal(false);
      setEditingRestaurant(null);
      setRestaurantForm({
        name: '',
        description: '',
        address: { street: '', city: '', state: '', zipCode: '' },
        phone: '',
        email: '',
        cuisine: [],
        openingTime: '09:00',
        closingTime: '22:00',
        image: '',
        isActive: true
      });
      setCuisineInput('');
      fetchData();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Failed to save restaurant');
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setRestaurantForm({
      name: restaurant.name,
      description: restaurant.description || '',
      address: restaurant.address || { street: '', city: '', state: '', zipCode: '' },
      phone: restaurant.phone || '',
      email: restaurant.email || '',
      cuisine: restaurant.cuisine || [],
      openingTime: restaurant.openingTime || '09:00',
      closingTime: restaurant.closingTime || '22:00',
      image: restaurant.image || '',
      isActive: restaurant.isActive !== undefined ? restaurant.isActive : true
    });
    setShowRestaurantModal(true);
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await deleteRestaurant(id);
        alert('Restaurant deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        alert('Failed to delete restaurant');
      }
    }
  };

  const addCuisine = () => {
    if (cuisineInput.trim() && !restaurantForm.cuisine.includes(cuisineInput.trim())) {
      setRestaurantForm({
        ...restaurantForm,
        cuisine: [...restaurantForm.cuisine, cuisineInput.trim()]
      });
      setCuisineInput('');
    }
  };

  const removeCuisine = (cuisineToRemove) => {
    setRestaurantForm({
      ...restaurantForm,
      cuisine: restaurantForm.cuisine.filter(c => c !== cuisineToRemove)
    });
  };

  // Coupon Handlers
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const couponData = {
        ...couponForm,
        discountValue: parseFloat(couponForm.discountValue),
        minOrderAmount: parseFloat(couponForm.minOrderAmount) || 0,
        maxDiscountAmount: couponForm.maxDiscountAmount ? parseFloat(couponForm.maxDiscountAmount) : null,
        usageLimit: couponForm.usageLimit ? parseInt(couponForm.usageLimit) : null,
        perUserLimit: parseInt(couponForm.perUserLimit) || 1,
        validFrom: new Date(couponForm.validFrom),
        validUntil: new Date(couponForm.validUntil)
      };

      if (editingCoupon) {
        await updateCoupon(editingCoupon._id, couponData);
        alert('Coupon updated successfully!');
      } else {
        await createCoupon(couponData);
        alert('Coupon created successfully!');
      }
      
      setShowCouponModal(false);
      setEditingCoupon(null);
      setCouponForm({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderAmount: 0,
        maxDiscountAmount: '',
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: '',
        usageLimit: '',
        perUserLimit: 1,
        isActive: true
      });
      fetchData();
    } catch (error) {
      console.error('Error saving coupon:', error);
      alert('Failed to save coupon');
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      description: coupon.description || '',
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount || 0,
      maxDiscountAmount: coupon.maxDiscountAmount || '',
      validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0],
      usageLimit: coupon.usageLimit || '',
      perUserLimit: coupon.perUserLimit || 1,
      isActive: coupon.isActive
    });
    setShowCouponModal(true);
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id);
        alert('Coupon deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting coupon:', error);
        alert('Failed to delete coupon');
      }
    }
  };

  // Order Handlers
  // const updateOrderStatus = async (orderId, newStatus) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ status: newStatus })
  //     });
      
  //     if (response.ok) {
  //       alert(`Order status updated to ${newStatus} successfully!`);
  //       fetchData();
  //     } else {
  //       const data = await response.json();
  //       alert('Failed to update order: ' + (data.message || 'Unknown error'));
  //     }
  //   } catch (error) {
  //     console.error('Error updating order:', error);
  //     alert('Error updating order. Check console for details.');
  //   }
  // };
  // Order Handlers
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // Use the imported API function instead of hardcoded fetch
    await updateOrderStatus(orderId, newStatus);
    alert(`Order status updated to ${newStatus} successfully!`);
    fetchData();
  } catch (error) {
    console.error('Error updating order:', error);
    alert('Failed to update order status. Please try again.');
  }
};
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // Stats
  const getDashboardStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    const totalMenuItems = foods.length;
    const totalRestaurants = restaurants.length;
    const totalCustomers = users.length;
    const totalCoupons = coupons.length;
    
    return { totalOrders, totalRevenue, pendingOrders, totalMenuItems, totalRestaurants, totalCustomers, totalCoupons };
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
          <li className={activeTab === 'customers' ? 'active' : ''}>
            <button onClick={() => setActiveTab('customers')}>Customers</button>
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
          <li className={activeTab === 'coupons' ? 'active' : ''}>
            <button onClick={() => setActiveTab('coupons')}>Coupons</button>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {/* Dashboard Tab */}
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
              <div className="stat-card">
                <h3>Restaurants</h3>
                <p>{stats.totalRestaurants}</p>
              </div>
              <div className="stat-card">
                <h3>Customers</h3>
                <p>{stats.totalCustomers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Coupons</h3>
                <p>{stats.totalCoupons}</p>
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
                  {orders.map(order => (
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

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="customers-management">
            <h1>Registered Customers</h1>
            {loading ? (
              <p>Loading customers...</p>
            ) : (
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Joined Date</th>
                    <th>Orders Count</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || '—'}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        {orders.filter(order => order.user?._id === user._id).length}
                      </td>
                      <td>
                        <span className={`status ${user.role === 'admin' ? 'confirmed' : 'pending'}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Orders Tab */}
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

        {/* Menu Tab */}
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

        {/* Restaurants Tab */}
        {activeTab === 'restaurants' && (
          <div className="restaurants-management">
            <div className="menu-header">
              <h1>Manage Restaurants</h1>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setEditingRestaurant(null);
                  setRestaurantForm({
                    name: '',
                    description: '',
                    address: { street: '', city: '', state: '', zipCode: '' },
                    phone: '',
                    email: '',
                    cuisine: [],
                    openingTime: '09:00',
                    closingTime: '22:00',
                    image: '',
                    isActive: true
                  });
                  setShowRestaurantModal(true);
                }}
              >
                + Add New Restaurant
              </button>
            </div>

            {loading ? (
              <p>Loading restaurants...</p>
            ) : (
              <table className="restaurants-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Cuisine</th>
                    <th>Hours</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map(restaurant => (
                    <tr key={restaurant._id}>
                      <td>
                        <img 
                          src={restaurant.image || 'https://via.placeholder.com/50'} 
                          alt={restaurant.name} 
                          width="50" 
                          height="50"
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </td>
                      <td>{restaurant.name}</td>
                      <td>
                        {restaurant.address?.street}<br/>
                        <small>{restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.zipCode}</small>
                      </td>
                      <td>{restaurant.phone}</td>
                      <td>{restaurant.cuisine?.join(', ')}</td>
                      <td>{restaurant.openingTime} - {restaurant.closingTime}</td>
                      <td>
                        <span className={`status ${restaurant.isActive ? 'available' : 'unavailable'}`}>
                          {restaurant.isActive ? 'Open' : 'Closed'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-small"
                          onClick={() => handleEditRestaurant(restaurant)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleDeleteRestaurant(restaurant._id)}
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

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="coupons-management">
            <div className="menu-header">
              <h1>Manage Coupons</h1>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setEditingCoupon(null);
                  setCouponForm({
                    code: '',
                    description: '',
                    discountType: 'percentage',
                    discountValue: '',
                    minOrderAmount: 0,
                    maxDiscountAmount: '',
                    validFrom: new Date().toISOString().split('T')[0],
                    validUntil: '',
                    usageLimit: '',
                    perUserLimit: 1,
                    isActive: true
                  });
                  setShowCouponModal(true);
                }}
              >
                + Add New Coupon
              </button>
            </div>

            {loading ? (
              <p>Loading coupons...</p>
            ) : (
              <table className="coupons-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Discount</th>
                    <th>Min Order</th>
                    <th>Valid Until</th>
                    <th>Usage</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coupon => (
                    <tr key={coupon._id}>
                      <td><strong>{coupon.code}</strong></td>
                      <td>{coupon.description}</td>
                      <td>
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% ${coupon.maxDiscountAmount ? `(max $${coupon.maxDiscountAmount})` : ''}`
                          : `$${coupon.discountValue} off`
                        }
                      </td>
                      <td>${coupon.minOrderAmount || 0}</td>
                      <td>{new Date(coupon.validUntil).toLocaleDateString()}</td>
                      <td>{coupon.usedCount || 0} / {coupon.usageLimit || '∞'}</td>
                      <td>
                        <span className={`status ${coupon.isActive ? 'available' : 'unavailable'}`}>
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-small"
                          onClick={() => handleEditCoupon(coupon)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleDeleteCoupon(coupon._id)}
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

      {/* Restaurant Modal */}
      {showRestaurantModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <h2>{editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
            <form onSubmit={handleRestaurantSubmit}>
              <div className="form-group">
                <label>Restaurant Name:</label>
                <input
                  type="text"
                  value={restaurantForm.name}
                  onChange={(e) => setRestaurantForm({...restaurantForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={restaurantForm.description}
                  onChange={(e) => setRestaurantForm({...restaurantForm, description: e.target.value})}
                  rows="3"
                />
              </div>

              <h3>Address</h3>
              <div className="form-group">
                <label>Street:</label>
                <input
                  type="text"
                  value={restaurantForm.address.street}
                  onChange={(e) => setRestaurantForm({
                    ...restaurantForm, 
                    address: {...restaurantForm.address, street: e.target.value}
                  })}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    value={restaurantForm.address.city}
                    onChange={(e) => setRestaurantForm({
                      ...restaurantForm, 
                      address: {...restaurantForm.address, city: e.target.value}
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>State:</label>
                  <input
                    type="text"
                    value={restaurantForm.address.state}
                    onChange={(e) => setRestaurantForm({
                      ...restaurantForm, 
                      address: {...restaurantForm.address, state: e.target.value}
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code:</label>
                  <input
                    type="text"
                    value={restaurantForm.address.zipCode}
                    onChange={(e) => setRestaurantForm({
                      ...restaurantForm, 
                      address: {...restaurantForm.address, zipCode: e.target.value}
                    })}
                  />
                </div>
              </div>

              <h3>Contact Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="text"
                    value={restaurantForm.phone}
                    onChange={(e) => setRestaurantForm({...restaurantForm, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={restaurantForm.email}
                    onChange={(e) => setRestaurantForm({...restaurantForm, email: e.target.value})}
                  />
                </div>
              </div>

              <h3>Cuisine Types</h3>
              <div className="form-group">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={cuisineInput}
                    onChange={(e) => setCuisineInput(e.target.value)}
                    placeholder="Enter cuisine (e.g., Italian, Chinese)"
                    style={{ flex: 1 }}
                  />
                  <button type="button" onClick={addCuisine} className="btn-small">Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {restaurantForm.cuisine.map((cuisine, index) => (
                    <span key={index} style={{
                      backgroundColor: '#e1e1e1',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      {cuisine}
                      <button 
                        type="button" 
                        onClick={() => removeCuisine(cuisine)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <h3>Operating Hours</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Opening Time:</label>
                  <input
                    type="time"
                    value={restaurantForm.openingTime}
                    onChange={(e) => setRestaurantForm({...restaurantForm, openingTime: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Closing Time:</label>
                  <input
                    type="time"
                    value={restaurantForm.closingTime}
                    onChange={(e) => setRestaurantForm({...restaurantForm, closingTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={restaurantForm.image}
                  onChange={(e) => setRestaurantForm({...restaurantForm, image: e.target.value})}
                  placeholder="https://example.com/restaurant-image.jpg"
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={restaurantForm.isActive}
                    onChange={(e) => setRestaurantForm({...restaurantForm, isActive: e.target.checked})}
                  />
                  Restaurant is Active (Open for business)
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingRestaurant ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowRestaurantModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <h2>{editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}</h2>
            <form onSubmit={handleCouponSubmit}>
              <div className="form-group">
                <label>Coupon Code:</label>
                <input
                  type="text"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})}
                  required
                  placeholder="e.g., SAVE10"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({...couponForm, description: e.target.value})}
                  required
                  placeholder="e.g., 10% off on your order"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Discount Type:</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({...couponForm, discountType: e.target.value})}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Discount Value:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={couponForm.discountValue}
                    onChange={(e) => setCouponForm({...couponForm, discountValue: e.target.value})}
                    required
                    placeholder={couponForm.discountType === 'percentage' ? '10' : '5'}
                  />
                </div>
              </div>

              {couponForm.discountType === 'percentage' && (
                <div className="form-group">
                  <label>Max Discount Amount ($) - Optional:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={couponForm.maxDiscountAmount}
                    onChange={(e) => setCouponForm({...couponForm, maxDiscountAmount: e.target.value})}
                    placeholder="e.g., 20"
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Min Order Amount ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={couponForm.minOrderAmount}
                    onChange={(e) => setCouponForm({...couponForm, minOrderAmount: e.target.value})}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Per User Limit:</label>
                  <input
                    type="number"
                    value={couponForm.perUserLimit}
                    onChange={(e) => setCouponForm({...couponForm, perUserLimit: e.target.value})}
                    placeholder="1"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Valid From:</label>
                  <input
                    type="date"
                    value={couponForm.validFrom}
                    onChange={(e) => setCouponForm({...couponForm, validFrom: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Valid Until:</label>
                  <input
                    type="date"
                    value={couponForm.validUntil}
                    onChange={(e) => setCouponForm({...couponForm, validUntil: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Usage Limit (leave empty for unlimited):</label>
                  <input
                    type="number"
                    value={couponForm.usageLimit}
                    onChange={(e) => setCouponForm({...couponForm, usageLimit: e.target.value})}
                    placeholder="Unlimited"
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '25px' }}>
                    <input
                      type="checkbox"
                      checked={couponForm.isActive}
                      onChange={(e) => setCouponForm({...couponForm, isActive: e.target.checked})}
                    />
                    Coupon is Active
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingCoupon ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCouponModal(false)}
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