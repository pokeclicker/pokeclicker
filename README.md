[![Build Status](https://img.shields.io/travis/pokeclicker/pokeclicker?logo=travis)](https://travis-ci.org/pokeclicker/pokeclicker)

# PokéClicker
A game about catching Pokémon, defeating gym leaders, and watching numbers get bigger.

NOTE: PokéClicker is still in its early stages of development!

You can try out the current state at www.pokeclicker.com

# Game design
The design document is in a fancy LaTeX format that can be viewed [here](https://www.sharelatex.com/project/58d39d51e6bc7ab471b64512)
It contains all knowledge needed to help out in the development.

# Developer instructions

## Naming conventions
All file and class names should be [upper CamelCase](https://en.wikipedia.org/wiki/Camel_case). Function names should be lower camelCase.

## Building from Source

First make sure you have git and npm available as command-line utilities (so you should install Git and NodeJS if you don't have them already).

Open a command line interface in the directory that contains this README file, and use the following command to install PokéClicker's other dependencies locally:
```cmd
npm install
```

Then finally, run the following command in the command line interface to start a browser running PokéClicker.
```cmd
npm start
```

Changes to the sourcecode will automatically cause the browser to refresh.
This means you don't need to compile TypeScript yourself. Gulp will do this for you :thumbsup:


## Use Google cloud shell _(alternative)_
[![Google Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/pokeclicker-dev/pokeclicker&git_branch=develop&page=editor&open_in_editor=README.md)
```cmd
npm install
npm start
```

## Deploying a new version to Github Pages
Before deploying, check that the game compiles and starts up without errors. Then run:
```cmd
npm run website
```

After this command completes, push the changed files in the 'docs' directory to Github.
