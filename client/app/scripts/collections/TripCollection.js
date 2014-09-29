/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.TripCollection = Backbone.Collection.extend({

        model: App.Models.Trip,

        // url: '/history',

        initialize: function(options) {
            this.on('add', function(trip) {
                console.log("added one!")                
            });
        },

        parse: function(response) {
        	var results = _.map(response, function(trip, index) {
        		trip.id = index;  
        		return trip;
        	});
          return results;
        },

        processModels: function() {
            console.log(this);
            var i = 0;
            _.each(this.models, function(trip) {
                var marker = new App.Views.TripMarkersView({model: trip, map: appView.map})
            });
        }

    });

})();
