import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, editUser } from "../store/slices/accounts";
import "./RegisterUserForm.css";

const RegisterUserForm = ({ existingUser = null, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.accounts);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    role: "customer",
  });

  useEffect(() => {
    if (existingUser) {
      setFormData({
        username: existingUser.username || "",
        email: existingUser.email || "",
        phone: existingUser.phone || "",
        password: "",
        password2: "",
        role: existingUser.role || "customer",
      });
    }
  }, [existingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(formData))
      .unwrap()
      .then(() => {
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          password2: "",
          role: "customer",
        });
        if (onSuccess) onSuccess();
      });
  };

  return (
    <div className="register-form-container bg-cream p-4 rounded shadow">
      <h2 className="form-title text-dark mb-3">
        {existingUser ? "Edit User" : "Register New User"}
      </h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-2"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-2"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="form-control mb-2"
          value={formData.password2}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="form-select mb-3"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="hotel_staff">Hotel Staff</option>
          <option value="hotel_owner">Hotel Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary-custom w-100"
          disabled={loading}
        >
          {loading
            ? existingUser
              ? "Updating..."
              : "Registering..."
            : existingUser
            ? "Update User"
            : "Register"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterUserForm;
