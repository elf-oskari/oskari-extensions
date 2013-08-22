define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

	/* bundle instance is a class that starts/stops bundle 'engines' */
	var instanceMod = Oskari.cls('Oskari.sample.bundle.requireminimal.RequireBundleInstance').
		extend("Oskari.userinterface.extension.DefaultExtension").
		events({
			"AfterMapMoveEvent" : function() {

				this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
			}
		});

	/* flyout is an optional view for bundle operations */
	var flyoutMod = Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").
		extend("Oskari.userinterface.extension.DefaultFlyout").category({
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

	return Oskari.bundleCls("Oskari.sample.bundle.requireminimal.RequireBundle", 'requireminimal').category({
		create : function() {
			return Oskari.clazz.create(instanceMod.name(), 'requireminimal', flyoutMod.name());
		}
	});

});
