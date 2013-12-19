oskari2
=================

- http://demo.paikkatietoikkuna.fi/web/fi/kartta?viewId=5890 ( leaflet )
- version requires a patch to AfterMapMoveEvent, see Patch #2 hack below for online hack
- fixed in Git but not has not been built for demo 



# Patch #2

This ugly hack will semi fix a coordinate issue in AfterMapMoveEvent in Leaflet adapter

```
Oskari.getSandbox().findRegisteredModuleInstance("MainMapModule").getMap().on('moveend', function(e) {
            //
var me = Oskari.getSandbox().findRegisteredModuleInstance("MainMapModule");
var map = me.getMap() 
            var extent = me.getMapExtent();
            var center = map.getCenter();
            var zoom = map.getZoom();
            var lonlat = me._map2Crs(center.lng, center.lat);
            console.log("MOVEEND", e, extent, center, zoom, lonlat);

            me._updateDomain();
            var sboxevt = sandbox.getEventBuilder('AfterMapMoveEvent')(lonlat.x, lonlat.y, map.getZoom(), false, me.getMapScale());
            sandbox.notifyAll(sboxevt);

        })
```        