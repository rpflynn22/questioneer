/**
 *  FrameView
 *
 *  Parent frame for all of the views.
 */

var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore");

var template = require("../../templates/Frame.html");

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