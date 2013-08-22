define(["oskari", "./instance", "./Flyout", "./locale/fi", "./locale/en"], function(Oskari, instanceMod, flyoutMod) {

	return Oskari.bundleCls("Oskari.sample.bundle.require.RequireBundle", 'require').category({
		"create" : function() {
			return Oskari.clazz.create(instanceMod.name(), 'require', flyoutMod.name());
		}
	});

});
