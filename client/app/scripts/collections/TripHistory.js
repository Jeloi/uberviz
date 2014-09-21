/*global Uberviz, Backbone*/

Uberviz.Collections = Uberviz.Collections || {};

(function () {
    'use strict';

    Uberviz.Collections.TripHistory = Backbone.Collection.extend({

        model: Uberviz.Models.Trip,

        url: '/history',

        parse: function(response) {
        	var results = _.map(response, function(trip, index) {
        		trip.id = index;  
        		return trip;
        	});
          return results;
        }

    });

})();
