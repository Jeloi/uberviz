/*global App, $*/

window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Uberviz app lets go!');
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
    barChartView = new App.Views.DaysBarChartView({collection: tripCollection});
    $('.trip-info').append(tripView.render().el)
    tripCollection.generateTripViews();



});