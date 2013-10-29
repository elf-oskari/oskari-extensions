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

        /* Let's declare a Extension which is required to work with DivManazer */

        var Extension1 = Oskari.ExtensionEl('Shortcut',"Hello World");
        var Bundle1 = Oskari.Bundle(Extension1);

	/* Let's declare another with some event handling */

        var Extension2 = Oskari.ExtensionEl('Events',"Hello World")
           .events({
             'AfterMapMoveEvent' : function()Ê{
                 this.getFlyout().getEl().append("map moved.");
             }
           });

        var Bundle2 = Oskari.Bundle(Extension2);


        /* Let's declare another Extension with more specific control */
	
	/* Let's declare a Locale for our bundle ( comes from i18n in real life ) */
    	var locale3 = {
          tile : {
            title : 'X1'
          },
          flyout : {
            message : 'Oskari 2.3',
            title : 'X1'
         }
    	};
	     
    	
        /* Let's declare a Flyout is a generic UI Component for DivManazer */
        var Flyout3 = Oskari.Flyout
          .extend({
              startPlugin : function() {
                   var el = this.getEl(), msg = this.getLocalization().message;
                   el.append(msg);
              }
          });

        /* Let's declare a Extension which is required to work with DivManazer */
        var Extension3  = Oskari.Extension
            .extend({
              startPlugin : function() {
                this.setDefaultTile(this.getLocalization('tile').title);
                this.setFlyout(Flyout3.create(this, this.getLocalization('flyout')));
              }
            });
        
        /* Let's declare a Bundle which is a module with a 
         *   predefined lifecycle: create, start, stop */
        var Bundle3 = Oskari.Bundle( Extension3, locale3, { sample: 'setting1' });
        
    	


        /* Let's register our bundles 
         * (two from referenced modules and one declared above */
        var myApp = Oskari.Application
          .create();

        myApp
          .setBundles([ 
             Bundle1,
             Bundle2,
             Bundle3
          ]);
         
        
        /* 2) START ----------------------------------------------------------- */
        /* This is where extensions are instantiated and the application starts */
        
        myApp
          .start()
          .success(function() {
            console.log("running");	
	     /* extensions may be added at any time (requirements permitting) */
		 var Extension4 = Oskari.ExtensionEl('Additional',"Additional Hello World");
                 var Bundle4 = Oskari.Bundle(Extension4);
		 Bundle4.start();

          });

});
