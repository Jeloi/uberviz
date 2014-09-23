/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.TripCollection = Backbone.Collection.extend({

        model: App.Models.Trip,

        // url: '/history',

        parse: function(response) {
        	var results = _.map(response, function(trip, index) {
        		trip.id = index;  
        		return trip;
        	});
          return results;
        }

    });

})();
