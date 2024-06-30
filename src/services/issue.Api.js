import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN_CLASSIC;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchIssues = async (owner, repo) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/repos/${owner}/${repo}/issues`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching issues', error);
    throw error;
  }
};

export const createIssue = async (owner, repo, issue) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/repos/${owner}/${repo}/issues`, issue, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching issues', error);
    throw error;
  }
};

export const updateIssue = async (owner, repo, issueNumber, updatedIssue) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/repos/${owner}/${repo}/issues/${issueNumber}`, updatedIssue, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching issues', error);
    throw error;
  }
};

export const deleteIssue = async (owner, repo, issueNumber) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/repos/${owner}/${repo}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching issues', error);
    throw error;
  }
};
