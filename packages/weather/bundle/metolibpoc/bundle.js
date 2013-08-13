/**
 * @class Oskari.weather.bundle.metolibpoc.MetoLibPocBundle
 *
 * Definitpation for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.weather.bundle.metolibpoc.MetoLibPocBundle",
/**
 * @method create called automatically on construction
 * @static
 */
function() {

}, {
	"create" : function() {
		return Oskari.clazz.create("Oskari.weather.bundle.metolibpoc.MetoLibPocBundleInstance",
			 'metolibpoc');
	},
	"update" : function(manager, bundle, bi, info) {

	}
}, {

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/pack.js"
		},/*{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/async-0.2.5-min.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/underscore-1.4.4-min.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/metolib-combined-1.0.2-min.js"
		},*/{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/Flyout.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/instance.js"
		},{
			"type" : "text/css",
			"src" : "../../../../resources/weather/bundle/metolibpoc/css/style.css"
		}],
		"locales" : [{
			"lang" : "fi",
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/locale/fi.js"
		}, {
			"lang" : "sv",
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/locale/sv.js"
		}, {
			"lang" : "en",
			"type" : "text/javascript",
			"src" : "../../../../bundles/weather/bundle/metolibpoc/locale/en.js"
		}]
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "metolibpoc",
			"Bundle-Name" : "metolibpoc",
			"Bundle-Author" : [{
				"Name" : "jjk",
				"Organisatpation" : "nls.fi",
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
			"Bundle-Verspation" : "1.0.0",
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

Oskari.bundle_manager.installBundleClass("metolibpoc", "Oskari.weather.bundle.metolibpoc.MetoLibPocBundle");
