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
    tripCollection = new Uberviz.Collections.TripCollection(demoHistory["history"], {parse: true});

    console.log(tripCollection.models[0].attributes);

    var appView = new Uberviz.Views.AppView();

});
