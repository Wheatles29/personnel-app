var $ = require("jquery"),
  _ = require("underscore"),
  Backbone = require("backbone"),
  config = require("../config");

  "use strict";

  module.exports = Backbone.Collection.extend({
      settings: {
          limit: 15
      },
      initialize: function (models, options) {
          options = options || {};
          this.skip = 0;
      },
      url: function () {
          var params = {},
              url = config.apiHost + "/enlistments";
          if (this.skip) params.skip = this.skip;
          if (this.status) params.status = this.status;
          if (!_.isEmpty(params)) url += "?" + $.param(params);
          return url;
      },
      setFilter: function (key, val) {
          this[key] = val; // unsecure
          return this;
      },
      nextPage: function () {
          this.skip += this.settings.limit;
          return this;
      },
      resetPage: function() {
          this.skip = 0;
          return this;
      },
      parse: function (response, options) {
          this.more = parseInt(response.count, 10) > parseInt(response.skip, 10) + response.enlistments.length;
          return response.enlistments || [];
      }
  });
