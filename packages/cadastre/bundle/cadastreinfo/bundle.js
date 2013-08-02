Oskari.clazz.define("Oskari.cadastre.bundle.cadastreinfo.CadastreInfoBundle", function() {

}, {
	"create" : function() {
		var inst = Oskari.clazz.create(
			"Oskari.cadastre.bundle.cadastreinfo.CadastreInfoBundleInstance");		
		return inst;
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
		"scripts" : [{
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreinfo/Flyout.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreinfo/instance.js"

		}, {
			"type" : "text/css",
			"src" : "../../../../resources/cadastre/bundle/cadastreinfo/css/style.css"
		}],
		"locales" : [{
			"lang" : "fi",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreinfo/locale/fi.js"
		}, {
			"lang" : "en",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreinfo/locale/en.js"
		}, {
			"lang" : "sv",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreinfo/locale/sv.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "cadastreinfo",
			"Bundle-Name" : "cadastreinfo",
			"Bundle-Author" : [{
				"Name" : "jjk",
				"Organisation" : "nls.fi",
				"Temporal" : {
					"Start" : "2013",
					"End" : "2013"
				},
				"Copyleft" : {
					"License" : {
						"License-Scope" : "implementation",
						"License-Name" : "MIT",
						"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
					},
					"License" : {
						"License-Scope" : "package",
						"License-Name" : "EUPL",
						"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
					}

				}
			}],
			"Bundle-Version" : "1.0.0",
			"Import-Namespace" : ["Oskari"],
			"Import-Bundle" : {}
		}
	}
});

Oskari.bundle_manager.installBundleClass("cadastreinfo", "Oskari.cadastre.bundle.cadastreinfo.CadastreInfoBundle");
