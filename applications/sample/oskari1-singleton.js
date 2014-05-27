/* Singleton Bundle - works for most cases */


Oskari.clazz.define("Oskari.sample.bundle.helloworld.Bundle",
function() {
    /* setup basic stuff and prevent any defaults */
    this.conf = {};
    this._localization = {};

}, {
   /* singleton - return this */
   "create" : function() {
        return this;
    },   

   /* register some event handlers */
   "eventHandlers" : {
	"AfterMapMoveEvent": function(evt) {
 
	    console.log(evt);
        }
    },
    /* things to do before start */
    startPlugin : function()  {


    }
}, {
    "extend" : ["Oskari.userinterface.extension.DefaultExtension"],
    "protocol" : ["Oskari.bundle.Bundle"],
    "bundle" : { 
        "manifest" : { "Bundle-Identifier" : "helloworld" }
    }
});

Oskari.bundle_manager.installBundleClass("helloworld", "Oskari.sample.bundle.helloworld.Bundle");

/* Starting the bundle */

Oskari.bundle_facade.playBundle({ 
        "bundleinstancename": "myhelloworld",
        "bundlename" : "helloworld",
        "metadata" : { 
            "Import-Bundle" : { 
            }
        }
      }, function(inst) { console.log(inst);});

