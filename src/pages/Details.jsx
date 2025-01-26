import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBed, FaRegHeart, FaHeart } from "react-icons/fa";

function Property({ property, toggleFavorite, favorites, onDragStart }) {
  return (
    <div
      className="property"
      draggable
      onDragStart={(e) => onDragStart(e, property)} // Allows dragging of a property to add to favorites
    >
      <div className="property-image-wrapper">
        <img
          src={property.image}
          alt={property.description}
          className="property-image"
        />
        <div
          className="heart-icon-wrapper"
          onClick={() => toggleFavorite(property)}
        >
          {favorites.some((fav) => fav.id === property.id) ? ( // Check if property is already in favorites
            <FaHeart className="heart-icon" style={{ color: "red" }} /> // Filled heart icon if favorite
          ) : (
            <FaRegHeart className="heart-icon" /> // Empty heart icon if not favorite
          )}
        </div>
      </div>
      <div className="property-header">
        <h5 className="property-title">{property.title}</h5>
      </div>
      <p>{property.description}</p>
      <div className="property-details">
        <span>
          <FaBed style={{ color: "#555", marginRight: "8px", width: "20px" }} />{" "}
          {property.bedrooms} beds
        </span>
        <span>{property.postcodeArea}</span>
      </div>
      <div className="property-price">
        £{property.price.toLocaleString()}
        <Link to={`/property/${property.id}`} className="view-more-link">
          View More →
        </Link>
      </div>
    </div>
  );
}

function Details({ favorites, setFavorites }) {
  const location = useLocation();
  const { filteredProperties = [] } = location.state || {}; // Safely retrieve filtered properties from navigation state

  // Toggles a property between favorite and non-favorite
  const toggleFavorite = (property) => {
    if (favorites.some((fav) => fav.id === property.id)) {
      alert("This property is already in your favorites!"); // Prevent duplicate additions
    } else {
      const updatedFavorites = [...favorites, property]; // Add property to favorites
      setFavorites(updatedFavorites); // Update state with new favorites list
    }
  };

  // Handles drag start event to transfer property data
  const onDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property)); // Store property data in drag event
  };

  // Handles drop event to add property to favorites via drag-and-drop
  const handleDrop = (e) => {
    const property = JSON.parse(e.dataTransfer.getData("property")); // Retrieve dragged property data
    if (!favorites.some((fav) => fav.id === property.id)) {
      toggleFavorite(property); // Add to favorites if not already present
    } else {
      alert("This property is already in your favorites!"); // Prevent duplicate additions
    }
    e.preventDefault(); // Prevent default browser handling of drop
  };

  // Allows dropping of elements over a target area
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop event
  };

  return (
    <main className="main-content">
      <div
        className="properties-section"
        onDragOver={handleDragOver} // Allow drag-over behavior
        onDrop={handleDrop} // Handle property drop to add to favorites
      >
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Property
              key={`/property/${property.id}`} // Unique key for each property component
              property={property}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              onDragStart={onDragStart}
            />
          ))
        ) : (
          <p>No properties found. Please adjust your search criteria.</p> // Message when no properties match search
        )}
      </div>
    </main>
  );
}

export default Details;
