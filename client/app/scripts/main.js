/*global App, $*/


window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};


$(document).ready(function () {
    // 'use strict';
    App.init();
    // Variables
    App.Variables = {
        focusedTrip: null
    }
    // UI toggles
    App.Toggles = {
        zoomTrip: true
    }

    // TripCollection Object
    tripCollection = new App.Collections.TripCollection(demoHistory["history"], {parse: true});

    // Views
    appView = new App.Views.AppView();
    tripView = new App.Views.TripInfoView();

    tripCollection.generateTripViews();
    $('.trip-info').append(tripView.render().el)



});
