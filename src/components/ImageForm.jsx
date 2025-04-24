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
    console.log(Id);
    const [imageFile, setImageFile] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!imageFile) {
        alert('Please select an image to upload.');
        return;
      }
  
      const formData = new FormData();
      formData.append('hotel_id', Id); // set from URL param
      formData.append('image', imageFile);
  
      dispatch(addImage(formData));
    };
  
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Upload Image for Hotel #{Id}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">Select Image</label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 block w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  };
  
  export default ImageForm;