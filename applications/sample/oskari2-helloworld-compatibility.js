
/* This uses compatibility mode */

require(["/Oskari/src/oskari/oskari-with-loader.js","lodash"],function(Oskari) {
	/* Localised */

	/* Flyout */

	Oskari.clazz.define("Oskari.sample.bundle.helloworld.Flyout",
	function() {}, 
	{
	    templates: {
	        'mapMoved' : _.template('<div>${ msg }: ${ lon },${ lat }.</div>') 
	    },
	    showMapMoved: function (lonLatInfo) {
	        this.getEl().append(
	             this.templates.mapMoved(lonLatInfo) 
	       );
	    },
	    startPlugin : function() {
	        var el = this.getEl(), msg = this.getLocalization().messages.greeting;
	         el.append(msg);
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
})