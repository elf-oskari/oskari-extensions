
/* require conf sets up
 * 
 *   mapfull ->    "/bundles/leaflet/bundle/mapfull"
 *   divmanazer -> "/bundles/bootstrap/bundle/divmanazer/module"
 * 
 */

define(["./api/oskariapi","mapfull","divmanazer"],
	
  /* */ 
  function(Oskari, Mapping, DIVManager) {
	
	 // from i18n in real life
    var locale = {
        tile : {
            title : 'X'
        },
        flyout : {
            message : 'Oskari 2.0',
            title : 'X'
        }
    };
    
    // Flyout, Extension and Bundle
    var Flyout = Oskari.Flyout.extend({
        startPlugin : function() {
            var el = this.getEl(), msg = this.getLocalization().message;
            el.append(msg);
        }
    });

    var Extension = Oskari.Extension.extend({
        startPlugin : function() {
            this.setDefaultTile(this.getLocalization('tile').title);
            this.setFlyout(Flyout.create(this, this.getLocalization('flyout')));
        }
    });

    var Bundle = Oskari.Bundle.extend({
        create : function() {
            return Extension.create('i18nexxxxtension', locale);
        }
    });

    
    // App    
    Oskari.Application
      .setBundles([Mapping, DIVManager, Bundle])
      .start()
      .success(function() {
    	  console.log("running");
    	  
      });
	
});