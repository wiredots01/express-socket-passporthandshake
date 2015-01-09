App.controller 'PostShowCtrl', [ '$scope', '$routeParams', 'socket', ($scope, $routeParams, socket) ->
  console.log 'tae ka',
  roomName = $routeParams.title
  $scope.comments = []

  $scope.rosters = []
  $scope.message =
    content: ''
    user: 1
    room: roomName
  subscribe = ->
    socket.emit 'subscribe', {room: roomName}

  socket.on 'room reciever', (data) ->
    $scope.comments.push data
    return

  socket.on 'roster reciever', (data) ->
    $scope.rosters = data

  socket.on 'new joiner', (data) ->
    $scope.rosters.push data

  $scope.sendMessage = ->
    console.log "send na ang message"
    socket.emit 'room transmiter', $scope.message

  subscribe()
  socket.emit 'get rosters', roomName

]