/* Sample for o2 new API */
/*
 * PoC: API for Oskari 2.0
 *
 */
define("oskari", function(Oskari) {

    var cs = Oskari.clazz;
    
   
    /* Patches required to Oskari 1.0 */
   
    
    /* Patch to enable common extend({  methods ... }) type of coding */
    /* TODO: Apply this patch to require oskari.js */
    Oskari.clazz.category('Oskari.ModuleSpec', 'oskari-2.0-API-extend', {
        extend : function(extendDefinition) {

            var t = typeof extendDefinition;

            if (t === "string") {
                var clazzInfo = cs.extend(this.clazzName, extendDefinition.length ? extendDefinition : [extendDefinition]);
                this.clazzInfo = clazzInfo;
            } else if (t === "object" && extendDefinition.length) {
            	/* derive from given classes */ 
                var clazzInfo = cs.extend(this.clazzName, extendDefinition.length ? extendDefinition : [extendDefinition]);
                this.clazzInfo = clazzInfo;
            } else {
            	/* derive a class from 'this' and apply category to derived class */ 
            	/* used to implement Oskari.Flyout.extend({ funcadelic: function() {} }); kind of adhoc inheritance */
            	var cls = Oskari.cls();
            	cls.extend(this.clazzName);
            	if( extendDefinition ) cls.category(extendDefinition);
                return cls;
            }

            return this;
        }
    });
    
    /* Simplified Application API for Oskari 2.0 */
    /* TODO: move to final location */
    var App = Oskari.cls(undefined,function() {
    	this.instances = {};
    }).methods({
        setConfiguration : function(c) {
            this.config = c;
            return this;
        },
        setStartupSequence : function(startup) {
            this.startupSeq = startup;
            return this;
        },
        setBundles : function(bundles) {
            this.bundles = bundles;
            return this;
        },
        success : function(s) {
            if (this.result)
                s(this.result);
            else
                this.successFunc = s;
            return this;
        },
        start : function() {
            var me = this;
            var app = Oskari.app;
            app.setApplicationSetup(me.startupSeq ? {
                startupSequence : me.startupSeq
            } : {
                startupSequence : []
            });
            app.setConfiguration(me.config || {});
            app.startApplication(function(result) {

                if (me.bundles) {
                    for (var m = 0, mlen = me.bundles.length; m < mlen; m++) {
                        var bundle = me.bundles[m],
                       		instance = bundle.start(),
                       		identifier = instance.identifier||instance.getName();
                        
                        me.instances[identifier] = instance;
                    }
                }

                if (me.successFunc)
                    me.successFunc(me);
                else
                    me.result = result;

            });
            return this;
        },
        stop : function() {
            // nop atm
            Oskari.stopApplication();

        },
        getBundleInstances: function() {
        	return this.instances;
        }
    });


   
    
    /* Generic shortcuts */
    /* TODO: move to final location */
    
    Oskari.Application = App;
    
    var defaultIdentifier = 0;
    var ConfigurableBundle = Oskari.cls(undefined,function() {
    	console.log("CREATED CONFIGURABLE BUNDLE as BASE for BUNDLES");
    },{
    	extend : function(props) {
           var bndlCls = Oskari.bundleCls();
           
           bndlCls.category(props);
           bndlCls.category({
        	   create: function() {
        		   console.log("CREATING BUNDLE INSTANCE ",this.extension,this.identifier,this.locale,this.configuration);
                   var instance = 
                       this.extension.create(this.identifier||'_'+(++defaultIdentifier), this.locale);
                   
                   var configProps = this.configuration;
                   
               	   if (configProps) {
                      instance.conf = instance.conf||{};
                      for (ip in configProps) {
                          if (configProps.hasOwnProperty(ip)) {
                        	  instance.conf[ip] = configProps[ip];
                          }
                      }
                   }
                   console.log("- INSTANCE",instance, "post conf");
        		   return instance;
        	   }
              
           });
          
           console.log("DECLARED BUNDLE CLASS",bndlCls);
           return bndlCls;
        }
       
    });
    
    var confBundle = ConfigurableBundle.create();

 Oskari.Bundle = function(extension, locale, configuration) {
        return confBundle.extend({ extension: extension, locale: locale, configuration: configurationÊ} );
    };


    /* DIVManazer shortcuts */
    /* TODO: move to final location */
    
    /* Simplified Tile, Flyout, Extension and Bundle API for Oskari 2.0 */
    Oskari.Tile = Oskari.tileCls();
    Oskari.Flyout = Oskari.flyoutCls();
    Oskari.Extension = Oskari.extensionCls();

    Oskari.ExtensionEl = function(title,elContent) {
     return Oskari.Extension.extend({
          startPlugin : function() {
             this.setDefaultTile(title);
             this.setFlyout(Oskari.Flyout.extend({
               startPlugin : function() {
                 this.getEl().append(elContent);
               }
             }).create(this, { title: title } ));
          }
      });
    };
 
   
 
    
    return Oskari;

});
