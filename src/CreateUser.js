// CreateUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const initialUser = {
    phoneNum: "",
    password: "",
    role: "ADMIN",
    firstName: "",
    lastName: "",
    latestPoints: 5000,
  };

  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/get-user-list"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      // Send the user data to the backend (POST request)
      await axios.post("http://localhost:8080/api/auth/register", user);
      // Fetch the updated list of users
      fetchUsers();
      // Reset the form
      setUser(initialUser);
      // Close the modal
      setShowCreateUserModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowCreateUserModal(true)}
      >
        Create User
      </button>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">User List</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td>{user.phoneNum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for creating users */}
      <div
        className={`modal fade ${showCreateUserModal ? "show" : ""}`}
        style={{ display: showCreateUserModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!showCreateUserModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create User</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowCreateUserModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role:
                  </label>
                  <select
                    className="form-control"
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="SHOPKEEPER">SHOPKEEPER</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNum" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNum"
                    name="phoneNum"
                    value={user.phoneNum}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="latestPoints" className="form-label">
                    Latest Points:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="latestPoints"
                    name="latestPoints"
                    value={user.latestPoints}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddUser}
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
