import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Loading...</p>
        </div>
    );
    }
export default Loader;