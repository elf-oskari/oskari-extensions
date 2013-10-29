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

 Oskari.El("Hello",jQuery('<div>World!</div>'))

});
