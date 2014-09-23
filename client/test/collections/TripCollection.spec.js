/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('TripCollection Collection', function () {

    beforeEach(function () {
        this.tripCollection = new App.Collections.TripCollection();
    });

    it('should do something', function() {

    	expect(this.tripCollection.length).to.equal(0)
    });

});
