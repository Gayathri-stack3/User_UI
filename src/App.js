import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    age: '',
    is_active: false,
    gender: '',
  });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    if (data && data.status === "success") {
      setUsers(data.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUserId) {
      await updateUser(editUserId, form);
      setEditUserId(null);
    } else {
      const newUser = await createUser(form);
      setUsers([...users, newUser.data]);
    }
    setForm({
      first_name: '',
      last_name: '',
      age: '',
      is_active: false,
      gender: '',
    });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      is_active: user.is_active,
      gender: user.gender,
    });
    setEditUserId(user.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Is it confirmed?");
    if (confirmDelete) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>

      {/* Form for creating or updating a user */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={form.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={form.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={form.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group form-group-checkbox">
          <label>Active</label>
          <label className="">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            <span className="Checkbox"></span>
          </label>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="form-group-radio">
            <div className="form-check">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="Male"
                className="form-check-input"
                checked={form.gender === 'Male'}
                onChange={handleInputChange}
              />
              <label htmlFor="gender-male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="Female"
                className="form-check-input"
                checked={form.gender === 'Female'}
                onChange={handleInputChange}
              />
              <label htmlFor="gender-female" className="form-check-label">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="gender-other"
                name="gender"
                value="Other"
                className="form-check-input"
                checked={form.gender === 'Other'}
                onChange={handleInputChange}
              />
              <label htmlFor="gender-other" className="form-check-label">
                Other
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editUserId ? 'Update User' : 'Create User'}
        </button>
      </form>

      {/* Table of users */}
      <h2 className="mt-5">Users List</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Active</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.is_active ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-info mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
