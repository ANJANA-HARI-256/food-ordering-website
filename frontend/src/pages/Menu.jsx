// // // // // // 
// // // // // import { useEffect, useState } from "react";
// // // // // import { getFoods } from "../services/api";

// // // // // function Menu() {
// // // // //   const [foods, setFoods] = useState([]);

// // // // //   useEffect(() => {
// // // // //     getFoods().then(data => setFoods(data));
// // // // //   }, []);

// // // // //   const addToCart = (food) => {
// // // // //     let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // // // //     const existing = cart.find(item => item._id === food._id);

// // // // //     if (existing) {
// // // // //       existing.qty += 1;
// // // // //     } else {
// // // // //       cart.push({ ...food, qty: 1 });
// // // // //     }

// // // // //     localStorage.setItem("cart", JSON.stringify(cart));
// // // // //     alert("Added to cart");
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ padding: "20px" }}>
// // // // //       <h2>Menu</h2>

// // // // //       {foods.map(food => (
// // // // //         <div key={food._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
// // // // //           <h3>{food.name}</h3>
// // // // //           <p>Price: ₹{food.price}</p>
// // // // //           <button onClick={() => addToCart(food)}>Add to Cart</button>
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Menu;
// // // // import { useEffect, useState } from "react";
// // // // import { getFoods } from "../services/api";

// // // // function Menu() {
// // // //   const [foods, setFoods] = useState([]);

// // // //   useEffect(() => {
// // // //     getFoods().then(res => setFoods(res.data));
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <h2>Menu</h2>
// // // //       {foods.map(food => (
// // // //         <div key={food._id}>
// // // //           <h3>{food.name}</h3>
// // // //           <p>₹{food.price}</p>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Menu;
// // // import { useEffect, useState } from "react";
// // // import { getFoods } from "../services/api";

// // // function Menu() {
// // //   const [foods, setFoods] = useState([]);

// // //   useEffect(() => {
// // //     getFoods().then(res => setFoods(res.data));
// // //   }, []);

// // //   // ✅ Add to Cart
// // //   const addToCart = (food) => {
// // //     let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // //     const existingItem = cart.find(item => item._id === food._id);

// // //     if (existingItem) {
// // //       existingItem.qty += 1;
// // //     } else {
// // //       cart.push({ ...food, qty: 1 });
// // //     }

// // //     localStorage.setItem("cart", JSON.stringify(cart));
// // //     alert("Item added to cart");
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>Menu</h2>

// // //       {foods.length === 0 && <p>No items available</p>}

// // //       {foods.map(food => (
// // //         <div
// // //           key={food._id}
// // //           style={{
// // //             border: "1px solid #ccc",
// // //             margin: "10px",
// // //             padding: "10px"
// // //           }}
// // //         >
// // //           <h3>{food.name}</h3>
// // //           <p>Price: ₹{food.price}</p>
// // //           <button onClick={() => addToCart(food)}>
// // //             Add to Cart
// // //           </button>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default Menu;
// // import { useEffect, useState } from "react";
// // import { getFoods } from "../services/api";

// // function Menu() {
// //   const [foods, setFoods] = useState([]);

// //   useEffect(() => {
// //     getFoods().then(res => setFoods(res.data));
// //   }, []);

// //   const addToCart = (food) => {
// //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     const existingItem = cart.find(item => item._id === food._id);

// //     if (existingItem) {
// //       existingItem.qty += 1;
// //     } else {
// //       cart.push({ ...food, qty: 1 });
// //     }

// //     localStorage.setItem("cart", JSON.stringify(cart));
// //     alert("Item added to cart");
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.title}>Menu</h2>

// //       {foods.length === 0 && <p>No items available</p>}

// //       <div style={styles.grid}>
// //         {foods.map(food => (
// //           <div key={food._id} style={styles.card}>
// //             {/* ✅ Added Image Support */}
// //             {/* <img 
// //               src={food.image || "https://via.placeholder.com/150?text=Food"} 
// //               alt={food.name} 
// //               style={styles.image} 
// //             />
// //              */}
// //              <img 
// //   src={food.image} 
// //   alt={food.name} 
// //   style={styles.image} 
// //   onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Food+Image"; }}
// // />
// //             <div style={styles.content}>
// //               <h3 style={styles.foodName}>{food.name}</h3>
// //               <p style={styles.price}>Price: ₹{food.price}</p>
// //               <button onClick={() => addToCart(food)} style={styles.button}>
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ✅ Enhanced styles to make the images look professional
// // const styles = {
// //   container: { padding: "20px" },
// //   title: { marginBottom: "20px" },
// //   grid: { display: "flex", flexDirection: "column", gap: "15px" },
// //   card: {
// //     display: "flex",
// //     alignItems: "center",
// //     border: "1px solid #ddd",
// //     borderRadius: "8px",
// //     padding: "15px",
// //     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// //     backgroundColor: "#fff"
// //   },
// //   image: {
// //     width: "120px",
// //     height: "100px",
// //     objectFit: "cover",
// //     borderRadius: "6px",
// //     marginRight: "20px"
// //   },
// //   content: { flex: 1 },
// //   foodName: { margin: "0 0 5px 0", textTransform: "capitalize" },
// //   price: { margin: "0 0 10px 0", fontWeight: "bold", color: "#333" },
// //   button: {
// //     padding: "8px 15px",
// //     backgroundColor: "#fff",
// //     border: "1px solid #333",
// //     cursor: "pointer",
// //     borderRadius: "4px",
// //     transition: "0.2s"
// //   }
// // };

