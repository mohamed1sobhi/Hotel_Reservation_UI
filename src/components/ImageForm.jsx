import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addImage, editImage } from "../store/slices/images"; 
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ImageForm = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.images);
    const { Id } = useParams();
    
    const [formData, setFormData] = useState({
        image: "", 
        hotel_id: Id ,
    });
    
    // useEffect(() => {
         
    //     setFormData({
    //         image: existingImage.image || "",
    //         hotel_id: existingImage.hotel_id || id,
    //     });
      
    // }, [id]);
    console.log("id", Id);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };  
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const preparedData = new FormData();
        preparedData.append("image", formData.image);
        preparedData.append("hotel_id", formData.hotel_id);
    
        dispatch(addImage(preparedData))
            .unwrap()
            .then(() => {
                setFormData({
                    image: "",
                    hotel_id: id,
                });
                alert("Image added successfully");
            })
            .catch((err) => {
                console.error("Upload failed:", err);
            });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
            Add Image
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}
export default ImageForm;
//     error: null,