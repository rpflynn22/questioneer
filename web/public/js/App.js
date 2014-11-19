/**
 *
 */

var $ = require("jquery"),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;
window.$ = $;

// Load dependencies
var FrameView = require("./views/FrameView.js");

var App = function () {
    // App constructor
    this.root = '#questioneer';
};

App.prototype.init = function init() {
    console.log("App initialized!");
};

module.exports = App;