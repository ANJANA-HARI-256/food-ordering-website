
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getFoods } from '../services/api';
// import './Menu.css';

// const Menu = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const restaurantName = queryParams.get('restaurant');

//   const [menuItems, setMenuItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
// // In Menu.jsx - Add state for customization
// const [selectedItem, setSelectedItem] = useState(null);
// const [showCustomizationModal, setShowCustomizationModal] = useState(false);
// const [specialInstructions, setSpecialInstructions] = useState('');
// const [selectedCustomizations, setSelectedCustomizations] = useState([]);

// // Customization options (you can fetch these from your database)
// const customizationOptions = [
//   { name: 'Extra Cheese', price: 1.50 },
//   { name: 'Extra Spicy', price: 0 },
//   { name: 'No Onions', price: 0 },
//   { name: 'No Garlic', price: 0 },
//   { name: 'Add Bacon', price: 2.00 },
//   { name: 'Add Avocado', price: 1.50 },
// ];

// const openCustomizationModal = (item) => {
//   setSelectedItem(item);
//   setSpecialInstructions('');
//   setSelectedCustomizations([]);
//   setShowCustomizationModal(true);
// };

// const toggleCustomization = (option) => {
//   setSelectedCustomizations(prev => {
//     const exists = prev.find(c => c.name === option.name);
//     if (exists) {
//       return prev.filter(c => c.name !== option.name);
//     } else {
//       return [...prev, option];
//     }
//   });
// };

// const addToCartWithCustomizations = () => {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
//   // Calculate additional cost from customizations
//   const customizationCost = selectedCustomizations.reduce((sum, c) => sum + (c.price || 0), 0);
  
//   const cartItem = {
//     ...selectedItem,
//     quantity: 1,
//     specialInstructions: specialInstructions,
//     customizations: selectedCustomizations,
//     basePrice: selectedItem.price,
//     customizationCost: customizationCost,
//     price: selectedItem.price + customizationCost // Total price with customizations
//   };
  
//   // Check if same item with same customizations exists
//   const existingItemIndex = cart.findIndex(item => 
//     item._id === selectedItem._id && 
//     JSON.stringify(item.customizations) === JSON.stringify(selectedCustomizations) &&
//     item.specialInstructions === specialInstructions
//   );
  
//   if (existingItemIndex >= 0) {
//     cart[existingItemIndex].quantity += 1;
//     cart[existingItemIndex].price = (cart[existingItemIndex].basePrice + customizationCost) * cart[existingItemIndex].quantity;
//   } else {
//     cart.push(cartItem);
//   }
  
//   localStorage.setItem('cart', JSON.stringify(cart));
//   setShowCustomizationModal(false);
//   alert(`${selectedItem.name} added to cart with customizations!`);
// };
//   useEffect(() => {
//     fetchMenuItems();
//   }, [restaurantName]);

//   useEffect(() => {
//     filterItems();
//   }, [searchTerm, selectedCategory, menuItems]);

//   const fetchMenuItems = async () => {
//     try {
//       const params = restaurantName ? { restaurant: restaurantName } : {};
//       const response = await getFoods(params);
//       setMenuItems(response.data);
      
//       // Extract unique categories
//       const uniqueCategories = ['all', ...new Set(response.data.map(item => item.category))];
//       setCategories(uniqueCategories);
      
//       setFilteredItems(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//       setLoading(false);
//     }
//   };

//   const filterItems = () => {
//     let filtered = menuItems;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(item =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(item => item.category === selectedCategory);
//     }

//     setFilteredItems(filtered);
//   };

//   const addToCart = (item) => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItem = cart.find(cartItem => cartItem._id === item._id);

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({ ...item, quantity: 1 });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert(`${item.name} added to cart!`);
//   };

//   if (loading) {
//     return <div className="loading">Loading menu...</div>;
//   }

//   return (
//     <div className="menu-page">
//       <div className="container">
//         <h1>{restaurantName ? `${restaurantName} Menu` : 'All Menu Items'}</h1>

