define(["oskari", "./instance", "./Flyout", "./locale/fi", "./locale/en"], function(Oskari, instanceClazz, flyoutClazz) {

	var cid = 'require';
	var cls = Oskari.clazz.define("Oskari.sample.bundle.require.RequireBundle", function() {

	}, {
		"create" : function() {
			return Oskari.clazz.create(instanceClazz, cid, flyoutClazz);
		},
		"update" : function() {

		}
	}, {

		"protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
		"bundle" : {
			"manifest" : {
				"Bundle-Identifier" : cid
			}
		}
	});

	Oskari.bundle_manager.installBundleClass(cid, cls);

	return cls;
});
