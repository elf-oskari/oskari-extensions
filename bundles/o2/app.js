/* require conf sets up
 * 
 *   mapfull ->    "/bundles/leaflet/bundle/mapfull"
 *   divmanazer -> "/bundles/bootstrap/bundle/divmanazer/module"
 * 
 */

define([ "./api/oskariapi", "mapfull", "divmanazer" ],

/* */
function(Oskari, Mapping, DIVManager) {
	

        /* 1) DECLARE ---------------------------------------------------------- */ 
        /* Note! Nothing is visible or instantiated before phase 2) see below */ 
	
	 	/* Let's declare a Locale for our bundle ( comes from i18n in real life ) */
    	var locale = {
         tile : {
           title : 'X'
         },
         flyout : {
           message : 'Oskari 2.0',
           title : 'X'
         }
    	};
	        
        /* Let's declare a Flyout is a generic UI Component for DivManazer */
        var Flyout = Oskari.Flyout
          .extend({
              startPlugin : function() {
                   var el = this.getEl(), msg = this.getLocalization().message;
                   el.append(msg);
              }
          });

        /* Let's declare a Extension which is required to work with DivManazer */
        var Extension = Oskari.Extension
            .extend({
              startPlugin : function() {
                this.setDefaultTile(this.getLocalization('tile').title);
                this.setFlyout(Flyout.create(this, this.getLocalization('flyout')));
              }
            });
        
        /* Let's declare a Bundle which is a module with a 
         *   predefined lifecycle: create, start, stop */
        var Bundle = Oskari.Bundle
          .extend({
        	 extension: Extension,
        	 locale: locale,
        	 configuration: { sample: 'setting' }
          });

        /* Let's register our bundles 
         * (two from referenced modules and one declared above */
        var myApp = Oskari.Application.
          .create();

        myApp
          .setBundles([ 
             /* referenced bundles */
             Mapping, DIVManager, 
             /* the one declared above */
             Bundle 
          ]);
         
        
        /* 2) START ----------------------------------------------------------- */
        /* This is where extensions are instantiated and the application starts */
        
        myApp
          .start()
          .success(function() {
            console.log("running");

          });

});