define(["oskari", "jquery"], function(Oskari, jQuery) {

	return Oskari.cls("Oskari.sample.bundle.require.RequireFlyout").extend("Oskari.userinterface.extension.DefaultFlyout").category({
		startPlugin : function() {
			var el = this.getEl();

			var loc = this.getLocalization();
			var msg = loc.message;

			el.append(msg);

		},
		showMapMove : function() {

			this.getEl().append("- Events AfterMapMoveEvent\n");
		}
	});

})