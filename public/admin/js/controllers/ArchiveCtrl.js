
EasyPress.controller('ArchiveController', ['$scope', function($scope) {

  console.log("In archive controller...");

  $scope.currentArchive = 'time-maschine';


  // Carusel
  $scope.myInterval = -1;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length;
    slides.push({
      image: '/images/' + "1.png",
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4]
    });
  };
  for (var j=0; j<4; j++) {
    $scope.addSlide();
  }

}]);
