import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN_CLASSIC;
const API_BASE_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchUser = async (username) => {
  try {
    const res = await instance.get(`/users/${username}`, {});
    const userData = res.data;
    return {
      ...userData,
    };
  } catch (error) {
    console.error('Error fetching user list', error);
    throw error;
  }
};
