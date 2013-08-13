/**
 * Bundle
 */
Oskari.clazz.define("Oskari.mashup.bundle.TrainsBundle", function() {

}, {
	/*
	 * implementation for protocol 'Oskari.bundle.Bundle'
	 */
	"create" : function() {

		
		 var inst = Oskari.clazz.create("Oskari.mashup.bundle.TrainsBundleInstance",
            'trains',
            "Oskari.mashup.bundle.trains.Flyout"
            );
            
        return inst;
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
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/mashup/bundle/trains/Flyout.js"
		},{
			"type" : "text/css",
			"src" : "../../../../resources/mashup/bundle/trains/css/style.css"
		}],
			"locales" : [{
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/trains/locale/fi.js"
        }, {
            "lang" : "sv",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/trains/locale/sv.js"
        }, {
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/mashup/bundle/trains/locale/en.js"
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
