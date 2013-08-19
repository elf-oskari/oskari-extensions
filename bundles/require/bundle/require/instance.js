define(["oskari"], function(Oskari) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
	  extend("Oskari.userinterface.extension.DefaultExtension").category({
		"eventHandlers" : {
			"AfterMapMoveEvent" : function() {
				/* */
			}
		}
	  }
	);

});
