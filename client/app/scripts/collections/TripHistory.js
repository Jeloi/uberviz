/*global Uberviz, Backbone*/

Uberviz.Collections = Uberviz.Collections || {};

(function () {
    'use strict';

    Uberviz.Collections.TripHistory = Backbone.Collection.extend({

        model: Uberviz.Models.Trip,

        url: '/history',

        parse: function(response) {
        	results = _map(response.results, function(trip, index) {
        		trip.id = trip.uuid;
        		return trip;
        	});
          return results;
        }

    });

})();
