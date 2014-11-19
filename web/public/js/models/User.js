/**
 *
 */

var Backbone = require("backbone"),
    _ = require("underscore");

var User = Backbone.Model.extend({

    defaults: {
        id: "",
        email: "",
        name: "",
        rippleAddress: "",
        dateCreated: 0,
        about: "",
        xrp: 0
    },

    url: function () {
        return "/api/users/" + this.get("id");
    },

    initialize: function () {
        console.log("User created: " + arguments);
    }

});

module.exports = User;
