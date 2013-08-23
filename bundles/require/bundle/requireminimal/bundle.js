define(["oskari", "./locale/fi", "./locale/en"], function(Oskari) {

	
	var flyoutMod = Oskari.cls("Oskari.sample.bundle.requireminimal.RequireFlyout").
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
		  
	});

	var instanceMod = Oskari.cls('Oskari.sample.bundle.requireminimal.RequireBundleInstance').
	  extend("Oskari.userinterface.extension.EnhancedExtension").
	  category({

		startPlugin : function() {
			
			this.getPlugins()['Oskari.userinterface.Flyout'] = 
				flyoutMod.create(this, this.getLocalization()['flyout']);
				
			this.getPlugins()['Oskari.userinterface.Tile'] = 
				Oskari.cls('Oskari.userinterface.extension.DefaultTile').
					create(this, this.getLocalization()['tile']);

		}
	  }).events({
		
		"AfterMapMoveEvent" : function() {

			this.getPlugins()['Oskari.userinterface.Flyout'].showMapMove();
			
		}
	});

	return Oskari.bundleCls("Oskari.sample.bundle.requireminimal.RequireBundle", 'requireminimal').
	  category({
		create : function() {
			
			return instanceMod.create('requireminimal');
			
		}
	});

});
