define(["oskari", "jquery", "./SampleRequest"], function(Oskari, jQuery, sampleRequestCls) {

    return Oskari.cls("Oskari.sample.bundle.require.RequireFlyout").
    	extend("Oskari.userinterface.extension.EnhancedFlyout").
    	category({

        startPlugin : function() {
            var me = this, el = me.getEl(), loc = me.getLocalization(), msg = loc.message;

            el.append(msg);

            el.click(function() {

				/* let's send a request to the synstem */
				 
                var responseMsgFromHandler = me.request(sampleRequestCls.create('Jep'));

                var msgEl = jQuery('<div />');
                msgEl.append(responseMsgFromHandler);
                el.append(msgEl);

            })
        },

        showMapMove : function(x, y) {
            var msgEl = jQuery('<div />');
            msgEl.append(["Map Moved to ", x, ",", y].join());
            this.getEl().append(msgEl);
        },

        showEventes : function(event) {
            this.getEl().append("<div>Events: SampleEvent</div>");

        }
    });

})