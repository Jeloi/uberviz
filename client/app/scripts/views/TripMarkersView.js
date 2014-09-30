/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.TripMarkersView = Backbone.View.extend({

        id: '',

        className: '',

        events: {},

        initialize: function (options) {
            // this.listenTo(this.model, 'change', this.render);
            var self = this;

            // Set model on self
            self.model = options.model;
            // Set this view on model
            self.model.tripMarkerView = self;

            // Hide the Marker when the model is hidden
            self.model.on('unfocus', self.hide, self);
            self.model.on('focus', self.focus, self);

            self.map = options.map;

            var startLocation = self.model.get("start_location");
            var endLocation = self.model.get("end_location");

            self.startMarker = new RichMarker({
                                position: new google.maps.LatLng(startLocation.latitude, startLocation.longitude),
                                map: self.map,
                                content: '<div class="pin pin--start"></div>',
                                visible: false
                            });

            self.endMarker = new RichMarker({
                                position: new google.maps.LatLng(endLocation.latitude, endLocation.longitude),
                                map: self.map,
                                content: '<div class="pin pin--end"></div>',
                                visible: false
                            });
            self.endMarker.setShadow("");
            self.startMarker.setShadow("");

        },

        focus: function() {
            var self  = this;
            // Focus styling and animation for markers
            self.startMarker.setContent('<div class="focused-pin-wrapper"><div class="pin pin--start pin--focused"></div><div class="pulse-ring pulse-ring--start"></div></div>');
            self.endMarker.setContent('<div class="focused-pin-wrapper"><div class="pin pin--end pin--focused"></div><div class="pulse-ring pulse-ring--end"></div></div>');
            // Call show to show the markers
            self.show();
            // Zoom the trip by fitting the view to its bounds
            if (App.Toggles.zoomTrip) {
                //  Create a new viewpoint bound
                var bounds = new google.maps.LatLngBounds ();
                bounds.extend(self.startMarker.position)
                bounds.extend(self.endMarker.position)
                self.map.fitBounds (bounds);
            };
            // Use Google Direction Services to get route
            var request = {
                origin: self.startMarker.position,
                destination: self.endMarker.position,
                travelMode: google.maps.TravelMode.DRIVING
            };
            self.map.directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                self.map.directionsDisplay.setDirections(response);
              }
            });

        },

        unfocus: function() {
            var self = this;
            self.startMarker.setContent('<div class="pin pin--start"></div>');
            self.endMarker.setContent('<div class="pin pin--end"></div>');
            self.hide();
        },

        // Hide both start and end markers
        hide: function() {
            this.startMarker.setVisible(false);
            this.endMarker.setVisible(false);
        },

        // Show both start and end markers
        show: function() {
            this.startMarker.setVisible(true);
            this.endMarker.setVisible(true);
        }


    });

})();
