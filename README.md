# AxisPhilly App Template

This template helps make simple apps (like [Changes in Crime by Neighborhood](http://apps.axisphilly.org/crime-change/)) by baking out [EJS](https://github.com/visionmedia/ejs) templates into HTML, compiling [SASS](http://sass-lang.com/) to CSS, concatenating and minifying (but doesn't obfuscate!) JS.

We got a lot of inspiration and guidance from the [NPR Apps](http://blog.apps.npr.org/) [app-template](https://github.com/nprapps/app-template).

### Directory Structure

- `css` - compiled .scss files for development
- `data` - Raw data used in the app, i.e. CSVs
- `js` - development versions of JS files
- `js\lib` - vendor/library JS files, i.e. underscore.js, backbone.js, etc.
- `sass` - .scss files
- `scripts` -  miscellaneous scripts used for data processing, etc.
- `views` - EJS templates
- `www` - The compiled app and associated files

### Install Dependencies
For asset management, templating, building, and testing, we use Node.js and [Grunt](http://www.gruntjs.com).

On OSX, you can use Homebrew to install Node: `$ brew install node`

There is also an install package for OSX and other systems available on the Node [website](http://nodejs.org/download/).

Install the [Grunt](https://github.com/gruntjs/grunt-cli) command line tool: `$ npm install -g grunt-cli`

Install project dependencies: `$ npm install`

### Developing/Running locally

In development, we use an [Express](http://expressjs.com/) server to serve files, compile SASS and templates. 

To run the server: `$ node server.js`

Then go to [http://0.0.0.0:3000](http://0.0.0.0:3000) in your browser.