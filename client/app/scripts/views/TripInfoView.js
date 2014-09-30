/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.TripInfoView = Backbone.View.extend({

        template: JST['app/scripts/templates/TripInfoView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(appView, 'newFocus', this.render);
        },

        render: function () {
            var self = this;
            if (App.Variables.focusedTrip != null) {
                var data = App.Variables.focusedTrip.toJSON();
                data.time_start = moment.unix(data.start_time).format("h:mm A")
                data.time_end = moment.unix(data.end_time).format("h:mm A")
                data.start_date = moment.unix(data.start_time).format("MMMM Do YYYY");
                data.end_date = moment.unix(data.end_time).format("MMMM Do YYYY");
                // self.$el.parent().hide();
                self.$el.html(self.template(data));
                // self.$el.parent().show();
                // Animate
                self.$el.parent().addClass('animated fadeIn');
                //wait for animation to finish before removing classes
                window.setTimeout( function(){
                    self.$el.parent().removeClass('animated fadeIn');
                }, 300);
            }
            return self;
        }

    });

})();
