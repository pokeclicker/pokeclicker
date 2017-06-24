# PokéClicker
A game about catching Pokémon, defeating gym leaders, and watching numbers get bigger.

NOTE: PokéClicker is still in its early stages of development!

You can try out the current state at www.pokeclicker.com

# Game design
The design document is in a fancy LaTeX format that can be viewed [here](https://www.sharelatex.com/project/58d39d51e6bc7ab471b64512)
It contains all knowledge needed to help out in the development.

# Developer instructions

## Building from Source

First make sure you have git and npm available as command-line utilities (so you should install Git and NodeJS if you don't have them already).
You also need gulp, which you can get from npm by opening the command line interface of your operating system and typing the following command:

- npm install -g gulp

Open a command line interface in the directory that contains this README file, and use the following command to install PokéClicker's other dependencies locally:
- npm install

Then finally, run the following command in the command line interface to start a browser running PokéClicker.
- gulp

Changes to the sourcecode will automatically cause the browser to refresh.


## Deploying a new version to Github Pages
Before deploying, check that the game compiles and starts up without errors. Then run:
- gulp website

After this command completes, push the changed files in the 'docs' directory to Github.
