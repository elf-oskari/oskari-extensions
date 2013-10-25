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
        };

        /* Flyout is a generic UI Component for DivManazer */
        var Flyout = Oskari.Flyout
          .extend({
              startPlugin : function() {
                   var el = this.getEl(), msg = this.getLocalization().message;
                   el.append(msg);
              }
          });

        /* Extension is required to bind to DivManazer */
        var Extension = Oskari.Extension
            .extend({
              startPlugin : function() {
                this.setDefaultTile(this.getLocalization('tile').title);
                this.setFlyout(Flyout.create(this, this.getLocalization('flyout')));
              }
            });

        /* Bundle is a module with a predefined lifecycle: create, start, stop */
        var Bundle = Oskari.Bundle
          .extend({
        	 extension: Extension,
        	 locale: locale,
        	 configuration: { sample: 'setting' }
          });

        
        // App
        Oskari.Application
          .setBundles([ Mapping, DIVManager, Bundle ])
          .start()
          .success(function() {
            console.log("running");

          });

});