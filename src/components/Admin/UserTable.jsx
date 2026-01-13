import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createUserForAdmin, fetchUsers } from '../../store/slices/accounts';

const UserTable = ({ users }) => {
    const dispatch = useDispatch();
    const [userRoleFilter, setUserRoleFilter] = useState("all");
    const [showUserRegisterForm, setShowUserRegisterForm] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        email: "",
        phone: "",
        role: "hotel_owner",
        password: "",
        password2: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const filteredUsers = users.filter((user) => {
        if (userRoleFilter === "all") return true;
        return user.role === userRoleFilter;
    });

    const handleUserRoleFilterChange = (e) => {
        setUserRoleFilter(e.target.value);
    };

    const handleUserRegisterFormSuccess = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(createUserForAdmin(registerFormData));
            if (createUserForAdmin.fulfilled.match(resultAction)) {
                dispatch(fetchUsers());
                setShowUserRegisterForm(false);
                setFormErrors({});
                setRegisterFormData({
                    username: "",
                    email: "",
                    phone: "",
                    role: "hotel_owner",
                    password: "",
                    password2: "",
                });
            } else {
                // Assuming payload contains errors
                setFormErrors(resultAction.payload || {});
            }
        } catch (err) {
            console.log("Unexpected error:", err);
        }
    };

    return (
        <div className="users-section">
            <div className="section-controls">
                <div className="filter-controls">
                    <select
                        onChange={handleUserRoleFilterChange}
                        value={userRoleFilter}
                        className="filter-select"
                    >
                        <option value="all">All Roles</option>
                        <option value="hotel_owner">Hotel Owners</option>
                        <option value="customer">Customers</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
                <div className="action-controls">
                    <button
                        className="primary-button"
                        onClick={() => setShowUserRegisterForm(true)}
                    >
                        Add New User
                    </button>
                </div>
            </div>

            <div className="data-table-container">
                {users && users.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar-small">
                                                {user.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{user.username}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || "—"}</td>
                                    <td>{user.address || "—"}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`status-badge ${user.status ? "active" : "blocked"
                                                }`}
                                        >
                                            {user.status ? "Active" : "Blocked"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="icon-button edit">Edit</button>
                                            <button className="icon-button delete">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No users found.</div>
                )}
            </div>

            <Modal
                show={showUserRegisterForm}
                onHide={() => setShowUserRegisterForm(false)}
                centered
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUserRegisterFormSuccess}>
                        <Form.Group controlId="username" className="form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Name"
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        username: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.username?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.username}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="email" className="form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.email?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.email}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="phone" className="form-group">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.phone?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.phone}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="role" className="form-group">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={registerFormData.role}
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="hotel_owner">Hotel Owner</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password" className="form-group">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.password?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.password}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="password2" className="form-group">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                className={`form-group ${formErrors.password2 ? "is-invalid" : ""
                                    }`}
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        password2: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.password2?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.password2}
                                </div>
                            )}
                        </Form.Group>

                        <div className="modal-actions">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setFormErrors({});
                                    setShowUserRegisterForm(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Create User
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserTable;
