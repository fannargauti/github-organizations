# GitHub organizations

![May-18-2020 09-36-22](https://user-images.githubusercontent.com/19215111/82196344-db323200-98f9-11ea-8b6a-d6fcd01b4c0b.gif)

Search GitHub organizations and view their repositories in a breeze 🕵️‍♂️

Explore repositories and their contributors in a quick, responsive and beautiful way 💅

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This guide assumes that you are running on macOS.
Using [Homebrew](https://brew.sh/) to install the dependencies is helpful, but if you do not have it, you can use alternative methods provided by the relevant package.

You will need [node](https://nodejs.org/en/), [redis](https://redis.io/) and [git](https://git-scm.com/) if you do not already have them installed.

```
$ brew install node redis git
```

### Installing

Start by cloning the project:

```
$ git clone https://github.com/fannargauti/github-organizations.git
```

Navigate to the project's folder:

```
$ cd github-organizations
```

Install dependencies:

```
$ npm install
```

GitHub's API has a low rate limit for non-authorized requests, so it's recommended to create a `.env` file with a GitHub token.
To create a GitHub token, follow [these GitHub instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

Note that you do not need to grant any permissions for this token since it is only used for authorization in this application.

When you have created your toke, create a `.env` file in the root of the project and paste your token into an environment variable like so:

```
GITHUB_TOKEN=$YOUR_GITHUB_TOKEN
```

Start the development server:

```
$ npm run start-dev-server
```

Start the application's client:

```
$ npm start
```

Run a redis server for caching on the default port:

```
$ redis-server
```

You should now be able to view the application in your browser via http://localhost:3000/

Type in an organization in the input and press the button to view it's repositories.

## Running the tests

To run tests:

```
$ npm test
```

and follow the GUI instructions.

## Deployment

TODO: deploy the application and update readme with instructions on how it's done

Build can be created with:

```
$ npm run build
```

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Express](https://expressjs.com/) - The web application's server framework

## Authors

- **Fannar G. Gudmundsson** - _Initial work_ - [fannargauti](https://github.com/fannargauti)
