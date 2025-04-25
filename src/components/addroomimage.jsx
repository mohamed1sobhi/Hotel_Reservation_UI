import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addRoomImage } from "../store/slices/room_images";

const AddRoomImage = () => {
    const { room_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.rooms);

    const [roomImage, setRoomImage] = useState({
        room: room_id,
        image: null,
    });

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setRoomImage({ ...roomImage, image: e.target.files[0] }); // get file
        } else {
            setRoomImage({ ...roomImage, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("room", roomImage.room);
        formData.append("image", roomImage.image);

        dispatch(addRoomImage(formData)).then(() => {
            navigate("/");
        });
    };

    return (
        <div>
            <h1>Add Room Image</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Room Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Add Room Image"}
                </button>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </form>
        </div>
    );
};

export default AddRoomImage;
