import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/api/users/`;

const getAllUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getUserById = (id) => {
    return axios.get(API_URL + id, { headers: authHeader() });
};

const updateUser = (id, user) => {
    return axios.put(API_URL + id, user, { headers: authHeader() });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return { 'x-auth-token': token };
    } else {
        return {};
    }
};

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userService;
