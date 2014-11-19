/**
 *
 */

var Backbone = require("backbone"),
    _ = require("underscore");

var Post = Backbone.Model.extend({

    defaults: {
        id: "",
        isQuestion: false,
        content: "",
        // User _id
        user: "",
        xrp: 0,
        dateCreated: 0
    },

    url: function () {
        return "/api/posts/" + this.get("id")
    }

});

module.exports = Post;