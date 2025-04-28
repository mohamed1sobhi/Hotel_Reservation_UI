import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logout";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const userId = JSON.parse(localStorage.getItem("user"))?.id;
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    if (userId){
      setIsLoggedIn(true)
      console.log(userId) ;
    }
    // setIsLoggedIn(!!token || !!userId);
  }, []);
 
  console.log(isLoggedIn);


  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm border-bottom border-primary p-4">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          {/* <img
            src="src/assests/HOTEL_LOGO.svg"
            alt="Royal Hotels Logo"
            style={{ width: "100px", height: "80px" }}
          /> */}
          <span className="text-primary">Royal Hotels</span>
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarTogglerDemo01"
        >
     <div className="  d-flex justify-content-center" style={{ width: "100%" }}> 
     <ul className="navbar-nav gap-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark hover-text-primary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark hover-text-primary" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark hover-text-primary" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark hover-text-primary" to="/hotels">
                Hotels
              </Link>
            </li>
          </ul>
     </div>

          {/* Login/Logout Button */}
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <LogoutButton />
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold text-light btn bg-primary px-4 py-2 d-flex align-items-center gap-2"
                  to="/login"
                >
                  
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;