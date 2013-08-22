define(["oskari", "./SampleEvent"], function(Oskari, sampleEvent) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
		category({
			func : function() {
			}
		}).extend(
			"Oskari.userinterface.extension.DefaultExtension"
		).events({
			"AfterMapMoveEvent" : function() {
				this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
			}
		});

});

