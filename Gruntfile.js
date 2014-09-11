module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var mainFolder = "main/";
	var testFolder = "test/";

	var sourceFolder = "src/";
	var sourceMainFolder = sourceFolder + mainFolder;
	var mainScripts = [ sourceMainFolder + "**/*.ts", "typings/**/*.ts" ];
	var sourceSiteFolder = sourceFolder + "site/";
	var siteScripts = [ sourceSiteFolder + "**/*.ts" ];
	var stylesheets = [ sourceSiteFolder + "**/*.less" ];
	var siteBasename = "index.html";
	var site = sourceSiteFolder + siteBasename;
	var sourceTestFolder = sourceFolder + testFolder;
	var testScripts = [ sourceTestFolder + "**/*.ts" ];

	var targetFolder = "target/";
	var targetMainFolder = targetFolder + "main/";
	var targetSiteFolder = targetFolder + "site/";
	var compiledDependenciesBasename = "bower_components.js"
	var compiledDependencies = targetSiteFolder + compiledDependenciesBasename;
	var compiledScriptsBasename = "scripts.js";
	var compiledMainScripts = targetMainFolder + compiledScriptsBasename;
	var compiledSiteScripts = targetSiteFolder + compiledScriptsBasename;
	var compiledStylesheetsBasename = "stylesheets.css";
	var compiledStylesheets = targetSiteFolder + compiledStylesheetsBasename;
	var compiledSite = targetSiteFolder + siteBasename;
	var targetTestFolder = targetFolder + testFolder;
	var compiledTestScripts = targetTestFolder + "tests.js";

	grunt.initConfig({
		watch : {
			bower_concat : {
				files : [ "bower.json" ],
				tasks : [ "bower_concat", "uglify" ]
			},
			typescript_main : {
				files : mainScripts,
				tasks : [ "typescript:main" ]
			},
			typescript_site : {
				files : siteScripts,
				tasks : [ "typescript:site" ]
			},
			less : {
				files : stylesheets,
				tasks : [ "less" ]
			},
			site : {
				files : site,
				tasks : [ "dom_munger" ]
			},
			typescript_test : {
				files : testScripts,
				tasks : [ "typescript:test" ]
			},
			test : {
				files : mainScripts.concat(testScripts),
				tasks : [ "jasmine" ]
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
		typescript : {
			main : {
				src : mainScripts,
				dest : compiledMainScripts
			},
			site : {
				src : mainScripts.concat(siteScripts),
				dest : compiledSiteScripts
			},
			test : {
				src : testScripts,
				dest : compiledTestScripts
			}
		},
		less : {
			build : {
				src : stylesheets,
				dest : compiledStylesheets
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
				src : [ compiledMainScripts, compiledDependencies ],
				options : {
					specs : compiledTestScripts,
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