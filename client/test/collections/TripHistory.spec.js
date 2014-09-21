/*global beforeEach, describe, it, assert, expect  */
'use strict';

describe('TripHistory Collection', function () {

    beforeEach(function () {
        this.TripHistoryCollection = new Uberviz.Collections.TripHistory();
    });

    it('should do something', function() {

    	expect(this.TripHistoryCollection.length).to.equal(0)
    });

});
