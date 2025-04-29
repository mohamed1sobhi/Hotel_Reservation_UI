// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createUser } from "../store/slices/accounts";
// import "./RegisterUserForm.css";

// const RegisterUserForm = ({ onSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.accounts);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     password2: "",
//     role: "customer",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await dispatch(createUser(formData)).unwrap();

//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         password2: "",
//         role: "customer",
//       });

//       setError("");
//       if (onSuccess) onSuccess();
//       window.location.href = "/login";
//     } catch (err) {
//       console.log("Error:", err);
//       if (typeof err === "object") {
//         setError(err); // save the full error object
//       } else {
//         setError({ non_field_errors: ["Invalid data."] });
//       }
//     }
//   };

//   return (
//     <div className="register-form-container bg-cream p-4 rounded shadow">
//       <h2 className="form-title text-dark mb-3">Register New User</h2>
//       <form onSubmit={handleSubmit} className="register-form">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="form-control mb-2"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="form-control mb-2"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           className="form-control mb-2"
//           value={formData.phone}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="form-control mb-2"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password2"
//           placeholder="Confirm Password"
//           className="form-control mb-2"
//           value={formData.password2}
//           onChange={handleChange}
//           required
//         />

//         <button
//           type="submit"
//           className="btn btn-primary-custom w-100"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register User"}
//         </button>

//         {error && error.non_field_errors && (
//           <div className="alert alert-warning text-center mt-3">
//             {error.non_field_errors.join(" ")}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default RegisterUserForm;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../store/slices/accounts";
import "./RegisterUserForm.css";
import { useNavigate } from "react-router-dom";


const RegisterUserForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.accounts);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.password2) errors.password2 = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return; // Stop submission if client-side validation fails
  
    try {
      await dispatch(createUser(formData)).unwrap();
  
      // Clear form and errors after successful registration
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        role: "customer",
      });
      setFormErrors({});
  
      if (onSuccess) onSuccess();
      navigate("/login")
    } catch (err) {
      console.error("Registration error:", err.response?.data);
  
      let serverErrors = {};
  
      if (err.response?.data?.error) {
        try {
          // Parse the JSON string in err.response.data.error
          const parsedErrors = JSON.parse(err.response.data.error);
  
          // Process each field to extract the error message from ErrorDetail
          Object.keys(parsedErrors).forEach((key) => {
            const errorDetail = parsedErrors[key];
            if (Array.isArray(errorDetail)) {
              // ErrorDetail is an array; extract the 'string' property from each
              serverErrors[key] = errorDetail
                .map((detail) => detail.string || "Unknown error")
                .join(", ");
            } else if (typeof errorDetail === "object" && errorDetail.string) {
              // Single ErrorDetail object
              serverErrors[key] = errorDetail.string;
            } else {
              // Fallback for unexpected format
              serverErrors[key] = "Unknown error";
            }
          });
        } catch (e) {
          console.error("Error parsing server errors:", e);
          serverErrors.non_field_errors = "Failed to process server errors.";
        }
      } else {
        // Fallback for unexpected response format
        serverErrors.non_field_errors = "An unexpected error occurred. Please try again.";
      }
  
      console.log("Processed server validation errors:", serverErrors);
      setFormErrors(serverErrors);
    }
  };
  return (
    <div className="register-form-container bg-cream p-4 rounded shadow">
      <h2 className="form-title text-dark mb-3">Register New User</h2>
      <form onSubmit={handleSubmit} className="register-form">

        {/* Username */}
        <div className="mb-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {formErrors.username && (
            <small className="text-danger">{formErrors.username}</small>
          )}
        </div>

        {/* Email */}
        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <small className="text-danger">{formErrors.email}</small>
          )}
        </div>

        {/* Phone */}
        <div className="mb-2">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && (
            <small className="text-danger">{formErrors.phone}</small>
          )}
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <small className="text-danger">{formErrors.password}</small>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {formErrors.password2 && (
            <small className="text-danger">{formErrors.password2}</small>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary-custom w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register User"}
        </button>

        {/* Non-field errors */}
        {formErrors.non_field_errors && (
          <div className="alert alert-warning text-center mt-3">
            {formErrors.non_field_errors}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterUserForm;
