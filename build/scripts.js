var app = angular.module("helloApplication", []);

app.controller("helloController", function ($scope) {
    $scope.name = "World";
});

app.directive("helloDirective", function () {
    return {
        template: "Hello, <span class='name'>{{name}}<span>!"
    };
});
