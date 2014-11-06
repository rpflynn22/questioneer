/**
 *  App router
 */
var Backbone = require("backbone");

var FrameView = require("./views/FrameView.js"),
    HomeView = require('./views/HomeView.js');

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "default",
        "posts": "posts"
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
    },

    posts: function () {
        this.frame.render();

        var home = new HomeView();

        home.render($('#posts'));
    }

});

module.exports = AppRouter;