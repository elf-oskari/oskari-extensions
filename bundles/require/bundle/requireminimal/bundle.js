define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

	// we'll use the default tile class for this sample
	var tileCls = Oskari.cls('Oskari.userinterface.extension.DefaultTile');
	
	// we'll extend the default flyout for this sample 
	var flyoutCls = Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").extend("Oskari.userinterface.extension.DefaultFlyout").category({

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
	
	// we'll extend the	EnhancedExtension base class to setup this bundle operations	
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
		// we'll listen to some Oskari events 
			
		"AfterMapMoveEvent" : function() {

			this.getFlyout().showMapMove();

		}
	});

	// we'll register the Bundle with a bundleCls call - bundle will be instantiated and started by the application 'player' if specified in appsetup.json 
	return Oskari.bundleCls("Oskari.sample.bundle.requireminimal.RequireBundle", 'requireminimal').category({
		create : function() {

			return instanceCls.create('requireminimal');

		}
	});

	
});
