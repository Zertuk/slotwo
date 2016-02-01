(function() {
    'use strict';

    angular
        .module('app.statistics')
        .service('statisticsService', statisticsService);

    statisticsService.$inject = ['$timeout'];

    /* @ngInject */
    function statisticsService($timeout) {
    	var stats = this;

    	stats.startFireBase = function(val) {
    		if (typeof stats.myFirebase === 'undefined') {
    			stats.myFirebase = new Firebase("https://slomega.firebaseio.com/");
    		}
    		else {
    			Firebase.goOnline();
    		}
    		stats.readData(val);
    	}

    	stats.readData = function(val) {
    		stats.myFirebase.child(val).once('value', function(snapshot) {
    			var data = snapshot.val();
    			function delayFirebase(val, data) {
    				stats.setData(val, data);
    			}
    			$timeout(function() {
    				delayFirebase(val, data);
    			}, 1000);
    		})
    	}

    	stats.setData = function(val, data) {
    		var ref = stats.myFirebase.child(val);
    		var updated = data + 1;
    		ref.set(updated);
    		Firebase.goOffline();
    	}

    }
})();