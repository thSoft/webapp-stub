module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var mainFolder = "main/";
	var testFolder = "test/";

	var sourceFolder = "src/";
	var sourceMainFolder = sourceFolder + mainFolder;
	var scripts = [ sourceMainFolder + "scripts/**/*.ts", "typings/**/*.ts" ];
	var stylesheets = [ sourceMainFolder + "stylesheets/**/*.less" ];
	var siteBasename = "index.html";
	var site = sourceMainFolder + siteBasename;
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
	var compiledSite = targetMainFolder + siteBasename;
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
				files : site,
				tasks : [ "dom_munger" ]
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
		dom_munger : {
			build : {
				src : site,
				dest : compiledSite,
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
				path : compiledSite
			}
		}
	});

	grunt.registerTask("default", [ "watch" ]);

};