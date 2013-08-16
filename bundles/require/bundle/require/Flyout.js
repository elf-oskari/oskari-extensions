define(["oskari", "jquery"], function(Oskari, jQuery) {

	return Oskari.clazz.define("Oskari.sample.bundle.require.RequireFlyout", function() {

	}, {
		startPlugin : function() {
			var el = this.getEl();

			var loc = this.getLocalization();
			var msg = loc.message;

			el.append(msg);

		},

		stopPlugin : function() {
		}
	}, {
		"extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
	});

})