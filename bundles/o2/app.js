/* Sample for o2 new API */
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
    	var locale1 = {
         tile : {
           title : 'X1'
         },
         flyout : {
           message : 'Oskari 2.1',
           title : 'X1'
         }
    	};
	     
    	
        /* Let's declare a Flyout is a generic UI Component for DivManazer */
        var Flyout1 = Oskari.Flyout
          .extend({
              startPlugin : function() {
                   var el = this.getEl(), msg = this.getLocalization().message;
                   el.append(msg);
              }
          });

        /* Let's declare a Extension which is required to work with DivManazer */
        var Extension1 = Oskari.Extension
            .extend({
              startPlugin : function() {
                this.setDefaultTile(this.getLocalization('tile').title);
                this.setFlyout(Flyout1.create(this, this.getLocalization('flyout')));
              }
            });
        
        /* Let's declare a Bundle which is a module with a 
         *   predefined lifecycle: create, start, stop */
        var Bundle1 = Oskari.Bundle( Extension1, locale1, { sample: 'setting1' });
        
    	

        /* Let's declare a Extension which is required to work with DivManazer */
        var Extension2 = Oskari.ExtensionEl('Shortcut',"Hello World");
        var Bundle2 = Oskari.Bundle(Extension2);
        

        /* Let's register our bundles 
         * (two from referenced modules and one declared above */
        var myApp = Oskari.Application
          .create();

        myApp
          .setBundles([ 
             Bundle1,
             Bundle2
          ]);
         
        
        /* 2) START ----------------------------------------------------------- */
        /* This is where extensions are instantiated and the application starts */
        
        myApp
          .start()
          .success(function() {
            console.log("running");

          });

});
