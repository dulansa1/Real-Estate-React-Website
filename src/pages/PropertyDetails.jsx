import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import properties from "../properties.json"; // Import property data from JSON
import "react-image-lightbox/style.css";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from URL params
  const [property, setProperty] = useState(null); // Store property data
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Store the index of the currently displayed image
  const [activeTab, setActiveTab] = useState("long-description"); // Track active tab
  const [isModalOpen, setIsModalOpen] = useState(false); // Control the modal visibility for images

  // Fetch the property details based on the ID from the URL
  useEffect(() => {
    const selectedProperty = properties.find((item) => item.id === id);
    if (!selectedProperty) {
      console.error("Property not found for ID:", id); // Error if no property matches the ID
    }
    setProperty(selectedProperty); // Set the selected property to state
  }, [id]); // Re-run the effect whenever the ID changes

  if (!property) {
    return <p>Loading property details...</p>; // Display loading message until property data is available
  }

  // Handlers for image carousel navigation
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % property.images.length // Cycle to the next image
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1 // Cycle to the previous image
    );
  };

  return (
    <>
      <div className="property-info">
        <main className="main">
          <div className="property-description">
            <h2 className="property-title1">{property.title}</h2>{" "}
            {/* Property title */}
            <h4 className="property-title2">
              {`${property.address.street}, ${property.address.city}, ${property.address.postcode}`}{" "}
              {/* Property address */}
            </h4>
            <section className="property-images">
              {/* Carousel for images */}
              <div className="carousel">
                <button onClick={handlePrevImage} className="arrow prev">
                  &#8249; {/* Left arrow for previous image */}
                </button>
                <img
                  src={property.images[currentImageIndex]} // Display current image
                  onClick={() => setIsModalOpen(true)} // Open modal when image is clicked
                  alt={`Property Image ${currentImageIndex + 1}`}
                  className="main-image"
                />
                <button onClick={handleNextImage} className="arrow next">
                  &#8250; {/* Right arrow for next image */}
                </button>
              </div>
              <div className="thumbnail-images">
                {/* Thumbnails for image navigation */}
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)} // Set the clicked thumbnail as the current image
                    className={
                      currentImageIndex === index
                        ? "thumbnail active" // Highlight the active thumbnail
                        : "thumbnail"
                    }
                  />
                ))}
              </div>
            </section>
            <p className="price">£{property.price}</p> {/* Property price */}
            <div className="details">
              <p>
                <strong>Date Added:</strong> {property.dateAdded}{" "}
                {/* Date property was added */}
              </p>
              <p>
                <strong>Let type:</strong> {property.letType} {/* Let type */}
              </p>
              <p>
                <strong>Tenure:</strong> {property.tenure}{" "}
                {/* Tenure details */}
              </p>
            </div>
            <h3 className="section-title">Key Features</h3>
            <ul className="key-features">
              {/* List of key features */}
              {property.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            {/* Tab Navigation */}
            <div className="tabs">
              <button
                className={
                  activeTab === "long-description" ? "tab active" : "tab"
                }
                onClick={() => setActiveTab("long-description")}
              >
                Description
              </button>
              <button
                className={activeTab === "floorplan" ? "tab active" : "tab"}
                onClick={() => setActiveTab("floorplan")}
              >
                Floor Plan
              </button>
              <button
                className={activeTab === "map" ? "tab active" : "tab"}
                onClick={() => setActiveTab("map")}
              >
                Google Map
              </button>
            </div>
            {/* Tab Panels - Render content based on active tab */}
            <div className="tab-content">
              {activeTab === "long-description" && (
                <p>{property.longDescription}</p> // Long description content
              )}
              {activeTab === "floorplan" && (
                <img
                  src={property.floorPlan}
                  alt="Floor Plan"
                  className="floor-plan"
                /> // Floor plan image
              )}
              {activeTab === "map" && (
                <iframe
                  title="Google Map"
                  src={property.mapUrl} // Embed Google Map
                  width="100%"
                  height="300"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal to show all images */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)} // Close the modal when clicked
            >
              &times;
            </button>
            <div className="modal-images">
              {/* Display all images in the modal */}
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
