/**
 * @class Oskari.social.bundle.mapviewlog.MapViewLogBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.social.bundle.mapviewlog.Bundle",
/**
 * @method create called automatically on construction
 * @static
 */
function() {

}, {
	"create" : function() {
		return Oskari.clazz.create("Oskari.social.bundle.mapviewlog.BundleInstance", 'mapviewlog', 
			"Oskari.social.bundle.mapviewlog.Flyout");
	},
	"update" : function(manager, bundle, bi, info) {

	}
}, {

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/Flyout.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/instance.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/patches.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/event/HistoryContentEvent.js"
		}, {
			"type" : "text/css",
			"src" : "../../../../resources/social/bundle/mapviewlog/css/style.css"
		}],

		"locales" : [{
			"lang" : "fi",
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/locale/fi.js"
		}, {
			"lang" : "sv",
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/locale/sv.js"
		}, {
			"lang" : "en",
			"type" : "text/javascript",
			"src" : "../../../../bundles/social/bundle/mapviewlog/locale/en.js"
		}]
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "mapviewlog",
			"Bundle-Name" : "mapviewlog",
			"Bundle-Author" : [{
				"Name" : "ev",
				"Organisation" : "nls.fi",
				"Temporal" : {
					"Start" : "2013",
					"End" : "2013"
				},
				"Copyleft" : {
					"License" : {
						"License-Name" : "EUPL",
						"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
					}
				}
			}],
			"Bundle-Version" : "1.0.0",
			"Import-Namespace" : ["Oskari"],
			"Import-Bundle" : {}

		}
	},

	/**
	 * @static
	 * @property dependencies
	 */
	"dependencies" : ["jquery"]

});

Oskari.bundle_manager.installBundleClass("mapviewlog", "Oskari.social.bundle.mapviewlog.Bundle");
