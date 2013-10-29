/* Sample for o2 new API */
/* require conf sets up
 *
 *   mapfull ->    "/bundles/leaflet/bundle/mapfull"
 *   divmanazer -> "/bundles/bootstrap/bundle/divmanazer/module"
 *
 */

define([ "./api/oskariapi", "mapfull", "divmanazer","jquery" ],

/* */
function(Oskari, Mapping, DIVManager,jQuery) {
 
        var HelloWorld = Oskari.El("Hello",jQuery('<div>World!</div>'));

        Oskari.Application.create()
          .setBundles([
             Mapping,
             DivManager,
             HelloWorld
          ])
          .start()
          .success(function() {
            console.log("running");

          });


});