/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.HoursBarChartView = Backbone.View.extend({

        template: JST['app/scripts/templates/HoursBarChartView.ejs'],

        el: "#hours-bar-chart",

        initialize: function() {
          _.bindAll(this, "render");
          this.collection.on("change reset add remove", this.render, this);
        },

        render: function() {
          var data = this.collection.models;
          d3.select(this.$el.selector)
              .datum(data)
              .call(this.bar);
        },

    });

})();
