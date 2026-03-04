
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