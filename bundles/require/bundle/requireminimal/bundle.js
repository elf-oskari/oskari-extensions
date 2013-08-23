define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

    /* This module declares a tile, flyout and instance for a bundle */

    /* 1) */
    /* we'll use the default tile class for this sample */
    var tileCls = Oskari.cls('Oskari.userinterface.extension.DefaultTile');

    /* 2) */
    /* we'll extend the default flyout for this sample */
    var flyoutCls = Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").
    	extend("Oskari.userinterface.extension.EnhancedFlyout").category({

		/* create some UI */
        startPlugin : function() {
            var me = this, el = me.getEl();
            loc = me.getLocalization();
            msg = loc.message;

            el.append(msg);

            var elBtn = jQuery(['<button>', loc.clickToRequest.button, '</button>'].join(''));

            elBtn.click(function() {

                var responseMsgFromHandler = me.issue('sample.SampleRequest', loc.clickToRequest.text);

                var msgEl = jQuery('<div />');
                msgEl.append(responseMsgFromHandler);
                el.append(msgEl);

            })

            el.append(elBtn);

        },

        /* add some info to ui (called from instance in this demo) */
        showMapMove : function(x, y) {
            var me = this, el = me.getEl(), loc = me.getLocalization();
            var msgEl = jQuery('<div />');
            msgEl.append([loc.mapmove, " ", x, ",", y].join(''));
            el.append(msgEl);
        }

    });

    /* 3) */
    /* we'll extend the	EnhancedExtension base class to setup this bundle's operations */

    var instanceCls = Oskari.cls('Oskari.sample.bundle.requireminimal.RequireBundleInstance').
    	extend("Oskari.userinterface.extension.EnhancedExtension").category({

        startPlugin : function() {

            // let's create an instance of flyout clazz and register it to the zystem
            var flyout = flyoutCls.create(this, this.getLocalization()['flyout']);
            this.setFlyout(flyout);

            // let's create an instance of tile clazz and register it to the zystem
            var tile = tileCls.create(this, this.getLocalization()['tile'])
            this.setTile(tile);

        }
    }).events({
        /* we'll listen to some Oskari events */

        /* sent by mapmodule */
        "AfterMapMoveEvent" : function(evt) {

            this.getFlyout().showMapMove(evt.getCenterX(), evt.getCenterY());
        }
    });

    /* 4) */
    /* we'll register the Bundle with a bundleCls call */

    return Oskari.bundleCls("Oskari.sample.bundle.requireminimal.RequireBundle", 'requireminimal').
    	category({
        create : function() {

            return instanceCls.create('requireminimal');

        }
    });

    /* 5) */
    /* bundle instance will be created and create method called by the application startup sequence player */

});
