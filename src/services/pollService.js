// services/pollService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/api/polls/`;

const createPoll = (poll) => {
    return axios.post(API_URL + 'create', poll, { headers: authHeader() });
};

const getPollsByRole = (role,optionId) => {
    return axios.get(API_URL + `${role}/${optionId}`, { headers: authHeader() });
};

const getAllPolls = () => {
    return axios.get(API_URL, { headers: authHeader() })
        .then(response => {
            return response.data; // Directly return the response data
        })
        .catch(error => {
            throw error;
        });
};

const vote = (pollId, optionId) => {
    return axios.post(API_URL + 'vote', { pollId, optionId }, { headers: authHeader() });
};

const deletePoll = (id) => {
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

const pollService = {
    createPoll,
    getPollsByRole,
    deletePoll,
    getAllPolls,
    vote
};

export default pollService;
