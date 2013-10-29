/* Sample for o2 new API */
/* require conf sets up
 *
 *   mapfull ->    "/bundles/leaflet/bundle/mapfull"
 *   divmanazer -> "/bundles/bootstrap/bundle/divmanazer/module"
 *
 */

define([ "./api/oskariapi", "mapfull", "divmanazer","jquery" ],
  function(Oskari, Mapping, DIVManager,jQuery) {
 
  var HelloWorldExtension = Oskari.ExtensionEl("Hello",jQuery('<div>World!</div>'));
  var HelloWorld = Oskari.Bundle(HelloWorldExtension);

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
