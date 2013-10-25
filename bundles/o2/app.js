/* require conf sets up
 * 
 *   mapfull ->    "/bundles/leaflet/bundle/mapfull"
 *   divmanazer -> "/bundles/bootstrap/bundle/divmanazer/module"
 * 
 */

define([ "./api/oskariapi", "mapfull", "divmanazer" ],

/* */
function(Oskari, Mapping, DIVManager) {

	/* Locale, Flyout, Extension and Bundle form a Oskari extension */

	/* Locale comes from i18n in real life */
	var locale = {
		tile : {
			title : 'X'
		},
		flyout : {
			message : 'Oskari 2.0',
			title : 'X'
		}
	},

	/* Flyout is a UI Component */
	Flyout = Oskari.Flyout.extend({
		startPlugin : function() {
			var el = this.getEl(), msg = this.getLocalization().message;
			el.append(msg);
		}
	}),

	/* Extension binds extension to DivManazer */
	Extension = Oskari.Extension
			.extend({
				startPlugin : function() {
					this.setDefaultTile(this.getLocalization('tile').title);
					this.setFlyout(Flyout.create(this, this
							.getLocalization('flyout')));
				}
			}),

	/* Bundle is a module with a predefined lifecycle: create, start, stop */
	Bundle = Oskari.Bundle.extend({
		create : function() {
			return Extension.create('i18nexxxxtension', locale);
		}
	}),

	/* AppConfig contains environment specific settings */
	config = {

	};

	// App
	Oskari.Application.setBundles([ Mapping, DIVManager, Bundle ])
			.setConfiguration(config).start().success(function() {
				console.log("running");

			});

});