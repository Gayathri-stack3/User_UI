// frontend/src/api.js
import axios from 'axios';

// Base URL of the FastAPI backend
const API_URL = "http://127.0.0.1:8000"; 

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
};

// Create a new user
export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};

// Update user by ID
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}/`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
};

// Delete user by ID
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        return null;
    }
};
