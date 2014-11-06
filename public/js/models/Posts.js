/**
 *
 */

var Backbone = require("backbone"),
    _ = require("underscore");

var Post = require("./Post.js");

var Posts = Backbone.Collection.extend({
    model: Post,

    url: "/api/posts"


});

module.exports = Posts;