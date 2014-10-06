/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.DaysBarChartView = Backbone.View.extend({

        template: JST['app/scripts/templates/DaysBarChartView.ejs'],

        el: "#days-bar-chart",

        initialize: function() {
          _.bindAll(this, "render");
          this.collection.on("change reset add remove", this.render, this);
          this.bar = charts.bar();
          this.render();
        },

        render: function() {
          var data = this.collection.models;
          console.log(data);
          d3.select(this.$el.selector)
              .datum(data)
              .call(this.bar);
        },

    });

})();
