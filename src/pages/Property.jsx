import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../properties.json";
import { TextField, MenuItem, Button } from "@mui/material";

const Property = () => {
  const [properties, setProperties] = useState([]); // Store the properties
  const [filters, setFilters] = useState({
    // Store filter criteria
    propertyType: "Any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateFrom: null,
    dateTo: null,
    postcodeArea: "",
    dateAdded: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setProperties(propertiesData); // Fetch properties data when the component mounts
  }, []);

  const handleSearch = () => {
    // Helper function to check if the value is a positive number
    const isPositiveNumber = (value) => {
      return !value || (Number(value) > 0 && !isNaN(value));
    };

    // Validation for input values
    if (
      !isPositiveNumber(filters.minPrice) ||
      !isPositiveNumber(filters.maxPrice) ||
      !isPositiveNumber(filters.minBedrooms) ||
      !isPositiveNumber(filters.maxBedrooms)
    ) {
      alert("Please input valid positive number");
      return;
    }

    // Check for date validation
    if (
      filters.dateFrom &&
      filters.dateTo &&
      new Date(filters.dateFrom) > new Date(filters.dateTo)
    ) {
      alert("Date From cannot be later than Date To.");
      return;
    }

    // Filter the properties based on the filters
    const results = properties.filter((property) => {
      const propertyDate = new Date(property.dateAdded);
      const userPostcode = filters.postcodeArea.toLowerCase();
      const propertyPostcode = property.postcodeArea.toLowerCase();

      return (
        (filters.propertyType === "Any" ||
          property.type === filters.propertyType) &&
        (!filters.minPrice || property.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= Number(filters.maxPrice)) &&
        (!filters.minBedrooms ||
          property.bedrooms >= Number(filters.minBedrooms)) &&
        (!filters.maxBedrooms ||
          property.bedrooms <= Number(filters.maxBedrooms)) &&
        (!filters.postcodeArea || propertyPostcode.includes(userPostcode)) &&
        (!filters.dateAdded || propertyDate >= new Date(filters.dateAdded))
      );
    });

    // Navigate to the details page with the filtered properties if there are any results
    if (results.length > 0) {
      navigate("/details", { state: { filteredProperties: results } });
    } else {
      alert("No properties found. Please adjust your search criteria.");
    }
  };

  return (
    <>
      <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
        <h1 className="search-title"> Find Your Perfect Property</h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {/* Filter inputs for property type, price, and other criteria */}
          <div style={{ flex: "1 1 48%" }}>
            <TextField
              select
              label="Property Type"
              value={filters.propertyType}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, propertyType: e.target.value })
              }
            >
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
            </TextField>
          </div>

          {/* More filter inputs for bedrooms, price, postcode, and dates */}
          <div style={{ flex: "1 1 48%" }}>
            <TextField
              label="Min Bedrooms"
              type="number"
              value={filters.minBedrooms}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, minBedrooms: e.target.value })
              }
            />
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <TextField
              label="Max Bedrooms"
              type="number"
              value={filters.maxBedrooms}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, maxBedrooms: e.target.value })
              }
            />
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <TextField
              label="Min Price"
              type="number"
              value={filters.minPrice}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <TextField
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <TextField
              type="date"
              value={filters.dateAdded}
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, dateAdded: e.target.value })
              }
            />
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <TextField
              label="Postcode Area"
              value={filters.postcodeArea}
              placeholder="e.g. BR1, NW1"
              fullWidth
              onChange={(e) =>
                setFilters({ ...filters, postcodeArea: e.target.value })
              }
            />
          </div>
        </div>

        {/* Search button to trigger property filtering */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1.5rem" }}
          onClick={handleSearch}
        >
          Search Properties
        </Button>
      </div>
    </>
  );
};

export default Property;
