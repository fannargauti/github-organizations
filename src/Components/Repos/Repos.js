import React from 'react';
import Repo from '../Repo';
import './Repos.css';

const Repos = ({ repos, organization }) => (
  <div className="Repos">
    {repos.map((repo, index) => (
      <Repo
        key={repo.id}
        organization={organization}
        repo={repo}
        index={index}
      />
    ))}
  </div>
);

export default Repos;
