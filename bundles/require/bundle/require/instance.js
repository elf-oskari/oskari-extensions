define(["oskari", "./SampleEvent"], function(Oskari, sampleEvent, sampleRequest) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
		extend("Oskari.userinterface.extension.DefaultExtension").
		events({
			"AfterMapMoveEvent" : function() {
				/* */
				console.log("Events AfterMapMoveEvent");
			}
		});
		

});
