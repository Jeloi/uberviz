/*global Uberviz, Backbone*/

Uberviz.Models = Uberviz.Models || {};

(function () {
    'use strict';

    Uberviz.Models.Trip = Backbone.Model.extend({

        url: '',

        initialize: function() {
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
