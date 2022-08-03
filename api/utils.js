const fetchUrl = require('fetch').fetchUrl;

/**
 * Helper function to fetch github url with the correct accept header and to provide an authorization
 * @param {string} url the url to perform the fetch request on
 * @param {function} callback the callback to be exectured when the request is finished
 */
function fetchWithAuth(url, callback) {
  // Default github api version is v3 but github still recommends an explicit version to be specified.
  const ACCEPT_HEADER_API_VERSION = 'application/vnd.github.v3+json';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
  const headers = {
    accept: ACCEPT_HEADER_API_VERSION,
    Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
  };
  fetchUrl(url, { headers }, callback);
}

/**
 * Sorts contributors by contributions and adds a value that represents contribution percentage
 * relative total contributions of the repositiory
 * @param {array} contributors array of contributors to a github repository
 * @returns {array} sorted contributors by contributions with an added value: contributionsPercentage
 */
function processContributors(contributors) {
  let sum = 0;
  contributors.forEach((contributor) => {
    sum = sum + contributor.contributions;
  });

  contributors.forEach((contributor) => {
    const contributionPercentage = (contributor.contributions / sum) * 100;
    contributor.contributionsPercentage = contributionPercentage.toFixed(2);
  });

  const sortedContributors = contributors.sort((contributorA, contributorB) => {
    return contributorB.contributions - contributorA.contributions;
  });

  return sortedContributors;
}

exports.fetchWithAuth = fetchWithAuth;
exports.processContributors = processContributors;
