import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createtype } from "../store/slices/rooms";

const AddType = () => {
    const { hotel_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.rooms);
    const [roomType, setRoomType] = useState({
        hotel: hotel_id,
        room_type: "",
    });
    
    const handleChange = (e) => {
        setRoomType({ ...roomType, [e.target.name]: e.target.value });
        console.log("changed", e.target.name, e.target.value);
        console.log("Room Type:", roomType);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createtype(roomType));
        navigate("/");
    };
    
    return (
        <div>
        <h1>Add Room Type</h1>
        <form onSubmit={handleSubmit}>
            <label>Room Type</label>
            <input
            type="text"
            name="room_type"
            placeholder="Room Type"
            value={roomType.room_type}
            onChange={handleChange}
            />
            <button type="submit">Add Room Type</button>
        </form>
        </div>
    );
    }
export default AddType;