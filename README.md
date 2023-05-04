<!-- Please update value in the {}  -->

<h1 align="center">My Unsplash</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://my-devchallenge-unsplash.netlify.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://my-devchallenge-unsplash.netlify.app/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png)

Introduce your projects by taking a screenshot or a gif. Try to tell visitors a story about your project by answering:

- Where can I see your demo?
- What was your experience?
- What have you learned/improved?
- Your wisdom? :)

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Sveltekit](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Xata](https://xata.io/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP) was to build an application to complete the given user stories.

## How To Use

### Prerequisite

- Create a database on Xata [Xata](https://xata.io/).
- Add the schema to the database:
  - [database schema](./static/schema.png)
- Update your `.xatarc` database url to your xata database url
- Follow the following commands to set up your xata database to work with locally

```bash
# if you have not installed xata cli, install it
npm i --location=global @xata.io/cli@latest

# login if you have not already done so
xata auth login

# update the .env variables with your xata database credentials
cp .env.example .env
```

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/discoverlance-com/my-unsplash

# Install dependencies
$ pnpm install

# Run the app
$ pnpm dev
```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example: -->

- [Steps to replicate a design with only HTML and CSS](https://devchallenges-blogs.web.app/how-to-replicate-design/)
- [Node.js](https://nodejs.org/)
- [Marked - a markdown parser](https://github.com/chjj/marked)

## Contact

- Website [discoverlance](https://discoverlance.com)
- GitHub [@discoverlance-com](https://github.com/discoverlance-com)
- Twitter [@Discoverlance](https://twitter.com/Discoverlance)
