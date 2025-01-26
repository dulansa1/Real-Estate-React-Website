import React from "react";
import { FaBed, FaTimes, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function FavouriteSideBar({ isOpen, onClose, favorites, setFavorites }) {
  // Removes a property from the favorites list
  const removeFromFavorites = (property) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== property.id)); // Filters out the property from favorites
  };

  // Clears all properties from the favorites list
  const clearFavorites = () => {
    setFavorites([]); // Resets favorites to an empty array
  };

  // Handles the drop action when a property is dragged and dropped into the sidebar
  const onDrop = (e) => {
    const property = JSON.parse(e.dataTransfer.getData("property")); // Retrieves the dragged property data
    if (favorites.some((fav) => fav.id === property.id)) {
      // Checks if the property is already in favorites
      alert("This property is already in your favorites!"); // Alerts if already a favorite
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, property]); // Adds the property to favorites if not already present
    }
    e.preventDefault(); // Prevents the default behavior of the drop action
  };

  // Enables the drop event by preventing the default behavior
  const onDragOver = (e) => {
    e.preventDefault(); // Prevents default behavior to allow the drop
  };

  return (
    <div>
      <div className={`wishlist-sidebar ${isOpen ? "open" : ""}`}>
        {" "}
        {/* Sidebar visibility control */}
        <div className="sidebar-header">
          <h3>My Favorites ({favorites.length})</h3>
          <button className="close-btn" onClick={onClose}>
            {" "}
            {/* Close button to hide the sidebar */}
            <FaTimes />
          </button>
        </div>
        {favorites.length > 0 && ( // Displays 'Remove All' button if there are any favorites
          <div className="clear-wishlist">
            <button className="clear-btn" onClick={clearFavorites}>
              Remove All
            </button>
          </div>
        )}
        <div
          className="wishlist-content"
          onDrop={onDrop} // Handles the drop event on the wishlist content area
          onDragOver={onDragOver} // Allows the drop event by preventing default
        >
          {favorites.length > 0 ? ( // Displays the list of favorite properties if available
            favorites.map((property) => (
              <div key={`/property/${property.id}`} className="property">
                <div className="property-image-wrapper">
                  <img
                    src={property.image}
                    alt={property.description}
                    className="property-image1"
                  />
                  <div
                    className="heart-icon-wrapper"
                    onClick={() => removeFromFavorites(property)} // Allows removing property from favorites when clicked
                  >
                    <FaHeart className="heart-icon" style={{ color: "red" }} />
                  </div>
                </div>
                <div className="property-header">
                  <h5 className="property-title">{property.title}</h5>
                </div>
                <p>{property.description}</p>
                <div className="property-details">
                  <span>
                    <FaBed
                      style={{
                        color: "#555",
                        marginRight: "8px",
                        width: "20px",
                      }}
                    />{" "}
                    {property.bedrooms} beds
                  </span>
                  <span>{property.postcodeArea}</span>
                </div>
                <div className="property-price">
                  £{property.price.toLocaleString()}
                  <Link
                    to={`/property/${property.id}`}
                    className="view-more-link"
                  >
                    View More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Your favorites is empty.</p> // Message when no favorites exist
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouriteSideBar;
