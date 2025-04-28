import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHotel, editHotel, fetchHotelDetail } from "../store/slices/hotels";

const HotelFormModal = ({ HOTEL_ID, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = !!HOTEL_ID;
  const { hotelDetail } = useSelector((state) => state.hotels);
  const [formErrors, setFormErrors] = useState({});
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
        name: hotelDetail.name || "",
        description: hotelDetail.description || "",
        address: hotelDetail.address || "",
        stars: hotelDetail.stars ? Number(hotelDetail.stars) : "",
        price_range: hotelDetail.price_range || "",
        phone: hotelDetail.phone || "",
        email: hotelDetail.email || "",
      });
    }
  }, [hotelDetail, isEdit]);

  useEffect(() => {
    console.log("Updated formErrors:", formErrors);
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stars" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(editHotel({ id: HOTEL_ID, data: formData })).unwrap();
      } else {
        await dispatch(addHotel(formData)).unwrap();
        navigate("/hotels");
        window.location.reload();
      }
      setFormErrors({});
      onClose();
    } catch (error) {
      if (typeof error === "object") {
        console.log(error)
        setFormErrors(error);
        console.log(formErrors)
      } else {
        setFormErrors({ non_field_errors: ["An unknown error occurred."] });
      }
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit Hotel" : "Add Hotel"}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              
              {/* General non-field errors */}
              {formErrors.non_field_errors && (
                <div className="alert alert-danger">
                  {formErrors.non_field_errors[0]}
                </div>
              )}

              {/* Input Fields */}
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Description", name: "description", type: "text" },
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
                    className={`form-control ${formErrors[name] ? 'is-invalid' : ''}`}
                  />
                  {formErrors[name] && (
                    <div className="invalid-feedback">
                      {formErrors[name][0]}
                    </div>
                  )}
                </div>
              ))}

              {/* Stars Field */}
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
                  className={`form-control ${formErrors.stars ? 'is-invalid' : ''}`}
                />
                {formErrors.stars && (
                  <div className="invalid-feedback">
                    {formErrors.stars[0]}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Save Changes" : "Add Hotel"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFormModal;
