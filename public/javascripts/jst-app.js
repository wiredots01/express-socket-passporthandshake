this.JST = {"home/index": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>this is the home page</p>';

}
return __p
},
"posts/show": function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>this is the show post asdf</p><dl><dt>Viewers</dt><dd ng-repeat="roster in rosters">- {{roster.name}}</dd></dl><ul><li ng-repeat="comment in comments"><img ng-src="{{comment.user.avatar}}"/>{{comment.content}}</li></ul><form action="#"><input id="m" autocomplete="off" ng-model="message.content"/><button type="button" ng-click="sendMessage()">Send</button></form>';

}
return __p
}};