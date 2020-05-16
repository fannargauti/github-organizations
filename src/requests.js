import axios from 'axios';

const API_SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

/**
 *
 * @param {String} org
 */
export async function getRepos(org) {
  try {
    const response = await axios.get(`${API_SERVER_URL}/${org}/repos`);
    const { data: repos } = response;
    return { repos, error: '' };
  } catch (error) {
    return { repos: [], error: `Could not find organization ${org}` };
  }
}

/**
 *
 * @param {String} org
 */
export async function getContributors(org, repo) {
  try {
    const response = await axios.get(
      `${API_SERVER_URL}/${org}/${repo}/contributors`
    );
    const { data } = response;
    return data;
  } catch (error) {
    alert('Could not get contributors');
    return { data: [] };
  }
}
