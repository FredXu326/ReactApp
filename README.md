# RiVision Graphical User Interface

The Rivision GUI is a React front-end client. It receives data from the RiVision server and renders it in an interactive graphical user interface. 

## Tech Stack

**Client:** ReactJS, socket.io, socket.io-client

## Installation for Development

Make sure you have installed Python3, and pip.
After installation please follow the instructions below to download the repo.

- Within the terminal window, create a folder in your local drive.
- Navigate to the folder created.
- Run the following command:

```bash
  git clone https://gitlab.com/rivian/me/automation-controls/machine-vision/rivision-services/rivision-gui.git
```

- Navigate into the new sub-folder created called **rivision-gui**.
- Run the following commands to create a virtual node environment and install the dependencies:

```bash
  pip install nodeenv
  python -m nodeenv nodeenv
  nodeenv/Scripts/activate
  npm i react-scripts
```

## Run Locally

Make sure the server is initialized before the client to avoid any issues.

Terminal **window** - start the client:

```bash
  npm start
```

## Deploying the App

## Electron-Forge

ELectron-forge is a powerful tool for building and packaging cross-platform desktop applications using Electron and Node.js. It simplifies the development process by providing a streamlined workflow. 

#### Set Up the React App with Electron
1. Install Electron in project as a development dependency: 

```bash
npm i -D electron
```

2. Install package to detect react app evironment: 

```bash
npm i electron-is-dev
```

3. Add a file to the `public` directory called `electron.js` to contain all Electron-related code. 

```bash
touch public/electron.js
```

Starter code example available at [Electron docs](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app). The main purpose of this script is to load the build HTML file in our window and to set up the window. Make sure you have the correct file path implemented.

```
const startURL = `file://${path.join(__dirname, "../build/index.html")}`
```

Don't worry about `build` folder for now. It will be created when we run the scripts.

4. Declare the `electron.js` file as the main entry point for RiVision in `package.json`:

```
{
  "name": "rivision-gui",
  "version": "0.1.0",
  "main": "public/electron.js",
  // ...
}
```

#### Configuring Electron Forge
1. Install `electron-forge` and import existing app into workflow: 

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

2. Update the `"scripts"` section of `package.json` to the following: 

```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron": "electron-forge start",
    "package": "react-scripts build && electron-forge package",
    "make": "react-scripts build && electron-forge make"
  },
```

3. Set properties in the `package.json` file to help the build correctly infer the root path to use in the generated HTML file: 

```
{
  "name": "rivision-gui",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://127.0.0.1:5001/",
  "main": "public/electron.js",
  "homepage": "./",
  "author": "Fred Xu",
  "description": "RiVian's In-House Machine Vision Platform",
  //...
}
```

Make sure you have all the fields. The builder will throw error if one is missing.

4. Run command to package our app for distribution: 

```bash
npm run make
```

After the scripts runs, you should see an `out` folder containing both the distributable and a folder containing the packaged application code. 