/*
 * PoC: API for Oskari 2.0
 *
 */
define("oskari", function(Oskari) {

    var cs = Oskari.clazz,
    /* Simplified Application API for Oskari 2.0 */
    App = Oskari.cls().methods({
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
                        me.bundles[m].start();
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

        }
    });

    /* Singleton App */
    Oskari.Application = App.create();

    /* Simplified Tile, Flyout, Extension and Bundle API for Oskari 2.0 */
    Oskari.Tile = Oskari.tileCls();
    Oskari.Flyout = Oskari.flyoutCls();
    Oskari.Extension = Oskari.extensionCls();
    Oskari.Bundle = Oskari.bundleCls();

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
    
    return Oskari;

});
