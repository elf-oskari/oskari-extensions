/*
 * backports Oskari 2 cls api to Oskari 1.x
 */
(function() {
    var cs = Oskari.clazz, o2main = Oskari;
    /* o2 clazz module  */
    var o2anonclass = 0;
    var o2anoncategory = 0;
    var o2anonbundle = 0;

    /* this is Oskari 2 modulespec prototype which provides a leaner API  */

    /* @class Oskari.ModuleSpec
     *
     * helper class instance of which is returned from oskari 2.0 api
     * Returned class instance may be used to chain class definition calls.
     */
    cs.define('Oskari.ModuleSpec', function(clazzInfo, clazzName) {
        this.cs = cs;
        this.clazzInfo = clazzInfo;
        this.clazzName = clazzName;

    }, {

        slicer : Array.prototype.slice,

        /* @method category
         * adds a set of methods to class
         */
        category : function(protoProps, traitsName) {
            var clazzInfo = cs.category(this.clazzName, traitsName || ( ['__', (++o2anoncategory)].join('_')), protoProps);
            this.clazzInfo = clazzInfo;
            return this;
        },
        /* @method methods
         * adds a set of methods to class - alias to category
         */
        methods : function(protoProps, traitsName) {
            var clazzInfo = cs.category(this.clazzName, traitsName || ( ['__', (++o2anoncategory)].join('_')), protoProps);
            this.clazzInfo = clazzInfo;
            return this;
        },

        /* @method extend
         * adds inheritance from  a base class
         * base class can be declared later but must be defined before instantiation
         */
        extend : function(clsss) {
            var clazzInfo = cs.extend(this.clazzName, clsss.length ? clsss : [clsss]);
            this.clazzInfo = clazzInfo;
            return this;
        },
        /* @method create
         * creates an instance of this class
         */
        create : function() {
            return cs.createWithPdefsp(this.clazzInfo, arguments);
        },

        /*
         * @method returns the class name
         */
        name : function() {
            return this.clazzName;
        },

        /*
         * @method returns class metadata
         */
        metadata : function() {
            return cs.metadata(this.clazzName);
        },

        /*
         * @method events
         * adds a set of event handlers to class
         */
        events : function(events) {
            var orgmodspec = this;
            orgmodspec.category({
                eventHandlers : events,
                onEvent : function(event) {
                    var handler = this.eventHandlers[event.getName()];
                    if (!handler) {
                        return;
                    }

                    return handler.apply(this, [event]);
                }
            }, '___events');
            return orgmodspec;
        },
        requests : function(requests) {
            var orgmodspec = this;
            orgmodspec.category({
                requestHandlers : requests,
                onRequest : function(request) {
                    var handler = this.requestHandlers[request.getName()];
                    if (!handler) {
                        return;
                    }

                    return handler.apply(this, [request]);
                }
            }, '___requests');
            return orgmodspec;
        },
        builder : function() {
            return cs.builderFromPdefsp(this.clazzInfo);
        }
    });

    o2main.cls = function(clazzName, ctor, protoProps, metas) {

        var clazzInfo = undefined;

        if (clazzName == undefined) {
            clazzName = ['Oskari', '_', (++o2anonclass)].join('.');
        } else {
            clazzInfo = cs.lookup(clazzName);
        }

        if (clazzInfo && clazzInfo._constructor && !ctor) {
            // lookup
        } else {
            clazzInfo = cs.define(clazzName, ctor ||
            function() {
            }, protoProps, metas || {});
        }

        return cs.create('Oskari.ModuleSpec', clazzInfo, clazzName);

    };

    /* o2 api for event class */
    o2main.eventCls = function(eventName, constructor, protoProps) {
        var clazzName = ['Oskari', 'event', 'registry', eventName].join('.');
        var rv = o2main.cls(clazzName, constructor, protoProps, {
            protocol : ['Oskari.mapframework.event.Event']
        });

        rv.category({
            getName : function() {
                return eventName;
            }
        }, '___event');

        rv.eventName = eventName;

        return rv;
    };

    /* o2 api for request class */
    o2main.requestCls = function(requestName, constructor, protoProps) {
        var clazzName = ['Oskari', 'request', 'registry', requestName].join('.');
        var rv = o2main.cls(clazzName, constructor, protoProps, {
            protocol : ['Oskari.mapframework.request.Request']
        });

        rv.category({
            getName : function() {
                return requestName;
            }
        }, '___request');

        rv.requestName = requestName;

        return rv;
    };

    o2main._baseClassFor = {
        'extension' : "Oskari.userinterface.extension.EnhancedExtension",
        'bundle' : "Oskari.mapframework.bundle.extension.ExtensionBundle",
        'tile' : "Oskari.userinterface.extension.EnhancedTile",
        'flyout' : "Oskari.userinterface.extension.EnhancedFlyout",
        'view' : "Oskari.userinterface.extension.EnhancedView"
    };

    /* o2 api for bundle classes */

    /* @static @method Oskari.extensionCls
     *
     */
    o2main.extensionCls = function(clazzName) {
        return o2main.cls(clazzName).extend(this._baseClassFor.extension);
        /* @static @method Oskari.bundleCls
         *
         */
    }, o2main.bundleCls = function(bnldId, clazzName) {

        if (!bnldId) {
            bnldId = ( ['__', (++o2anonbundle)].join('_'));
        }

        var rv = o2main.cls(clazzName, function() {
        }, {
            update : function() {
            }
        }, {
            "protocol" : ["Oskari.bundle.Bundle", this._baseClassFor.bundle],
            "manifest" : {
                "Bundle-Identifier" : bnldId
            }
        });
        bm.installBundlePdefsp(bnldId, rv.clazzInfo);

        rv.___bundleIdentifier = bnldId;
        rv.loc = function(props) {
            props.key = this.___bundleIdentifier;
            o2main.registerLocalization(props);
            return rv;
        }, rv.start = function(instanceid) {
            var bundleid = this.___bundleIdentifier;

            if (!fcd.bundles[bundleid]) {
                var b = bm.createBundle(bundleid, bundleid);
                fcd.bundles[bundleid] = b;
            }

            var bi = bm.createInstance(bundleid);
            fcd.bundleInstances[bundleid] = bi;

            var configProps = fcd.getBundleInstanceConfigurationByName(bundleid);
            if (configProps) {
                for (ip in configProps) {
                    bi[ip] = configProps[ip];
                }
            }
            bi.start();

            return bi;
        }, rv.stop = function() {
            var bundleid = this.___bundleIdentifier;
            var bi = fcd.bundleInstances[bundleid];
            return bi.stop();
        };

        return rv;
    },
    /**
     * @static @method flyoutCls
     */
    o2main.flyoutCls = function(clazzName) {
        return o2main.cls(clazzName).extend(this._baseClassFor.flyout);
    }
    /* @static @method Oskari.tileCls
     *
     */
    o2main.tileCls = function(clazzName) {
        return o2main.cls(clazzName).extend(this._baseClassFor.tile);
    },
    /* @static @method Oskari.bundleCls
     *
     */
    o2main.viewCls = function(clazzName) {
        return o2main.cls(clazzName).extend(this._baseClassFor.view);
    };

})();
