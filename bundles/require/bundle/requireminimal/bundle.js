define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

	return Oskari.cls("Oskari.sample.bundle.requireminimal.RequireBundle").category({
		plugins : {

			/* registered instancename */
			instancename : 'requireminimal',

			/* instance class */
			instance : Oskari.cls('Oskari.sample.bundle.requireminimal.RequireBundleInstance').
				extend("Oskari.userinterface.extension.DefaultExtension").
				events({
				"AfterMapMoveEvent" : function() {

					this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
				}
			}),

			/* flyout class */
			flyout : Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").
			extend("Oskari.userinterface.extension.DefaultFlyout").
			category({

				startPlugin : function() {
					var el = this.getEl();

					var loc = this.getLocalization();
					var msg = loc.message;

					el.append(msg);

				},
				showMapMove : function() {

					this.getEl().append("- Events AfterMapMoveEvent\n");
				}
			})
		}
	}).extend("Oskari.userinterface.extension.DefaultExtensionBundle").bundle('requireminimal');

});
