module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var typeScriptFiles = [ "scripts/**/*.ts", "typings/**/*.ts" ];
	var testsFolder = "tests/";
	var typeScriptTestFiles = [ testsFolder + "**/*.ts" ];
	var lessFiles = [ "stylesheets/**/*.less" ];
	var buildFolder = "build/";
	var concatenatedDependencies = buildFolder + "bower_components.js";

	grunt.initConfig({
		watch : {
			typescript : {
				files : typeScriptFiles,
				tasks : [ "typescript:scripts" ]
			},
			typescriptTests : {
				files : typeScriptTestFiles,
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
				files : typeScriptFiles.concat(typeScriptTestFiles),
				tasks : [ "qunit" ]
			}
		},
		typescript : {
			scripts : {
				src : typeScriptFiles,
				dest : buildFolder + "scripts.js"
			},
			tests : {
				src : typeScriptTestFiles,
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