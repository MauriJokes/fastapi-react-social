import axios from "axios";

export const registerUser = async (userData) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/auths/login`, userData);
};
