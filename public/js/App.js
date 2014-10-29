/**
 *
 */

var $ = require("jquery")(window),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;

var App = function () {
    // App constructor
};

App.prototype.init = function init() {
    console.log("App initialized.");
};

module.exports = App;