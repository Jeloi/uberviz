/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.AppView = Backbone.View.extend({

        el: "#app-view",

        template: JST['app/scripts/templates/AppView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .chart-button': 'toggleChart'
        },

        initialize: function () {
            var self = this;

            // Initialize map
            self.render();
            self._initialize_map();
        },

        render: function () {
            this.$el.html(this.template());
        },

        _initialize_map : function() {
          var center = new google.maps.LatLng(40.737273,-73.996267);
          var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}];

          var mapOptions = {
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              center: center,
              disableDefaultUI: true,
              styles: styles
          };

          // Create map with mapOptions
          this.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

          // Save the direction service and display onto the map
          this.map.directionsService = new google.maps.DirectionsService();
          this.map.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions:{strokeColor:'#3DCFFF', strokeWeight: '3', strokeOpacity: '1'}
          });
          this.map.directionsDisplay.setMap(this.map);
        },

        toggleChart: function() {
          $('#days-bar-chart').fadeToggle();
        }

    });

})();
