/**
 *
 */

var Backbone = require("backbone"),
    _ = require("underscore");

var Category = require("./Category.js");

var Categories = Backbone.Collection.extend({

    model: Category

});

module.exports = Categories;