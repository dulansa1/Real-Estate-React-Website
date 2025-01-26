import React from "react";
import { Link } from "react-router-dom";

// Data for the info cards on the homepage
const cards = [
  {
    title: "Sold house prices",
    description:
      "Check what a home sold for plus photos, floorplans and local area insights.",
    link: "Search house prices",
    image: "/assets/homepg7.jpg",
  },
  {
    title: "2025 housing market: 5 things you need to know",
    description: "Take a look at our experts' predictions for the coming year.",
    link: "Read more",
    image: "assets/card2.jpg",
  },
  {
    title: "10 mistakes adding £100s to your energy bill",
    description:
      "Simple changes and tips that could save you money this winter.",
    link: "Take a look",
    image: "assets/card3.jpg",
  },
  {
    title: "10 mistakes adding £100s to your energy bill",
    description:
      "Simple changes and tips that could save you money this winter.",
    link: "Take a look",
    image: "assets/card4.jpg",
  },
];

function Homepage() {
  return (
    <>
      <div className="app">
        <div className="hero">
          <div className="hero-content">
            <h1>
              <span className="highlight">believe</span> in finding it
            </h1>
            <p>with the UK's largest choice of homes</p>

            {/* Link to property search page */}
            <Link to="/property">
              <button className="continue-btn">Continue</button>
            </Link>
          </div>
        </div>

        {/* Banner to encourage users to sign in */}
        <div className="sign-in-banner">
          <div className="banner-content">
            <h2>Sign in to streamline your search</h2>
            <p>
              Save properties, create alerts and keep track of the enquiries you
              send to agents.
            </p>
            <button className="sign-in-banner-btn">
              Sign in or create an account
            </button>
          </div>
        </div>

        {/* Display info cards on the homepage */}
        <div className="info-cards">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={card.image} alt={card.title} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
