/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Trip = Backbone.Model.extend({

        url: '',

        initialize: function() {
            // Add human-readable and D3 attributes to each trip
            this.set("day", moment.unix(this.get("start_time")).format("dddd"));
            this.set("hour", moment.unix(this.get("start_time")).format("H"));
            this.set("distance", Math.round(this.get("distance") * 100) / 100);
            this.set("start_address", this.shortAddress(this.get("start_location")));
            this.set("end_address", this.shortAddress(this.get("end_location")));

            this.on('selected', function(msg) {
                alert("Trip #"+this.id)
                /* Act on the event */
            });
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        // If this isn't the currently focused trip, unfocus that one and focus this one
        triggerFocus: function() {
            var self = this;
            if (App.Variables.focusedTrip != self) {
                if (App.Variables.focusedTrip != null) {
                    App.Variables.focusedTrip.trigger('unfocus');
                };
                App.Variables.focusedTrip = self;
                self.trigger('focus');
            }
            appView.trigger('newFocus'); // Let appView know there's a new focused trip
        },

        // Slice the ', United States' off the end of an address from a location obj
        shortAddress: function(location_obj) {
            var i = location_obj.address.match(/, United States/).index;
            return location_obj.address.slice(0,i);
        }

    });

})();
