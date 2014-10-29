/**
 *  App router
 */
var Backbone = require("backbone");

var AppRouter = Backbone.Router.extend({

    paths: {
        "": "default"
    },

    default: function () {
        // Default route
    }

});

module.exports = AppRouter;