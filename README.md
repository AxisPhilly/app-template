# AxisPhilly App Template

### Directory Structure

- `css` - compiled .scss files for development
- `data` - Raw data used in the app, i.e. CSVs
- `js` - development versions of JS files
- `js\lib` - vendor/library JS files, i.e. underscore.js, backbone.js, etc.
- `sass` - .scss files
- `scripts` -  miscellaneous scripts used for data processing, etc.
- `views` - EJS templates
- `www` - The compiled app and associated files

### Dependencies
For asset management, templating, building, and testing, we use Node.js and [Grunt](http://www.gruntjs.com)

First, you need [Grunt](https://github.com/gruntjs/grunt-cli) command line tool:
`$ npm install -g grunt-cli`

Then, install the depencies:
`$ npm install`