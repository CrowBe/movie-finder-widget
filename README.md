# Movie Widget Project

This Widget was built with create-react-app and functions as a user interface for the API
built by the developers of The Movie Database. You can check out their website here: [The Movie Database](https://www.themoviedb.org/). You can also learn more about the API here: [API Introduction](https://developers.themoviedb.org/3/getting-started/introduction). All media information, images, trailers etc. are retrieved through their api and are subject to licensing/copyright laws detailed in their documentation [here](https://www.themoviedb.org/documentation/api).

![TMDb Logo - words The Movie DB in green and blue.](/src/assets/tmdb_logo.svg)

## Prerequisites

There are some prerequisites for running this project:

1. A valid api key from The Movie Database. You can [sign up for an account here](https://www.themoviedb.org/account/signup). Once your account is set up you can request an api key on [the settings tab](https://www.themoviedb.org/settings/api) of your account.

## Installation

To run the project locally:

1. Clone the repository (If you wish to develop it separately, fork the repository first).

2. Cd into the project directory.

3. Run `npm install`.

4. Create a .env file at the root of the directory and paste your api key into it, as shown in the .env.example file, and then save it.

5. Use the `npm start` command - explained further below - to run it locally.


## Standard React Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.