# AxisPhilly App Template

This template helps make simple apps (like [Changes in Crime by Neighborhood](http://apps.axisphilly.org/crime-change/) and [A License to Blight](http://apps.axisphilly.org/license-to-blight/)) by baking out [EJS](https://github.com/visionmedia/ejs) templates into HTML, compiling [SASS](http://sass-lang.com/) to CSS, and linting, concatenating, and minifying (but not obfuscating!) JS.

We got a lot of inspiration and guidance from the [NPR Apps](http://blog.apps.npr.org/) [app-template](https://github.com/nprapps/app-template).

### Directory Structure

- `css` - compiled .scss files for development
- `data` - Raw data, i.e. CSVs
- `js` - development versions of JS files
- `js\lib` - vendor/library JS files, i.e. underscore.js, backbone.js, etc.
- `sass` - .scss files
- `scripts` -  miscellaneous scripts used for data processing, etc.
- `views` - EJS templates
- `www`, `www\css`, `www\js` - The compiled app and associated assets
- `www\data` - Processed data (i.e. JSON) for the app. 

### Install Dependencies
For asset management, static view compiling, and building, we use Node.js and [Grunt](http://www.gruntjs.com).

On OSX, you can use Homebrew to install Node: `$ brew install node`

There is also an install package for OSX and other systems available on the Node [website](http://nodejs.org/download/).

Install the [Grunt](https://github.com/gruntjs/grunt-cli) command line tool: `$ npm install -g grunt-cli`

Install project dependencies: `$ npm install`

### Developing/Running locally

In development, we use an [Express](http://expressjs.com/) server to serve files, compile SASS and render views. 

To run the server: `$ node server.js`

Then go to [http://0.0.0.0:3000](http://0.0.0.0:3000) in your browser.

### Add a new page

Adding a new page to the app is as simple as adding a route to the Express server and assigning it a view.

- Add a new route to Express. At the very least, you have to pass the environment variable to the view. For example:

        app.get('/route-name', function(req, res){
          res.render('view-name', {
            env: app.settings.env
          });
        });

- Then, create a new view in the `view` folder. The view name is the first parameter of the `res.render` method. The view can just be an `html` file, or it can use EJS templating to be more dynamic. Just make sure you pass the EJS variables to the route; which is the second parameter of the `res.render` method.

### Building a project

To lint, concatenate, and minify JS files, bake-out the EJS templates into HTML, and compile SASS to CSS for production, run:

    $ grunt build

The only manual step is to make sure any data needed for the app is placed in `www\data`. Ideally, any data processing scripts should save output here.

The grunt commands can also be run independently:

- Lint JS files: `$ grunt jshint`
- Concatenate and minify JS files: `$ grunt uglify`
- Compile SASS to CSS: `$ grunt sass`
- Bake-out template files: `$ grunt shell`

### Deploying

Deploying is a manual task at the moment. Upload the `www` directory to your server, AWS S3, etc.
