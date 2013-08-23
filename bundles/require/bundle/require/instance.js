
define(["oskari", "./Flyout", "./SampleEvent", "./locale/fi", "./locale/en"], function(Oskari, flyoutMod, sampleEvent) {

	return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
		extend("Oskari.userinterface.extension.EnhancedExtension").category({

		startPlugin : function() {
			
			var flyout = flyoutMod.create( this, this.getLocalization()['flyout'] );
			this.setFlyout( flyout );
			
			var tile =  Oskari.cls('Oskari.userinterface.extension.DefaultTile').
					create(this, this.getLocalization()['tile'])
			this.setTile( tile );
		}
	}).events({
		"AfterMapMoveEvent" : function() {

			this.getFlyout().showMapMove();
		}
	});
});

