/**
 *  PostView
 *
 *  Renders a single Post.
 */

var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore");

var template = require("../../templates/Post.html");

var PostView = Backbone.View.extend({

    template: _.template(template),

    intialize: function () {
        console.log("PostView initialized");
    },

    render: function () {
        this.$el.html(this.template(this.model ? this.model.toJSON() || {}));

        return this;
    }

});

module.exports = PostView;
