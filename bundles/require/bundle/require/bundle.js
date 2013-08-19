define(["oskari", "./instance", "./Flyout", "./locale/fi", "./locale/en"], function(Oskari, instanceClazz, flyoutClazz) {

	return Oskari.cls("Oskari.sample.bundle.require.RequireBundle").
	  category({
		"create" : function() {
			return Oskari.clazz.create(instanceClazz.name(), 'require', flyoutClazz.name());
		}
	  }).bundle('require'); 

	
});
