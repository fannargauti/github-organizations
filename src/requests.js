import axios from 'axios';

const API_SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

/**
 * Requests repositories for a given organization
 * @param {String} org the organization to fetch repositories for
 * @returns {Object} an object that contains an array of repositories and an error message(if relevant)
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
 * @param {String} org the relevant organization that owns the repository
 * @param {String} repo the repository to fetch contributors for
 * @returns {Array} an array of contributors where each contributor is an object
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
    return [];
  }
}
