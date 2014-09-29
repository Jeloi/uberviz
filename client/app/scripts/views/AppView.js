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

        events: {},

        initialize: function () {
            var self = this;

            // this.listenTo(this.model, 'change', this.render);

            // Initialize map
            self.render();
            self._initialize_map();


            // Create Views
            // var mapView = new App.MapView({model: tripCollection, map: self.map});
            // var tripListView = new App.TripListView({model: tripCollection, map: self.map});

            
        },

        render: function () {
            this.$el.html(this.template());
            console.log("rendering appview");
        },

        _initialize_map : function() {
          var center = new google.maps.LatLng(40.737273,-73.996267);
          var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}];

          var mapOptions = {
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              center: center,
              styles: styles
          };
          this.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        }

    });

})();
