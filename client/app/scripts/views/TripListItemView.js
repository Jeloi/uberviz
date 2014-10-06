/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.TripListItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/TripListItemView.ejs'],

        tagName: 'li',

        id: '',

        container: '#trip-list',

        className: 'list-item',

        events: {
            'click': 'triggerFocus'
        },

        initialize: function (options) {
            var self = this;

            this.listenTo(this.model, 'change', this.render);
            this.model = options.model;

            this.model.on('focus', self.focus, self);
            this.model.on('unfocus', self.unfocus, self);
            this.render();
        },

        render: function () {
            var data = this.model.toJSON();
            // Could modifity data here w/ functions/attributes if wanted to
            data.display_time = moment.unix(data.start_time).format("h:mm a")
            data.display_date = moment.unix(data.start_time).format("dddd, MMMM Do YYYY")
            this.$el.html(this.template(data));
            $(this.container).append(this.el);
            return this;
        },

        // Trigger the focus event on the trip model, which will handle the focus toggling/action
        triggerFocus: function() {
            this.model.triggerFocus();
        },

        // Focus action for Trip List Item View
        focus: function() {
            this.$el.addClass('list-item--focused')
        },

        // Unfocus action for Trip List Item View
        unfocus: function() {
            this.$el.removeClass('list-item--focused')
        },

        doSomething: function() {
            console.log("clicked trip list item");
            this.model.trigger('show'); // Change this to focus
        }



    });

})();
