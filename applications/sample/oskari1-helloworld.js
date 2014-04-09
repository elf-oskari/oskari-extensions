/* Localised */

/* Flyout */

Oskari.clazz.define("Oskari.sample.bundle.helloworld.Flyout",
function() {}, 
{
    startPlugin : function() {
        var el = this.getEl(), msg = this.getLocalization().messages.greeting;
         el.append(msg);
    },
    showMapMoved : function() { 
        var el = this.getEl(), 
            msgEl = jQuery("<div />"),
            msg = this.getLocalization().messages.mapMoved;
        msgEl.append(msg);
        el.append(msgEl);
    },
    stopPlugin : function() {
         var el = this.getEl();
         el.remove();
    }
}, {
    "extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
});

/* Instance */

Oskari.clazz.define("Oskari.sample.bundle.helloworld.Extension",
function() {}, 
{
   "eventHandlers" : {
      "AfterMapMoveEvent" : function() {
           this.plugins["Oskari.userinterface.Flyout"].showMapMoved();
       }
   }

}, {
    "extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});



/* Bundle */


Oskari.clazz.define("Oskari.sample.bundle.helloworld.Bundle",
function() {

}, {
    "create" : function() {
       
        return Oskari.clazz.create("Oskari.sample.bundle.helloworld.Extension",
            "helloworld",
            "Oskari.sample.bundle.helloworld.Flyout"
            );

    },
    "update" : function(manager, bundle, bi, info) {

    }
}, {

    "protocol" : ["Oskari.bundle.Bundle"],
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "helloworld",
        }
    }
});

Oskari.bundle_manager.installBundleClass("helloworld", "Oskari.sample.bundle.helloworld.Bundle");


/* Kielistys */
Oskari.registerLocalization([{
	"lang" : "en", "key" : "helloworld", "value": {
		"tile": { "title" : "Hello" },
                "flyout" : { 
                    "title" : "Hello World", 
                     "messages": { 
                          "greeting": "Hello World Greeting",
		          "mapMoved" : "The Map has been Moved"
                     }
                 }
        }
        
},{
	"lang" : "fi", "key" : "helloworld", "value": {
		"tile": { "title" : "Hei" },
                "flyout" : { 
                    "title" : "Hei maailma", 
                     "messages": { 
                          "greeting": "Heippa hei",
		          "mapMoved" : "Karttaa on siirretty"
                     }
                 }
        }
        
}]);



/* sekä käynnistys joko a) liittämällä appsetup.jsoniin tai b) käynnistämällä */

Oskari.bundle_facade.playBundle({ 
        "bundleinstancename": "myhelloworld",
        "bundlename" : "helloworld",
        "metadata" : { 
            "Import-Bundle" : { 
            }
        }
      }, function(inst) { console.log(inst);});