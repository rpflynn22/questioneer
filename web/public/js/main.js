/**
 *  main.js
 *
 *  Entry-point into the app, dependencies branch from this main file.
 */


// Dependencies
var Backbone = require("backbone"),
    $ = require("jquery");

var App = require('./App.js'),
    Router = require('./Router.js');


$(function onLoad() {
    var app = new App();
    var router = new Router(app);

    app.router = router;
    window.app = app;

    Backbone.history.start();

    app.init();
});
