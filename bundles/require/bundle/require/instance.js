
define(["oskari", "./Flyout", "./SampleEvent", "./locale/fi", "./locale/en"], function(Oskari, flyoutCls, sampleEvent) {

    var tileCls = Oskari.cls('Oskari.userinterface.extension.DefaultTile');

    return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
    	extend("Oskari.userinterface.extension.EnhancedExtension").category({

        startPlugin : function() {

            var flyout = flyoutCls.create(this, this.getLocalization()['flyout']);
            this.setFlyout(flyout);

            var tile = tileCls.create(this, this.getLocalization()['tile'])
            this.setTile(tile);
        }
    }).events({
        "AfterMapMoveEvent" : function() {

            this.getFlyout().showMapMove();
        }
    });
});

