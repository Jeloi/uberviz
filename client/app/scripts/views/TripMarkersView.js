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
            self.model.on('focus', self.show, self);

            self.map = options.map;

            var startLocation = self.model.get("start_location");
            var endLocation = self.model.get("end_location");

            self.startMarker = new google.maps.Marker({
                map: self.map,
                position: new google.maps.LatLng(startLocation.latitude, startLocation.longitude),
                // animation: google.maps.Animation.DROP,
                visible: false,
                icon : 'images/4.png',
                title: self.model.name,
                descr : self.model.get('descr'),
                id : self.model.get('company_id')
            });

            // self.endMarker = new google.maps.Marker({
            //     map: self.map,
            //     position: new google.maps.LatLng(endLocation.latitude, endLocation.longitude),
            // });

        },

        // Hide both start and end markers
        hide: function() {
            this.startMarker.setVisible(false);
            // this.endMarker.setVisible(false);
        },

        // Show both start and end markers
        show: function() {
            this.startMarker.setVisible(true);
            // this.endMarker.setVisible(true);
        }


    });

})();
