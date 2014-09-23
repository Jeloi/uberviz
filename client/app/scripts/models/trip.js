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
            this.set("display_start", moment.unix(this.get("start_time")).format("dddd, MMMM Do YYYY, h:mm a"));
            this.set("display_end", moment.unix(this.get("end_time")).format("dddd, MMMM Do YYYY, h:mm a"));
            

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
        }
    });

})();
