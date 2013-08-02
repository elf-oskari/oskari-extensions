/**
 * Bundle
 */
Oskari.clazz.define("Oskari.mashup.bundle.TrainsBundle", function() {

}, {
	/*
	 * implementation for protocol 'Oskari.bundle.Bundle'
	 */
	"create" : function() {

		return Oskari.clazz.create("Oskari.mashup.bundle.TrainsBundleInstance");
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
			"src" : "../../../../bundles/mashup/bundle/trains/instance.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "trains",
			"Bundle-Name" : "trains",
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
					"Name" : " Trains",
					"Title" : " Trains"
				},
				"en" : {}
			},
			"Bundle-Version" : "2.0.0",
			"Import-Namespace" : ["Oskari","jQuery", "OpenLayers"],
			"Import-Bundle" : {
				"layerhandler" : {}
			}

		}
	}
});

/**
 * Install this bundle by instantating the Bundle Class
 *
 */
Oskari.bundle_manager.installBundleClass("trains", "Oskari.mashup.bundle.TrainsBundle");
