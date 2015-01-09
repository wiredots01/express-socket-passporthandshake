'use strict';
var App;

App = angular.module("Cebutindahan", ["ngResource", "ngRoute"]);

App.config([
  "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when("/", {
      template: JST["home/index"](),
      controller: "MainCtrl"
    }).when("/:title", {
      template: JST["posts/show"](),
      controller: "PostShowCtrl"
    });
  }
]);
