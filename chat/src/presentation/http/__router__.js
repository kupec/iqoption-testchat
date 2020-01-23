const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    fs.readdirSync(__dirname)
        .filter(fileName => !fileName.match(/__(.*)__\.js/))
        .filter(fileName => fileName.match(/(.*HttpController)\.js$/))
        .map(fileName => require(path.join(__dirname, fileName)))
        .forEach(route => app.use('/' + route.path, route.router));
};
