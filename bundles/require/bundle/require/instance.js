define(["oskari", "./Flyout", "./SampleEvent", "./SampleRequest", "./locale/fi", "./locale/en"], function(Oskari, flyoutCls, sampleEventCls, sampleRequestCls) {

    /* 1) default tile implementation is sufficient */
    var tileCls = Oskari.cls('Oskari.userinterface.extension.DefaultTile');

    /* 2) Flyout declared in Flyout.js see define above */

    return Oskari.cls('Oskari.sample.bundle.require.RequireBundleInstance').
    	extend("Oskari.userinterface.extension.EnhancedExtension").category({

        startPlugin : function() {

            var flyout = flyoutCls.create(this, this.getLocalization()['flyout']);
            this.setFlyout(flyout);

            var tile = tileCls.create(this, this.getLocalization()['tile'])
            this.setTile(tile);

        }
    }).events({
        /* sent by mapmodule */
        "AfterMapMoveEvent" : function(evt) {

            this.getFlyout().showMapMove(evt.getCenterX(), evt.getCenterY());
        },

        /* we can listen to our own event also sent from flyout code. see Flyout.js */
        "sample.SampleEvent" : function(evt) {

            this.getFlyout().showEventes(evt);
        }
    }).requests({
        "sample.SampleRequest" : function(request) {

            this.notify(sampleEventCls.create('Joo'));

            return "RESPONSE from RequestHandler for " + request.getFid();

        }
    });
});

