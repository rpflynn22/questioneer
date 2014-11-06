/**
 *  HomeView
 *
 *  Shows all of the most recent posts.
 */

var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore");

var template = require("../../templates/Home.html");

var HomeView = Backbone.View.extend({

    template: _.template(template),

    initialize: function () {
        console.log("Initialized HomeView");
    },

    render: function ($elem) {
        if ($elem) {
            $elem.html(this.template());
        } else {
            this.$el.html(this.template());
        }


        return this;
    }
});

module.exports = HomeView;