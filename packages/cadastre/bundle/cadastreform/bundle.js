Oskari.clazz.define("Oskari.cadastre.bundle.cadastreform.CadastreWebFormBundle", function() {

}, {
	"create" : function() {
		var inst = Oskari.clazz.create(
			"Oskari.cadastre.bundle.cadastreform.CadastreWebFormBundleInstance");		
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
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/view/Form.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/view/View.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/view/Toolbar.js"

		}, {
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/instance.js"

		}, {
			"type" : "text/css",
			"src" : "../../../../resources/cadastre/bundle/cadastreform/css/style.css"
		}],
		"locales" : [{
			"lang" : "fi",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/locale/fi.js"
		}, {
			"lang" : "en",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/locale/en.js"
		}, {
			"lang" : "sv",
			"type" : "text/javascript",
			"src" : "../../../../bundles/cadastre/bundle/cadastreform/locale/sv.js"
		}],
		"resources" : []
	},
	"bundle" : {
		"manifest" : {
			"Bundle-Identifier" : "cadastreform",
			"Bundle-Name" : "cadastreform",
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

Oskari.bundle_manager.installBundleClass("cadastreform", "Oskari.cadastre.bundle.cadastreform.CadastreWebFormBundle");
