'use strict'
App = angular.module "Cebutindahan", [
  "ngResource"
  "ngRoute"
]

App.config [ "$routeProvider", "$locationProvider", ( $routeProvider, $locationProvider ) ->
  $locationProvider.html5Mode true

  $routeProvider
  .when "/",
    template: JST["home/index"]()
    controller: "MainCtrl"
  .when "/:title",
    template: JST["posts/show"]()
    controller: "PostShowCtrl"
]