// // export default Menu;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // ✅ To get Restaurant ID
// import { getFoods } from "../services/api";

// function Menu() {
//   const { id } = useParams(); // ✅ Extracts the restaurant ID from the URL
//   const [foods, setFoods] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     getFoods().then(res => {
//       // ✅ If your API returns all foods, we filter by restaurantId here.
//       // If your API has an endpoint like getFoodsByRestaurant(id), use that instead.
//       const restaurantFoods = res.data.filter(food => food.restaurantId === id);
//       setFoods(restaurantFoods);
//     });
//   }, [id]);

//   // ✅ Search logic for food within this specific restaurant
//   const filteredFoods = foods.filter(food =>
//     food.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const addToCart = (food) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingItem = cart.find(item => item._id === food._id);
//     if (existingItem) {
//       existingItem.qty += 1;
//     } else {
//       cart.push({ ...food, qty: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Item added to cart");
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div>
//           <h2>Menu</h2>
//           <p style={styles.subText}>Browsing items from this restaurant</p>
//         </div>
        
//         {/* ✅ Search within Menu */}
//         <input
//           type="text"
//           placeholder="Search for dishes..."
//           style={styles.searchInput}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {filteredFoods.length === 0 && (
//         <p style={styles.emptyMsg}>No items match your search in this menu.</p>
//       )}

//       <div style={styles.grid}>
//         {filteredFoods.map(food => (
//           <div key={food._id} style={styles.card}>
//             <img 
//               src={food.image || "https://via.placeholder.com/150?text=Food"} 
//               alt={food.name} 
//               style={styles.image} 
//               onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Food"; }}
//             />
//             <div style={styles.content}>
//               <h3 style={styles.foodName}>{food.name}</h3>
//               <p style={styles.price}>₹{food.price}</p>
//               <button onClick={() => addToCart(food)} style={styles.button}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "20px", maxWidth: "800px", margin: "0 auto" },
//   header: { 
//     display: "flex", 
//     justifyContent: "space-between", 
//     alignItems: "center", 
//     marginBottom: "30px",
//     borderBottom: "1px solid #eee",
//     paddingBottom: "15px"
//   },
//   subText: { color: "#666", fontSize: "14px", margin: 0 },
//   searchInput: {
//     padding: "10px 15px",
//     width: "200px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     outline: "none"
//   },
//   emptyMsg: { textAlign: "center", color: "#888", marginTop: "40px" },
//   grid: { display: "flex", flexDirection: "column", gap: "15px" },
//   card: {
//     display: "flex",
//     alignItems: "center",
//     border: "1px solid #eee",
//     borderRadius: "12px",
//     padding: "15px",
//     backgroundColor: "#fff",
//     transition: "transform 0.2s",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
//   },
//   image: {
//     width: "100px",
//     height: "100px",
//     objectFit: "cover",
//     borderRadius: "8px",
//     marginRight: "20px"
//   },
//   content: { flex: 1 },
//   foodName: { margin: "0 0 5px 0", fontSize: "18px" },
//   price: { margin: "0 0 10px 0", fontWeight: "bold", color: "#e74c3c" },
//   button: {
//     padding: "8px 20px",
//     backgroundColor: "#2ecc71",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "6px",
//     fontWeight: "bold"
//   }
// };

// export default Menu;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFoods } from '../services/api';
import './Menu.css';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const restaurantName = queryParams.get('restaurant');

  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantName]);

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, menuItems]);

  const fetchMenuItems = async () => {
    try {
      const params = restaurantName ? { restaurant: restaurantName } : {};
      const response = await getFoods(params);
      setMenuItems(response.data);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(response.data.map(item => item.category))];
      setCategories(uniqueCategories);
      
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = menuItems;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-page">
      <div className="container">
        <h1>{restaurantName ? `${restaurantName} Menu` : 'All Menu Items'}</h1>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item._id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-image" />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
                <p className="category">{item.category}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="btn add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            No menu items found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;