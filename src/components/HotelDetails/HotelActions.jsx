import React from 'react';
import { Edit3, ImagePlus, MessagesSquare } from 'lucide-react';
import { userIsOwner, userIsCustomer, userIsAdmin } from "../../utils/permissions";

const HotelActions = ({ hotel, navigate, onDelete }) => {
    return (
        <>
            <div className="d-flex flex-wrap gap-3 mb-5">
                {userIsOwner() && (
                <button className="btn btn-primary border-0" onClick={() => navigate(`/createimage/${hotel.id}`)}>
                    <ImagePlus className="me-2" size={18} /> Add Image
                </button>
                )}

                <button className="btn btn-primary border-0" style={{ border : "none"}} onClick={() => navigate(`/hotels/${hotel.id}/reviews`)}>
                    <MessagesSquare className="me-2" size={18} /> Show Reviews
                </button>
                
                {userIsOwner() && (
                <button className="btn btn-primary border-0" onClick={() => navigate(`/edithotel/${hotel.id}`)}>
                    <Edit3 className="me-2" size={18} /> Edit
                </button>
                )}
                
                {userIsAdmin() && (
                <button
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    Delete
                </button>
                )}
                
                {userIsCustomer() && ( 
                <button className='btn  btn-primary border-0' onClick={() => navigate(`/addbooking/${hotel.id}/`)}>
                    AddBooking
                </button>
                )}
                
                {userIsOwner() && (
                <button
                    className="btn btn-primary" style={{ marginLeft: "auto", border: "none" }}
                    onClick={() => navigate(`/addroom/${hotel.id}`)}
                >
                    Add Room
                </button>
                )}
                
                {userIsOwner() && (      
                <button
                    className="btn btn-primary" style={{ border: "none" }}
                    onClick={() => navigate(`/addtype/${hotel.id}`)}
                >
                    Add Room Type
                </button>
                )}
            </div>
            
            <button
                className="btn btn-outline-dark align-center"
                onClick={() => navigate(`/hotels/${hotel.id}`)}
            >
                Show All Rooms
            </button>
        </>
    );
}
export default HotelActions;
