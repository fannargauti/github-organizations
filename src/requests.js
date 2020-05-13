import axios from 'axios';

const API_SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

/**
 *
 * @param {String} org
 */
export async function getRepos(org) {
  console.log('fetching', org);
  try {
    const response = await axios.get(`${API_SERVER_URL}/${org}/repos`);
    const { data } = response;
    // const pulls = Promise.all(
    //   data.map(async (repo) => await axios.get(`${repo.url}/pulls`))
    // );
    // console.log('pulls', pulls);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}
/**
 *
 * @param {*} organization
 * @param {*} repo
 */
export function getPullRequests(organization, repo) {}
