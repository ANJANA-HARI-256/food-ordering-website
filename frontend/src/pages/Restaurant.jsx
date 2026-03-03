// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // function Restaurants() {
// //   const [restaurants, setRestaurants] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const navigate = useNavigate();

// //   // Simulated data - in a real app, fetch from /api/restaurants
// //   useEffect(() => {
// //     setRestaurants([
// //       { _id: "1", name: "Pizza Hut", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", rating: 4.5 },
// //       { _id: "2", name: "Burger King", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", rating: 4.2 },
// //     ]);
// //   }, []);

// //   const filteredRes = restaurants.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <div style={styles.header}>
// //         <h2>Select a Restaurant</h2>
// //         <input 
// //           placeholder="Search restaurants..." 
// //           style={styles.search} 
// //           onChange={(e) => setSearch(e.target.value)} 
// //         />
// //       </div>
// //       <div style={styles.list}>
// //         {filteredRes.map(res => (
// //           <div key={res._id} style={styles.resCard} onClick={() => navigate(`/menu/${res._id}`)}>
// //             <img src={res.image} alt={res.name} style={styles.resImg} />
// //             <h3>{res.name}</h3>
// //             <p>⭐ {res.rating}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   header: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
// //   search: { padding: "10px", borderRadius: "20px", border: "1px solid #ccc", width: "300px" },
// //   list: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" },
// //   resCard: { border: "1px solid #ddd", borderRadius: "10px", padding: "15px", cursor: "pointer", textAlign: "center" },
// //   resImg: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }
// // };

// // export default Restaurants;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { getRestaurants } from "../services/api"; // Uncomment when your API is ready

// function Restaurants() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Replace this with an actual API call later
//     setRestaurants([
//       { _id: "1", name: "Pizza Hut", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", rating: 4.5, cuisine: "Italian" },
//       { _id: "2", name: "Burger King", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", rating: 4.2, cuisine: "American" },
//       { _id: "3", name: "The Pasta House", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400", rating: 4.8, cuisine: "Continental" },
//     ]);
//   }, []);

//   const filteredRes = restaurants.filter(r => 
//     r.name.toLowerCase().includes(search.toLowerCase()) ||
//     r.cuisine.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>Explore Restaurants</h2>
//           <p style={styles.subtitle}>Discover the best food & drinks in your area</p>
//         </div>
        
//         {/* Secondary Search (Restaurant Level) */}
//         <input 
//           placeholder="Search by name or cuisine..." 
//           style={styles.search} 
//           onChange={(e) => setSearch(e.target.value)} 
//         />
//       </div>

//       <div style={styles.list}>
//         {filteredRes.map(res => (
//           <div key={res._id} style={styles.resCard} onClick={() => navigate(`/menu/${res._id}`)}>
//             <img src={res.image} alt={res.name} style={styles.resImg} />
//             <div style={styles.info}>
//               <h3 style={styles.resName}>{res.name}</h3>
//               <p style={styles.cuisine}>{res.cuisine}</p>
//               <span style={styles.ratingBadge}>⭐ {res.rating}</span>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {filteredRes.length === 0 && <p style={styles.noResult}>No restaurants found matching your search.</p>}
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "30px", maxWidth: "1000px", margin: "0 auto" },
//   header: { 
//     display: "flex", 
//     justifyContent: "space-between", 
//     alignItems: "center", 
//     marginBottom: "30px",
//     flexWrap: "wrap",
//     gap: "20px"
//   },
//   title: { margin: 0, fontSize: "28px" },
//   subtitle: { color: "#666", margin: "5px 0 0 0" },
//   search: { 
//     padding: "12px 20px", 
//     borderRadius: "25px", 
//     border: "1px solid #ddd", 
//     width: "350px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     outline: "none"
//   },
//   list: { display: "flex", flexDirection: "column", gap: "20px" },
//   resCard: { 
//     display: "flex",
//     backgroundColor: "white",
//     border: "1px solid #eee", 
//     borderRadius: "15px", 
//     padding: "15px", 
//     cursor: "pointer",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//     transition: "transform 0.2s ease",
//     alignItems: "center"
//   },
//   resImg: { width: "180px", height: "120px", objectFit: "cover", borderRadius: "10px" },
//   info: { marginLeft: "25px", flex: 1 },
//   resName: { margin: "0 0 5px 0", fontSize: "20px" },
//   cuisine: { color: "#777", marginBottom: "10px" },
//   ratingBadge: { 
//     backgroundColor: "#f1f2f6", 
//     padding: "4px 10px", 
//     borderRadius: "5px", 
//     fontWeight: "bold",
//     fontSize: "14px"
//   },
//   noResult: { textAlign: "center", color: "#999", marginTop: "50px" }
// };

// export default Restaurants;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFoods } from '../services/api';
import './Restaurant.css';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchTerm, restaurants]);

  const fetchRestaurants = async () => {
    try {
      const foods = await getFoods();
      // Extract unique restaurants from foods
      const uniqueRestaurants = [...new Map(foods.data.map(item => 
        [item.restaurant, { 
          name: item.restaurant, 
          id: item.restaurantId,
          cuisine: item.category,
          image: item.image 
        }]
      )).values()];
      setRestaurants(uniqueRestaurants);
      setFilteredRestaurants(uniqueRestaurants);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="restaurant-page">
      <div className="container">
        <h1>Restaurants</h1>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id || restaurant.name} className="restaurant-card">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisine}</p>
                <Link to={`/menu?restaurant=${restaurant.name}`} className="btn">
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="no-results">
            No restaurants found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;