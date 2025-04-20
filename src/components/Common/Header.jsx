import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
    <nav className="navbar navbar-expand-lg p-5 bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  justify-content-around " id="navbarTogglerDemo01">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="#">Link</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" aria-disabled="true">Disabled</Link>
                    </li>
                </ul>
                <Link className="navbar-brand" to="/">Hidden brand</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Link</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" aria-disabled="true">Disabled</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
};

export default Header;