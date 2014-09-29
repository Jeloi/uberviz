/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.TripMarkersView = Backbone.View.extend({

        template: JST['app/scripts/templates/TripMarkersView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function (options) {
            // this.listenTo(this.model, 'change', this.render);
            var self = this;

            self.model = options.model;
            self.model.on('remove', self.remove, self);

            self.map = options.map;

            var startLocation = self.model.get("start_location");
            var endLocation = self.model.get("end_location");

            self.startMarker = new google.maps.Marker({
                map: self.map,
                position: new google.maps.LatLng(startLocation.latitude, startLocation.longitude),
                // animation: google.maps.Animation.DROP,
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

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
