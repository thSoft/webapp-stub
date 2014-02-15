module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var typescriptFiles = [ "scripts/**/*.ts", "typings/**/*.ts" ];
	var lessFiles = [ "stylesheets/**/*.less" ];
	var buildFolder = "build/";
	var concatenatedDependencies = buildFolder + "bower_components.js";

	grunt.initConfig({
		watch : {
			typescript : {
				files : typescriptFiles,
				tasks : [ "typescript" ]
			},
			less : {
				files : lessFiles,
				tasks : [ "less" ]
			},
			bower_concat : {
				files : [ "bower.json" ],
				tasks : [ "bower_concat", "uglify" ]
			}
		},
		typescript : {
			build : {
				src : typescriptFiles,
				dest : buildFolder + "scripts.js"
			}
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

	grunt.registerTask("default", [ "open", "watch" ]);

};