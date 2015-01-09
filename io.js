var socketio = require('socket.io')();
var passportSocketIo = require('passport.socketio');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');

socketio.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key:         'cebutindahan',
  secret:      'letsgocebu2015',
  store:       new redisStore(),
  success:     onAuthorizeSuccess,
  fail:        onAuthorizeFail,
}));

socketio.on('connection', function(socket){
  console.log('socket connected!');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    socketio.emit('chat message', msg, setUserinfo(socket.request.user));
  });

  socket.on('subscribe', function(data) {
    console.log('someone joined the room!', data);
    var user = setUserinfo(socket.request.user);
    if (is_user_in('/', data.room, user.id) === false) {
      socket.user = user;
      socket.join(data.room);

      // console.log("roster baby!", get_rosters_room('/', data.room) );
      socketio.sockets.in(data.room).emit('new joiner', user);
    }
  });

  socket.on('unsubscribe', function(data) { socket.leave(data.room); });

  socket.on('room transmiter', function(data) {
    console.log('sending message', data);
    data.user = setUserinfo(socket.request.user);
    socketio.sockets.in(data.room).emit('room reciever', data);
  });

  socket.on('get rosters', function(room){
    var users = get_rosters_room('/', room);
    socketio.sockets.in(room).emit('roster reciever', users);
  });



});

function onAuthorizeSuccess(data, accept){
  console.log('Authorization granted!');
  accept();
}

function onAuthorizeFail(data, message, error, accept){

  if(error)
    console.log('Not Authorized!');
    accept(new Error(message));
  // this error will be sent to the user as a special error-package
  // see: http://socket.io/docs/client-api/#socket > error-object
}

function setUserinfo(user){
  filteredUser = {};
  switch(user.primary){
    case 'facebook':
      filteredUser = user.facebook;
      break;
    case 'twitter':
      filteredUser = user.twitter;
      break;
    case 'google':
      filteredUser = user.google;
      break;
    default:
      filteredUser = {};
      break;
  }
  return filteredUser;
}

function get_rosters_room(nsp, room) {
  var users = [];
  for (var id in socketio.of(nsp).adapter.rooms[room]) {
    users.push(socketio.of(nsp).adapter.nsp.connected[id].user);
  }
  return users;
}

function is_user_in(nsp, room, id){
  var users = get_rosters_room(nsp,room);
  var flag = false;
  users.forEach(function(user) {
    console.log("user", user.id, id);
    // if (user.id == id){ flag = true;}

  });
  return flag;
}

// setInterval(function(){
//     console.log('room changed!');
//     socketio.sockets.in('global').emit('roomChanged', { chicken: 'tasty' });
// }, 1000);

module.exports = socketio;