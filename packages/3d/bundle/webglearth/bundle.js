/**
 * @class Oskari.3d.bundle.WebGLEarthBundle
 *
 * Bundle that manages yuilibrary requirements. Instance calls 'require'
 *
 */
Oskari.clazz.define("Oskari.3d.bundle.WebGLEarthBundle", function() {

	/**
	 * @property yuilibrary
	 */
	this.yuilibrary = null;
}, {
	"require" : function(cb) {

		var me = this;
		var metas = Oskari.clazz.metadata('Oskari.3d.bundle.WebGLEarthBundle');
		
		
	},
	"create" : function() {
		var me = this;
		var inst = Oskari.clazz.create("Oskari.3d.bundle.WebGLEarthBundleInstance");

		return inst;

	},
	"update" : function(manager, bundle, bi, info) {

	}
}, {

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../bundles/3d/bundle/webglearth/instance.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/3d/bundle/webglearth/Flyout.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/3d/bundle/webglearth/Tile.js"

		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "webglearth",
			"Bundle-Name" : "webglearth",
			"Bundle-Author" : [{
				"Name" : "esbo",
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
					"Name" : " style-1",
					"Title" : " style-1"
				},
				"en" : {}
			},
			"Bundle-Version" : "1.0.0",
			"Import-Namespace" : ["Oskari", "jQuery", "Proj4js", "WebGLEarth"],
			"Import-Bundle" : {}

			/**
			 *
			 */

		}
	}

	
});

Oskari.bundle_manager.installBundleClass("webglearth", "Oskari.3d.bundle.WebGLEarthBundle");
