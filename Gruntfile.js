module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var mainFolder = "main/";
	var testFolder = "test/";

	var sourceFolder = "src/";
	var sourceMainFolder = sourceFolder + mainFolder;
	var scripts = [ sourceMainFolder + "scripts/**/*.ts", "typings/**/*.ts" ];
	var stylesheets = [ sourceMainFolder + "stylesheets/**/*.less" ];
	var siteFolder = sourceMainFolder + "site/";
	var pages = "**/*.html";
	var sourceTestFolder = sourceFolder + testFolder;
	var tests = [ sourceTestFolder + "**/*.ts" ];

	var targetFolder = "target/";
	var targetMainFolder = targetFolder + "main/";
	var compiledDependenciesBasename = "bower_components.js"
	var compiledDependencies = targetMainFolder + compiledDependenciesBasename;
	var compiledScriptsBasename = "scripts.js";
	var compiledScripts = targetMainFolder + compiledScriptsBasename;
	var compiledStylesheetsBasename = "stylesheets.css";
	var compiledStylesheets = targetMainFolder + compiledStylesheetsBasename;
	var compiledMainPage = targetMainFolder + "index.html";
	var targetTestFolder = targetFolder + testFolder;
	var compiledTests = targetTestFolder + "tests.js";

	grunt.initConfig({
		watch : {
			bower_concat : {
				files : [ "bower.json" ],
				tasks : [ "bower_concat", "uglify" ]
			},
			typescript : {
				files : scripts,
				tasks : [ "typescript:scripts" ]
			},
			less : {
				files : stylesheets,
				tasks : [ "less" ]
			},
			site : {
				files : siteFolder + pages,
				tasks : [ "clean", "copy", "dom_munger" ]
			},
			typescriptTests : {
				files : tests,
				tasks : [ "typescript:tests" ]
			},
			test : {
				files : scripts.concat(tests),
				tasks : [ "jasmine" ]
			}
		},
		typescript : {
			scripts : {
				src : scripts,
				dest : compiledScripts
			},
			tests : {
				src : tests,
				dest : compiledTests
			}
		},
		less : {
			build : {
				src : stylesheets,
				dest : compiledStylesheets
			}
		},
		bower_concat : {
			build : {
				dest : compiledDependencies,
				mainFiles : {
					"jasmine" : "lib/jasmine-core/jasmine.js"
				}
			}
		},
		uglify : {
			build : {
				src : compiledDependencies,
				dest : compiledDependencies
			}
		},
		clean : {
			build : targetMainFolder + pages
		},
		copy : {
			build : {
				expand : true,
				cwd : siteFolder,
				src : pages,
				dest : targetMainFolder
			}
		},
		dom_munger : {
			build : {
				src : compiledMainPage,
				dest : compiledMainPage,
				options : {
					append : {
						selector : "head",
						html :
							'<script src="' + compiledDependenciesBasename + '" type="text/javascript"></script>' +
							'<script src="' + compiledScriptsBasename + '" type="text/javascript"></script>' +
							'<link rel="stylesheet" href="' + compiledStylesheetsBasename + '" type="text/css" />'
					}
				}
			}
		},
		jasmine : {
			test : {
				src : [ compiledScripts, compiledDependencies ],
				options : {
					specs : compiledTests,
					force : true
				}
			}
		},
		open : {
			build : {
				path : compiledMainPage
			}
		}
	});

	grunt.registerTask("default", [ "watch" ]);

};