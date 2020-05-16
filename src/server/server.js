const express = require('express');
const fetchUrl = require('fetch').fetchUrl;
const cors = require('cors');
const cache = require('express-redis-cache')();
const dotenv = require('dotenv');
dotenv.config();

const API_BASE_URL = 'https://api.github.com';
const ACCEPT_HEADER_API_VERSION = 'application/vnd.github.v3+json';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const app = express();
app.use(cors());

app.get('/:org/repos', cache.route(), (req, res) => {
  const { org } = req.params;
  fetchUrl(
    `${API_BASE_URL}/orgs/${org}/repos`,
    {
      headers: {
        accept: ACCEPT_HEADER_API_VERSION,
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    },
    (error, meta, body) => {
      console.log(error, meta, body);
      if (error || meta.status !== 200) {
        return res.status(400).send('Bad Request');
      }

      return res.json(JSON.parse(body));
    }
  );
});

app.get('/:org/:repo/contributors', cache.route(), (req, res) => {
  const { org, repo } = req.params;
  fetchUrl(
    `${API_BASE_URL}/repos/${org}/${repo}/contributors`,
    {
      headers: {
        accept: ACCEPT_HEADER_API_VERSION,
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    },
    (error, meta, body) => {
      console.log(error, meta, body);
      if (error || meta.status !== 200) {
        return res.status(meta.status).send([]);
      }

      return res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
