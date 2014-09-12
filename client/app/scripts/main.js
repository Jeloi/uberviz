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

    // var history = new Uberviz.Collections.TripHistory();
    // history.url = "files/demo.json";
    // console.log(history.url);

    // history.fetch();

    // console.log(history["count"]);

    // console.log(demoHistory);
    console.log(demoHistory["history"]);
    tripHistory = new Uberviz.Collections.TripHistory(demoHistory["history"]);

    console.log(tripHistory.models[0].attributes);



    // $.get('/files/demo.json', function(data) {
    //     demoHistory = data;
    //     console.log(demoHistory["count"]);
    // });
    
});
