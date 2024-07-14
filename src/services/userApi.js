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

    // const reposRes = await axios.get(`${API_BASE_URL}/users/${username}/repos`, {
    //   headers: {
    //     Authorization: `Bearer ${ACCESS_TOKEN}`,
    //   },
    //   params: {
    //     sort: 'update',
    //     visibility: 'all',
    //   },
    // });
    // const reposData = reposRes.data;
    // const privateReposCount = reposData.filter((repo) => repo.private).length;
    return {
      ...userData,
      // privateReposCount,
    };
  } catch (error) {
    console.error('Error fetching user list', error);
    throw error;
  }
};
