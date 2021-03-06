oskari-extensions
=================

This is Free Software.

----

Most up to date Proof-of-Concepts for Oskari 2.0 preview which is already available in GitHub.
see: https://github.com/nls-jajuko/oskari-extensions/blob/develop/O2.md

----

A Collection of Proofs-of-concepts and Samples for Oskari. 
Created during years 2009 - 2013.

# /bundles/require

Obsolete PoC for Oskari 2.0 based on require dependency management 

# /bundles/social 

Two examples for sharing map views. 

- mapviewlog keeps track of map navigation history and visualises history 
    with oskari-printout-backend thumbnails with share btn interacts with mapshare bundle.
    
- mapshare shares map to  http://www.tinkerpop.com/ stack via Rexster Gremlin API. 
  Proof of concept was developed with Tinkerpop stack with Titan / BerkeleyDB backend.
    
    * https://github.com/tinkerpop/rexster/wiki
    * https://github.com/tinkerpop/gremlin/wiki
    * https://github.com/thinkaurelius/titan

# /bundles/mashup 

Somewhat dated examples of embedding RSS, Wikimepedia and SPARQL content to Oskari Map vector layers.

- trains from vr.fi RSS feed (poc - check usage terms from vr.fi)
    * http://www.vr.fi/
     
- wikipedia with from geonames.org ws endpoint (username required for access to webservice - don't use the default)
    * http://www.geonames.org/export/ws-overview.html
     
- linkedgeodata from linkedgeodata.org endpoint (poc - no terms asked)
    * http://linkedgeodata.org/About  

# /bundles/games 
 
 A cross-platform just-for-fun simulation of solitaire ported originally from J2ME... 
 At some point jQueryUI interaction was commented out so requires zero user-interaction atm.
 
# /bundles/3d 

- webglearth

Somewhat dated 3d embedding with WebGLEarth Globe embedded in Oskari Flyout 
with some basic WebGLEarth <-> Oskari interaction.

Note! Requires WebGLEarth code refence to be FIRST in the HTML page embedding Oskari map as 
google javascript frameworks flush any other frameworks.

- depends on webglearth javascript lib (not tested in recent years though)
    * http://www.webglearth.org/  

# /bundles/visualisation

- d3js and d3jspoc
- An attempt - with success - to embed a d3js lib sample to Oskari Flyout.
    * http://d3js.org/
    

# /bundles/cadastre

- cadastreform

A mock-up userinterface PoC for a form with an embedded map. Not very usefult 
but shared in the spirit of free software though. 

- cadastreinfo

A PoC cadastre information popup. Won't really work as this requires non-public backend 
but shared in the spirit of free software though.  
 
# Usage
  
 The motivation for this project is to share code in the free software spirit. These 
 bundles may not be of use as is but as an inspiration or base for a new extension.
 
 These JavaScript extensions require knowledge of how Oskari works see http://www.oskari.org/
 
# Really want to use these 
 
 Include in your JS build appsetup.json or load with oskari dev mode
 ```
  Oskari.setLoaderMode('dev');
  Oskari.setPreloaded(false);
  Oskari.playBundle( {
   /bundle spec including path to package dir/
   /sample bundle specs in /applications subfolders for copy-paste-modifying bundle specs/
  }); 
 ```
 