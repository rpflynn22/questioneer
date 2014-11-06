/**
 *  App router
 */
var Backbone = require("backbone");

var FrameView = require("./views/FrameView.js");

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "default"
    },

    initialize: function (app) {
        console.log("Router initialized.");

        this.app = app;

        this.frame = new FrameView({
            el: app.root
        });
    },

    default: function () {
        this.frame.render();
    }

});

module.exports = AppRouter;