/**
 *
 */

var Backbone = require("backbone"),
    _ = require("underscore");

var Category = Backbone.Model.extend({

    defaults: {
        name: ""
    },

    url: "/api/categories",

    initialize: function () {
        console.log("Category created: " + arguments);
    }

});

module.exports = Category;
