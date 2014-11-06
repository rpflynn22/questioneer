/**
 *  PostsView
 *
 *  Renders a bunch of PostViews based on the Collection of Posts
 *
 */

var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore");

var template = require("../../templates/Post.html");

var PostsView = Backbone.View.extend({

    template: _.template(template),

    intialize: function () {
        console.log("PostView initialized");
    },

    render: function () {
        this.$el.html(this.template(this.model ? this.model.toJSON() || {}));

        return this;
    }

});

module.exports = PostsView;

