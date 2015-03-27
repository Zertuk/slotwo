'use strict';

/**
 * @ngdoc function
 * @name slotwoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotwoApp
 */
angular.module('slotwoApp')
  .controller('MainCtrl', function ($scope, $interval) {
  	$scope.rotate = false;
  	$scope.player = {
  		"armor": 0,
  		"health": 100,
  		"damage": 5,
  		"cash": 0
  	}

  	function update()  {
  		$scope.player.cash = $scope.player.cash + 1;
      if ($scope.rotate == true) {
        $scope.ascii.house = $scope.ascii.house2;
        $scope.rotate = false;
      }
      else {
        $scope.ascii.house = $scope.ascii.house1;
        $scope.rotate = true;
      }
  	}
  	$interval(update, 1000);



  	console.log($scope.player)

  	$scope.ascii = {};

    $scope.ascii.house = $scope.ascii.house1;

  	$scope.ascii.house1 = "                           (   )     )                     \r\n                                                           \r\n                                                           \r\n                          (     )                          \r\n                             )                   \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n"
    $scope.ascii.house2 = "                        (   )     \n                          \r\n                         (                                 \r\n                          (  )                             \r\n                               )                 \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n";
  });

