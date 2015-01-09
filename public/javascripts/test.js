// var socket = io();
// $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg, user){
//     console.log(user);
//     var avatar = '<img src="'+user.avatar+'" width="100" height="100">';
//     $('#messages').append('<li>'+avatar+ user.name +': '+msg+'</li>');

//   });


// socket.emit("subscribe", { room: "global" });

// socket.on("roomChanged", function(data) {
//   console.log("roomChanged", data);
// });