define(["oskari"], function(Oskari) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
	  extend("Oskari.userinterface.extension.DefaultExtension").trait({
		"eventHandlers" : {
			"AfterMapMoveEvent" : function() {
				/* */
			}
		}
	  }
	);

});
