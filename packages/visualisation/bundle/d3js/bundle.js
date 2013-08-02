/**
 * @class Oskari.visualisation.bundle.d3js.D3VisualisationBundle
 *
 */
Oskari.clazz.define("Oskari.visualisation.bundle.d3js.D3VisualisationBundle", function() {

}, {
	"create" : function() {

		return this;

	},
	"start" : function() {
	},
	"stop" : function() {
	},
	"update" : function(manager, bundle, bi, info) {

	}
}, {

	"protocol" : ["Oskari.bundle.Bundle", "Oskari.bundle.BundleInstance", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
	"source" : {

		"scripts" : [/*{
			"type" : "text/javascript",
			"src" : "../../../../bundles/visualisation/bundle/d3js/d3.v2.min.js"
		}*/{
			"type" : "text/javascript",
			"src" : "../../../../bundles/visualisation/bundle/d3js/d3.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/visualisation/bundle/d3js/d3.geom.js"
		},{
			"type" : "text/javascript",
			"src" : "../../../../bundles/visualisation/bundle/d3js/d3.layout.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "d3js",
			"Bundle-Name" : "visualisation.bundle.d3js",
			"Bundle-Author" : [{
				"Name" : "jjk",
				"Organisation" : "nls.fi",
				"Temporal" : {
					"Start" : "2012",
					"End" : "2012"
				},
				"Copyleft" : {
					"License" :{
						"License-Scope" : "package",
						"License-Name" : "EU-PL",
						"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
						
					},
					"License" : {
						"Licesen-scope" : "implementation",
						"License-Name" : "BSD",
						"License-Online-Resource" : "http://d3js.org/"
					}
				}
			}],
			"Bundle-Version" : "1.0.0",
			"Import-Namespace" : ["Oskari"],
			"Import-Bundle" : {}
		}
	}
});

Oskari.bundle_manager.installBundleClass("d3js", "Oskari.visualisation.bundle.d3js.D3VisualisationBundle");
