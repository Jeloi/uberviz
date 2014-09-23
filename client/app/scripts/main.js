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

    // TripCollection Object
    tripCollection = new App.Collections.TripCollection(demoHistory["history"], {parse: true});

    // Views
    var appView = new App.Views.AppView();
    var tripCollectionView = new App.Trip

});
