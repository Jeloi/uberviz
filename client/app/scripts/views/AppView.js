/*global Uberviz, Backbone, JST*/

Uberviz.Views = Uberviz.Views || {};

(function () {
    'use strict';

    Uberviz.Views.AppView = Backbone.View.extend({

        el: "#AppView",

        template: JST['app/scripts/templates/AppView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            var self = this;

            // this.listenTo(this.model, 'change', this.render);

            // initialize map
            self._initialize_map();
        },

        render: function () {
            this.$el.html(this.template());
        },

        _initialize_map : function() {
          var center = new google.maps.LatLng(41.63, -1);
          var styles = [
            {
              elementType: "geometry",
              stylers: [
                { lightness: 33 },
                { saturation: -90 }
              ]
            }
          ];

          var mapOptions = {
              zoom: 9,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              center: center,
              styles: styles
          };
          this.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        }

    });

})();
