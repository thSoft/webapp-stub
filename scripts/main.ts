var app = angular.module("helloApplication", []);

app.controller("helloController", ($scope: Greeting) => {
    $scope.name = "World";
});

app.directive("helloDirective", () => {
    return {
        template: "Hello, <span class='name'>{{name}}<span>!"
    };
});

interface Greeting {
    name: string;
}