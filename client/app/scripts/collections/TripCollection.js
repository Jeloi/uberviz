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

        // Trips are sorted by their time
        comparator: function(trip) {
          return trip.get('start_time');
        },

        // Sets the id attribute on each trip when parsed (redundant, just an exercise)
        parse: function(response) {
        	var results = _.map(response, function(trip, index) {
        		trip.id = index;  
        		return trip;
        	});
          return results;
        },

        // For each trip, create a marker view that references that trip
        generateTripViews: function() {
            console.log(this);
            var i = 0;
            _.each(this.models, function(trip) {
                var marker = new App.Views.TripMarkersView({model: trip, map: appView.map})
            });
        }

    });

})();
