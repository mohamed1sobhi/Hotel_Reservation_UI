import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addHotel, editHotel, fetchHotelDetail, fetchHotels, filterHotels } from "../store/slices/hotels";

const HotelFormModal = ({ HOTEL_ID, onClose }) => {
  const handleClose = () => {
    console.log("Cancel button clicked");
    onClose();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = !!HOTEL_ID;
  const { hotelDetail, loading, error } = useSelector((state) => state.hotels);
  const user = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    owner: user ? JSON.parse(user).id : "1",
    name: "",
    description: "",
    address: "",
    stars: "",
    price_range: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    if (isEdit) {
      dispatch(fetchHotelDetail(HOTEL_ID));
    }
  }, [dispatch, HOTEL_ID, isEdit]);

  useEffect(() => {
    if (isEdit && hotelDetail) {
      setFormData({
        owner: hotelDetail.owner,
        name: hotelDetail.name || '',
        description: hotelDetail.description || '',
        address: hotelDetail.address || '',
        stars: hotelDetail.stars ? Number(hotelDetail.stars) : '',
        price_range: hotelDetail.price_range || '',
        phone: hotelDetail.phone || '',
        email: hotelDetail.email || '',
      });
    }
  }, [hotelDetail, isEdit]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stars" ? (value === "" ? "" : Number(value)) : value,
    }));
    };
  const [formErrors, setFormErrors] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      alert ("Please fill all fields" );
      return ;
    }
    try {
      if (isEdit) {
        await dispatch(editHotel({ id: HOTEL_ID, data: formData })).unwrap();
        onClose();
      } else {
        await dispatch(addHotel(formData)).unwrap();
        setFormErrors(null);
        navigate("/hotels");
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error("Error submitting hotel:", error);
      setFormErrors(error);
        }  
  };
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit Hotel" : "Add Hotel"}</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Description", name: "description", type: " biti text" },
                { label: "Address", name: "address", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Price Range", name: "price_range", type: "text" },
                { label: "Phone", name: "phone", type: "text" },
              ].map(({ label, name, type }) => (
                <div className="mb-3" key={name}>
                  <label htmlFor={name} className="form-label">{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`form-control ${formErrors? "is-invalid" : ""}`}

                  />
                   {formErrors && <p style={{ color: 'red' }}>{formErrors[0]}</p>}
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="stars" className="form-label">Stars</label>
                <input
                  type="number"
                  id="stars"
                  name="stars"
                  min="3"
                  max="7"
                  value={formData.stars}
                  onChange={handleChange}
                 className={`form-control ${formErrors ? "is-invalid" : ""}`}
                />
                {formErrors && <div className="invalid-feedback">{formErrors[0]}</div>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {isEdit ? "Save Changes" : "Add Hotel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFormModal;
