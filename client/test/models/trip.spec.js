/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('Trip Model', function () {

    beforeEach(function () {
        this.TripModel = new App.Models.Trip();
    });

    it('do things', function() {
    	expect(1).to.equal(1);
    });

    it('should make things work ', function() {
    	expect(1).to.equal(2);
    });

});
