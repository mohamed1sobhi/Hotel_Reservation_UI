// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createUser, editUser } from "../store/slices/accounts";
// import "./RegisterUserForm.css";

// const RegisterUserForm = ({ onSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.accounts);
//   const [error, setError] = useState("");

//   // console.log("error", error);

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
//     dispatch(createUser(formData))
//       .unwrap()
//       .then(() => {
//         setFormData({
//           username: "",
//           email: "",
//           phone: "",
//           password: "",
//           password2: "",
//           role: "customer",
//         });
//         onSuccess && onSuccess();
//         window.location.href = "/login";
//       });
//       if (onSuccess) onSuccess();
//       setError("");
//     } 
//     .catch (error) {
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

//         {error && (
//           <div className="alert alert-warning text-center">
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

const RegisterUserForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.accounts);
  const [error, setError] = useState("");

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createUser(formData)).unwrap();

      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        role: "customer",
      });

      setError("");
      if (onSuccess) onSuccess();
      window.location.href = "/login";
    } catch (err) {
      console.log("Error:", err);
      if (typeof err === "object") {
        setError(err); // save the full error object
      } else {
        setError({ non_field_errors: ["Invalid data."] });
      }
    }
  };

  return (
    <div className="register-form-container bg-cream p-4 rounded shadow">
      <h2 className="form-title text-dark mb-3">Register New User</h2>
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

        <button
          type="submit"
          className="btn btn-primary-custom w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register User"}
        </button>

        {error && error.non_field_errors && (
          <div className="alert alert-warning text-center mt-3">
            {error.non_field_errors.join(" ")}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterUserForm;
