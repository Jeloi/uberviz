/*global Uberviz, $*/


window.Uberviz = {
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
    Uberviz.init();

    console.log(demoHistory["history"]);
    tripHistory = new Uberviz.Collections.TripHistory(demoHistory["history"], {parse: true});

    console.log(tripHistory.models[0].attributes);

    var appView = new Uberviz.Views.AppView();

});
