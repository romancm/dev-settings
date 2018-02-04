[![screenshot](https://user-images.githubusercontent.com/645310/35774858-457a2b66-0939-11e8-8b7a-bc9339442525.png)](https://romancmx.github.io/dev-settings/)

## Concept

**DevSettings** gathers settings for the most popular text editors: Visual Studio Code and Atom.

This is a place where developers can find and discover new packages, extensions, customizations, settings, etc... from other developers around the world.

### Community-driven

Users can sign in with their GitHub account and contribute to the project by:

* Contribute to the development of the website
* Sharing settings publicly

Anyone can contribute!


## Technical overview

### Cloud services

#### Database: [mLab](https://mlab.com/)

Database-as-a-Service for MongoDB, free up to 500 MB.

#### Authentication

[Github](https://github.com/): Github oauth authentication.

#### Static hosting

**DevSettings** is hosted on GitHub pages.


### Libraries

This repository is the front-end application, a single-page application built with the following modules:

* [VueJS](https://vuejs.org/)
* [Vuex](https://github.com/vuejs/vuex)
* [Webpack](http://webpack.github.io/)

Webpack is used to build the application in development and production mode.


## Development workflow

Start the web server and watch for changes on the filesystem:

```
yarn dev
```

The application should be running at [localhost:8080](http://localhost:8080)

### Production deploy

Build the files for production (`index.html` rendered server-side, `build/app.css` and `build/bundle-app.js`):

```
yarn deploy
```

### Testing

Run unit tests:

```
yarn test
```

Run unit tests in debug mode, to be able to see console.log in the terminal window:

```
yarn test:debug
```


## Show your support!

Spread the word and please **star** the repo to show your support...
