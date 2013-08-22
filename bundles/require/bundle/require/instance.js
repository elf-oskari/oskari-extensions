
define(["oskari", "./Flyout", "./SampleEvent", "./locale/fi", "./locale/en"], function(Oskari, flyoutMod, sampleEvent) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
		extend("Oskari.userinterface.extension.EnhancedExtension").category({

		startPlugin : function() {
			this.getPlugins()['Oskari.userinterface.Flyout'] = flyoutMod.create(this, this.getLocalization()['flyout']);
			this.getPlugins()['Oskari.userinterface.Tile'] = Oskari.cls('Oskari.userinterface.extension.DefaultTile').create(this, this.getLocalization()['tile']);

		}
	}).events({
		"AfterMapMoveEvent" : function() {

			this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
		}
	});
});

