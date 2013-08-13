/**
 * Bundle
 */
Oskari.clazz.define("Oskari.mashup.bundle.WikipediaBundle", function() {

}, {
	/*
	 * implementation for protocol 'Oskari.bundle.Bundle'
	 */
	"create" : function() {

		return Oskari.clazz.create("Oskari.mashup.bundle.WikipediaBundleInstance");
		
		 var inst = Oskari.clazz.create("Oskari.mashup.bundle.WikipediaBundleInstance",
            'wikipedia',
            "Oskari.mashup.bundle.wikipedia.Flyout"
            );

	},
	"update" : function(manager, bundle, bi, info) {

	}
},

/**
 * metadata
 */
{

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../bundles/mashup/bundle/wikipedia/instance.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/mashup/bundle/wikipedia/Flyout.js"
		},{
			"type" : "text/css",
			"src" : "../../../../resources/mashup/bundle/wikipedia/css/style.css"
		}],
	 	"locales" : [{
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/wikipedia/locale/fi.js"
        }, {
            "lang" : "sv",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/wikipedia/locale/sv.js"
        }, {
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/wikipedia/locale/en.js"
        }],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "wikipedia",
			"Bundle-Name" : "wikipedia",
			"Bundle-Icon" : {
				"href" : "icon.png"
			},
			"Bundle-Author" : [{
				"Name" : "jjk",
				"Organisation" : "nls.fi",
				"Temporal" : {
					"Start" : "2009",
					"End" : "2011"
				},
				"Copyleft" : {
					"License" : {
						"License-Name" : "EUPL",
						"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
					}
				}
			}],
			"Bundle-Name-Locale" : {
				"fi" : {
					"Name" : " Wikipedia",
					"Title" : " Wikipedia"
				},
				"en" : {}
			},
			"Bundle-Version" : "2.0.0",
			"Import-Namespace" : ["Oskari", "jQuery", "OpenLayers"]

		}
	}
});

/**
 * Install this bundle by instantating the Bundle Class
 *
 */
Oskari.bundle_manager.installBundleClass("wikipedia", "Oskari.mashup.bundle.WikipediaBundle");
