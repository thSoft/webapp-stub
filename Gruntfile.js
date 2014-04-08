module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var typescriptFiles = [ "scripts/**/*.ts", "typings/**/*.ts" ];
	var testsFolder = "tests/";
	var typescriptTestFiles = [ testsFolder + "**/*.ts" ];
	var lessFiles = [ "stylesheets/**/*.less" ];
	var buildFolder = "build/";
	var concatenatedDependencies = buildFolder + "bower_components.js";

	grunt.initConfig({
		watch : {
			typescript : {
				files : typescriptFiles,
				tasks : [ "typescript:scripts" ]
			},
			typescriptTests : {
				files : typescriptTestFiles,
				tasks : [ "typescript:tests" ]
			},
			less : {
				files : lessFiles,
				tasks : [ "less" ]
			},
			bower_concat : {
				files : [ "bower.json" ],
				tasks : [ "bower_concat", "uglify" ]
			},
			qunit : {
				files : typescriptFiles.concat(typescriptTestFiles),
				tasks : [ "qunit" ]
			}
		},
		typescript : {
			scripts : {
				src : typescriptFiles,
				dest : buildFolder + "scripts.js"
			},
			tests : {
				src : typescriptTestFiles,
				dest : testsFolder + "tests.js"
			}
		},
		qunit: {
			all: ['tests/*.html']
		},
		less : {
			build : {
				src : lessFiles,
				dest : buildFolder + "stylesheets.css"
			}
		},
		bower_concat : {
			build : {
				dest : concatenatedDependencies
			}
		},
		uglify : {
			build : {
				src : concatenatedDependencies,
				dest : concatenatedDependencies
			}
		},
		open : {
			build : {
				path : "index.html"
			}
		}
	});

	grunt.registerTask("default", [ "watch" ]);

};