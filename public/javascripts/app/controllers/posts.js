App.controller('PostShowCtrl', [
  '$scope', '$routeParams', 'socket', function($scope, $routeParams, socket) {
    var roomName, subscribe;
    console.log('tae ka', roomName = $routeParams.title);
    $scope.comments = [];
    $scope.rosters = [];
    $scope.message = {
      content: '',
      user: 1,
      room: roomName
    };
    subscribe = function() {
      return socket.emit('subscribe', {
        room: roomName
      });
    };
    socket.on('room reciever', function(data) {
      $scope.comments.push(data);
    });
    socket.on('roster reciever', function(data) {
      return $scope.rosters = data;
    });
    socket.on('new joiner', function(data) {
      return $scope.rosters.push(data);
    });
    $scope.sendMessage = function() {
      console.log("send na ang message");
      return socket.emit('room transmiter', $scope.message);
    };
    subscribe();
    return socket.emit('get rosters', roomName);
  }
]);
