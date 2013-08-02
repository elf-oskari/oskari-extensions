oskari-extensions
=================

This is Free Software.

Proofs-of-concepts and Samples.    

# social - proof-of-concepts

Two examples for sharing map views. 

- mapviewlog keeps track of map navigation history and visualises history 
    with oskari-printout-backend thumbnails with share btn interacts with mapshare bundle.
    
- mapshare shares map to  http://www.tinkerpop.com/ sevice via Rexster Gremlin API. Proo
    Tinkerpop stack with Titan / BerkeleyDB backend was used for PoC.
    
    * https://github.com/tinkerpop/rexster/wiki
    * https://github.com/tinkerpop/gremlin/wiki
    * https://github.com/thinkaurelius/titan

# mashup - proof-of-concepts

Somewhat dated examples of embedding RSS, Wikimepedia and SPARQL content to Oskari Map vector layers.

- trains from vr.fi RSS feed (poc - check usage terms from vr.fi)
    * http://www.vr.fi/
     
- wikipedia with from geonames.org ws endpoint (username required for access to webservice - don't use the default)
    * http://www.geonames.org/export/ws-overview.html
     
- linkedgeodata from linkedgeodata.org endpoint (poc - no terms asked)
    * http://linkedgeodata.org/About  

 # games - just for fun
 
 A cross-platform just-for-fun simulation of solitaire ported originally from J2ME... 
 At some point jQueryUI interaction was commented out so requires zero user-interaction atm.
 
# 3d - proof-of-concepts

Somewhat dated 3d embedding with WebGLEarth Globe embedded in Oskari Flyout 
with some basic WebGLEarth <-> Oskari interaction.

Note! Requires WebGLEarth code refence to be FIRST in the HTML page embedding Oskari map as 
google javascript frameworks flush any other frameworks.

    * depends on webglearth javascript lib (not tested in recent years though)
    * http://www.webglearth.org/  



 
 