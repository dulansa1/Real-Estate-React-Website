import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavouriteSidebar from '../pages/FavouriteSideBar'; // Import sidebar component
import logo from '../images/logo3.png';

function NavBar({ favorites = [], setFavorites }) {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Toggles the wishlist sidebar visibility
    const toggleWishlist = () => {
        setIsWishlistOpen((prevState) => !prevState);
    };

    return (
        <>
            <header className="header">
                <img
                    src={logo}
                    className="App-logo"
                    alt="Logo"
                    width={130}
                    height={60}
                />
                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/property" className="nav-link">Property</Link>
                </nav>
                <div className="wishlist-container">
                    <button
                        className="wishlist-btn"
                        onClick={toggleWishlist}
                        aria-label="Toggle Wishlist"
                    >
                        Favorites
                    </button>
                    <span className="dot">{favorites?.length || 0}</span>
                </div>
            </header>

            {/* Wishlist Sidebar */}
            <FavouriteSidebar
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
                favorites={favorites}
                setFavorites={setFavorites}
            />
        </>
    );
}

export default NavBar;
