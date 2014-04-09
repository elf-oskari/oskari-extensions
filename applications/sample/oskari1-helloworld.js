/* Localised */

/* Flyout */

Oskari.clazz.define("Oskari.sample.bundle.helloworld.Flyout",
function() {}, 
{
	/* HTML templates */
    templates: {
        'mapMoved' : _.template('<div>${ msg }: ${ lon },${ lat }.</div>') 
    },
    /* App specific methods */
    showMapMoved: function (lonLatInfo) {
        var content = this.templates.mapMoved(lonLatInfo);
        this.getEl().append( content  );
    },
    /* API implementations */
    startPlugin : function() {
         var sandbox = this.instance.getSandbox(), 
			el = this.getEl(), loc = this.getLocalization(),
			msg = loc.messages.greeting,
			btnTitle = loc.buttons.tampere;
        el.append(msg);
		
		el.append(
		  jQuery("<button />").
		  append(btnTitle).
		  click(function() {
			sandbox.postRequestByName('MapMoveRequest',[326165,6822369,10]);
		  }));
 		
    }
}, {
    "extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
});

/* Instance */

Oskari.clazz.define("Oskari.sample.bundle.helloworld.Extension",
function() {}, 
{
   "eventHandlers" : {
      "AfterMapMoveEvent" : function(evt) {
    	   var msg = this.getLocalization('flyout').messages.mapMoved;
    	       lonLatInfo = { lon: evt.getCenterX(), lat: evt.getCenterY(), msg: msg };
           this.plugins["Oskari.userinterface.Flyout"].showMapMoved(lonLatInfo);
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
                     },
                     "buttons" : {
                    	  "tampere" : "Go to Tampere!" 
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
                     },
                     "buttons" : {
                   	  "tampere" : "Tampereelle!" 
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