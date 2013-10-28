/*
 * PoC: API for Oskari 2.0
 *
 */
define("oskari", function(Oskari) {

    var cs = Oskari.clazz;
    
    /* Patches required to Oskari 1.0 */

    /* Patch to enable common extend({  methods ... }) type of coding */
    Oskari.clazz.category('Oskari.ModuleSpec', 'oskari-2.0-API-extend', {
        extend : function(clsss) {

            var t = typeof clsss;

            if (t === "string") {
                var clazzInfo = cs.extend(this.clazzName, clsss.length ? clsss : [clsss]);
                this.clazzInfo = clazzInfo;
            } else if (t === "object" && clsss._) {
                this.category(clsss._.categories[clsss._.composition.clazzName]);
            } else if (t === "object" && clsss.length) {
                var clazzInfo = cs.extend(this.clazzName, clsss.length ? clsss : [clsss]);
                this.clazzInfo = clazzInfo;
            } else {
                this.category(clsss);

            }

            return this;
        }
    });
    
    /* Simplified Application API for Oskari 2.0 */
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
                       		identifier = instance.identifier;
                        
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

    /* Singleton App */
    Oskari.Application = App;

    /* Simplified Tile, Flyout, Extension and Bundle API for Oskari 2.0 */
    Oskari.Tile = Oskari.tileCls();
    Oskari.Flyout = Oskari.flyoutCls();
    Oskari.Extension = Oskari.extensionCls();
    
    var defaultIdentifier = 0;
    Oskari.Bundle = Oskari.bundleCls().extend({
    	create : function() {
    	   console.log("CREATING BUNDLE INSTANCE ",this.extension,this.identifier,this.locale,this.configuration);
           var instance = 
        	   	this.extension.create(this.identifier||'_'+(++defaultIdentifier), this.locale);
           if( this.configuration ) {
        	   instance.conf = this.configuration;
           }
           return instance;
        }
    });

    
    return Oskari;

});