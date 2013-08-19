define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

	var defs = {

		/* instance */
		instance : Oskari.cls('Oskari.sample.bundle.requireminimal.RequireBundleInstance').
			extend("Oskari.userinterface.extension.DefaultExtension").
			events({
 			  "AfterMapMoveEvent" : function() {

				this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
			  }
		    }),

		/* flyout */
		flyout : Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").
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
		})
	};

	return Oskari.cls("Oskari.sample.bundle.requireminimal.RequireBundle").category({
		"create" : function() {
			return Oskari.clazz.create(defs.instance.name(), 'requireminimal', defs.flyout.name());
		}
	}).bundle('requireminimal');

});
