define(["oskari", "./instance", "./Flyout", "./locale/fi", "./locale/en"], function(Oskari, instanceClazz, flyoutClazz) {

	var cid = 'require';
	
	var cls = Oskari.cls("Oskari.sample.bundle.require.RequireBundle").
	  trait({
		"create" : function() {
			return Oskari.clazz.create(instanceClazz.name(), cid, flyoutClazz.name());
		}
	  }).bundle('require'); 

	return cls;
	
});
