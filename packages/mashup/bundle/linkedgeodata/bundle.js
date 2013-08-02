/**
 * Bundle
 */
Oskari.clazz.define("Oskari.mashup.bundle.LinkedGeodataBundle", function() {

}, {
	/*
	 * implementation for protocol 'Oskari.bundle.Bundle'
	 */
	"create" : function() {

		return Oskari.clazz.create("Oskari.mashup.bundle.LinkedGeodataBundleInstance");
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
			"src" : "../../../../bundles/mashup/bundle/linkedgeodata/instance.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "linkedgeodata",
			"Bundle-Name" : "linkedgeodata",
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
					"Name" : " LinkedGeodata",
					"Title" : " LinkedGeodata"
				},
				"en" : {}
			},
			"Bundle-Version" : "2.0.0",
			"Import-Namespace" : ["Oskari","jQuery", "OpenLayers"]			

		}
	}
});

/**
 * Install this bundle by instantating the Bundle Class
 *
 */
Oskari.bundle_manager.installBundleClass("linkedgeodata", "Oskari.mashup.bundle.LinkedGeodataBundle");
