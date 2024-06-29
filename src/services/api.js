import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const apiData = async (username) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const userData = res.data;

    const reposRes = await axios.get(`${API_BASE_URL}/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        sort: 'update',
        visibility: 'all',
      },
    });
    const reposData = reposRes.data;
    const privateReposCount = reposData.filter((repo) => repo.private).length;
    console.log(reposData);
    return {
      ...userData,
      privateReposCount,
    };
  } catch (error) {
    console.error('Error fetching user list', error);
    throw error;
  }
};
