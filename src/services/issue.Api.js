import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN_CLASSIC;
const API_BASE_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchIssues = async (owner, repo) => {
  try {
    const res = await instance.get(`/repos/${owner}/${repo}/issues`);
    const issues = res.data.filter((item) => !('pull_request' in item));
    return issues;
  } catch (error) {
    console.error('Error fetching issues', error);
    throw error;
  }
};

export const createIssue = async (owner, repo, issue) => {
  try {
    const res = await instance.post(`/repos/${owner}/${repo}/issues`, issue);
    NotificationManager.success('issueを作成しました', 'success', 10000);
    return res.data;
  } catch (error) {
    console.error('Error creating issues', error);
    throw error;
  }
};

export const updateIssue = async (owner, repo, issueNumber, updatedIssue) => {
  try {
    const res = await instance.patch(`/repos/${owner}/${repo}/issues/${issueNumber}`, updatedIssue);
    NotificationManager.info('issueを更新しました', 'update', 10000);
    return res.data;
  } catch (error) {
    console.error('Error updating issues', error);
    throw error;
  }
};

export const closeIssue = async (owner, repo, issueNumber) => {
  try {
    const res = await instance.patch(`/repos/${owner}/${repo}/issues/${issueNumber}`, { state: 'closed' });
    return res.data;
  } catch (error) {
    console.error('Error closing issues', error);
    throw error;
  }
};
