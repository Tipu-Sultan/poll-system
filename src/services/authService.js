import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/api/auth/`;

const register = (user) => {
    return axios.post(API_URL + 'register', user);
};

const login = (user) => {
    return axios.post(API_URL + 'login', user)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        });
};

 const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};


const authService ={
    register,
    login,
    logout
};

export default authService
