const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const utils = require("./utils");
dotenv.config();

const API_BASE_URL = "https://api.github.com";

const app = express();
app.use(cors());

app.get("/:org/repos", (req, res, next) => {
  const { org } = req.params;

  utils.fetchWithAuth(
    `${API_BASE_URL}/orgs/${org}/repos`,
    (error, meta, body) => {
      if (error || meta.status !== 200) {
        return next(error, req, res, next);
      }
      res.setHeader("Cache-Control", "s-max-age=10000, stale-while-revalidate");
      return res.json(JSON.parse(body));
    }
  );
});

app.get("/:org/:repo/contributors", (req, res, next) => {
  const { org, repo } = req.params;
  utils.fetchWithAuth(
    `${API_BASE_URL}/repos/${org}/${repo}/contributors`,
    (error, meta, body) => {
      if (error || meta.status !== 200) {
        return next(error, req, res, next);
      }
      const parsedBody = JSON.parse(body);
      const contributors = utils.processContributors(parsedBody);
      res.setHeader("Cache-Control", "s-max-age=10000, stale-while-revalidate");
      return res.json(contributors);
    }
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