//         <div className="filters-section">
//           <input
//             type="text"
//             placeholder="Search menu items..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="category-select"
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category === 'all' ? 'All Categories' : category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="menu-grid">
//           {filteredItems.map((item) => (
//             <div key={item._id} className="menu-card">
//               <img src={item.image} alt={item.name} className="menu-image" />
//               <div className="menu-info">
//                 <h3>{item.name}</h3>
//                 <p className="description">{item.description}</p>
//                 <p className="price">${item.price.toFixed(2)}</p>
//                 <p className="category">{item.category}</p>
//                 <button 
//                   onClick={() => addToCart(item)}
//                   className="btn add-to-cart-btn"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredItems.length === 0 && (
//           <div className="no-results">
//             No menu items found matching your criteria
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Menu;
// pages/Menu.jsx
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
  
  // Customization state
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);

  // Customization options (you can fetch these from your database)
  const customizationOptions = [
    { name: 'Extra Cheese', price: 1.50 },
    { name: 'Extra Spicy', price: 0 },
    { name: 'No Onions', price: 0 },
    { name: 'No Garlic', price: 0 },
    { name: 'Add Bacon', price: 2.00 },
    { name: 'Add Avocado', price: 1.50 },
  ];

  const openCustomizationModal = (item) => {
    setSelectedItem(item);
    setSpecialInstructions('');
    setSelectedCustomizations([]);
    setShowCustomizationModal(true);
  };

  const toggleCustomization = (option) => {
    setSelectedCustomizations(prev => {
      const exists = prev.find(c => c.name === option.name);
      if (exists) {
        return prev.filter(c => c.name !== option.name);
      } else {
        return [...prev, option];
      }
    });
  };

  const addToCartWithCustomizations = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate additional cost from customizations
    const customizationCost = selectedCustomizations.reduce((sum, c) => sum + (c.price || 0), 0);
    
    const cartItem = {
      ...selectedItem,
      quantity: 1,
      specialInstructions: specialInstructions,
      customizations: selectedCustomizations,
      basePrice: selectedItem.price,
      customizationCost: customizationCost,
      price: selectedItem.price + customizationCost // Total price with customizations
    };
    
    // Check if same item with same customizations exists
    const existingItemIndex = cart.findIndex(item => 
      item._id === selectedItem._id && 
      JSON.stringify(item.customizations) === JSON.stringify(selectedCustomizations) &&
      item.specialInstructions === specialInstructions
    );
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].price = (cart[existingItemIndex].basePrice + customizationCost) * cart[existingItemIndex].quantity;
    } else {
      cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setShowCustomizationModal(false);
    alert(`${selectedItem.name} added to cart with customizations!`);
  };

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
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>{restaurantName ? `${restaurantName} Menu` : 'All Menu Items'}</h1>
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back to Restaurants
          </button>
        </div>

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
              <img 
                src={item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500'} 
                alt={item.name} 
                className="menu-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500';
                }}
              />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description || 'Delicious food item'}</p>
                <p className="price">${item.price?.toFixed(2)}</p>
                <p className="category">{item.category || 'Main Course'}</p>
                <button 
                  onClick={() => openCustomizationModal(item)}
                  className="btn add-to-cart-btn"
                >
                  Customize & Add to Cart
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

      {/* Customization Modal */}
      {showCustomizationModal && selectedItem && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h2>Customize {selectedItem.name}</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3>Base Price: ${selectedItem.price.toFixed(2)}</h3>
            </div>

            {/* Customization Options */}
            <div className="customization-section">
              <h3>Options</h3>
              {customizationOptions.map((option, index) => (
                <div key={index} className="customization-option">
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedCustomizations.some(c => c.name === option.name)}
                        onChange={() => toggleCustomization(option)}
                        style={{ marginRight: '10px' }}
                      />
                      {option.name}
                    </div>
                    {option.price > 0 && <span>+${option.price.toFixed(2)}</span>}
                  </label>
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            <div className="form-group">
              <label>Special Instructions:</label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Make it extra spicy, no onions, etc."
                rows="3"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            {/* Price Summary */}
            <div className="price-summary" style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h3>Price Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Base Price:</span>
                <span>${selectedItem.price.toFixed(2)}</span>
              </div>
              {selectedCustomizations.map((c, i) => c.price > 0 && (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>{c.name}:</span>
                  <span>+${c.price.toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                <span>Total:</span>
                <span>${(selectedItem.price + selectedCustomizations.reduce((sum, c) => sum + (c.price || 0), 0)).toFixed(2)}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={addToCartWithCustomizations}
              >
                Add to Cart
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCustomizationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;