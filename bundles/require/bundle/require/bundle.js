define(["oskari", "./instance"], function(Oskari, instanceMod) {

	return Oskari.bundleCls("Oskari.sample.bundle.require.RequireBundle", 'require').
	  category({
		create : function() {
			var inst = instanceMod.create('require');
			return inst;
		}
	});

});
