/**
 *  HomeView
 *
 *  Shows all of the most recent posts.
 */

var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore");

var template = require("../../templates/Home.html");

var FrameView = Backbone.View.extend({

    template: _.template(template),

    initialize: function () {
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    }
});

module.exports = FrameView;