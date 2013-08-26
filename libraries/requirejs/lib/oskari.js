/**
 * oskari requirejs module
 *
 *
 */
var Oskari;

define(['jquery', 'exports', 'css'], function($, exports) {

    var isDebug = false;
    var isConsole = window.console != null && window.console.debug;

    var logMsg = function(msg) {
        if (!isDebug) {
            return;
        }

        if (!isConsole) {
            return;
        }
        window.console.debug(msg);

    }
    /**
     * @class Oskari.bundle_locale
     */
    var bundle_locale = function() {
        this.lang = null;
        this.localizations = {};

    };

    bundle_locale.prototype = {
        setLocalization : function(lang, key, value) {
            if (!this.localizations[lang])
                this.localizations[lang] = {};
            this.localizations[lang][key] = value;
        },
        setLang : function(lang) {
            this.lang = lang;
        },
        getLang : function() {
            return this.lang;
        },
        getLocalization : function(key) {
            return this.localizations[this.lang][key];
        }
    };

    /**
     * let's create locale support
     */
    var blocale = new bundle_locale();

    /*
     * 'dev' adds ?ts=<instTs> parameter to js loads 'default' does not add
     * 'static' assumes srcs are already loaded <any-other> is assumed as a
     * request to load built js packs using this path pattern .../<bundles-path>/<bundle-name>/build/<any-ohther>.js
     */
    var supportBundleAsync = false;
    var mode = 'dev';
    // 'static' / 'dynamic'
    var instTs = new Date().getTime();

    var _preloaded = false;
    function preloaded() {
        return _preloaded;
    }

    var nativeadapter = function() {
        this.packages = {};
        this.protocols = {};
        this.inheritance = {};
        this.aspects = {};
        this.clazzcache = {};
        this.globals = {};
    };

    nativeadapter.prototype = {

        purge : function() {

        },

        protocol : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            // var cdef = args[0];

            return this.protocols[args[0]];

        },

        /* lookup pdefsp */
        pdefsp : function(cdef) {
            var pdefsp = this.clazzcache[cdef];

            var bp = null;
            var pp = null;
            var sp = null;
            if (!pdefsp) {
                var parts = cdef.split('.');
                bp = parts[0];
                pp = parts[1];
                sp = parts.slice(2).join('.');

                var pdef = this.packages[pp];
                if (!pdef) {
                    pdef = {};
                    this.packages[pp] = pdef;
                }
                pdefsp = pdef[sp];
                this.clazzcache[cdef] = pdefsp;

            }
            return pdefsp;
        },

        /**
         * @method metadata
         *
         * Returns metadata for the class
         *
         * @param classname
         *            the name of the class as string
         */
        metadata : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var cdef = args[0];

            var pdefsp = this.pdefsp(cdef);

            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            return pdefsp._metadata;

        },
        /**
         * @method updateMetadata
         * @private
         *
         * Updates and binds class metadata
         */
        "updateMetadata" : function(bp, pp, sp, pdefsp, classMeta) {
            if (!pdefsp._metadata)
                pdefsp._metadata = {};

            pdefsp._metadata['meta'] = classMeta;

            var protocols = classMeta['protocol'];
            if (protocols) {
                for (var p = 0; p < protocols.length; p++) {
                    var pt = protocols[p];

                    if (!this.protocols[pt]) {
                        this.protocols[pt] = {};
                    }

                    var cn = bp + "." + pp + "." + sp;

                    this.protocols[pt][cn] = pdefsp;
                }
            }

        },
        _super : function() {
            var supCat = arguments[0];
            var supMet = arguments[1];
            var me = this;
            return function() {
                return me['_']._superCategory[supCat][supMet].apply(me, arguments);
            }
        },
        /**
         * @method define
         *
         * Creates a class definition
         * @param {String}
         *            classname the name of the class to be defined
         * @param {Function}
         *            constructor constructor function for the class
         * @param {Object}
         *            prototype a property object containing methods and
         *            definitions for the class prototype
         * @param {Object}
         *            metadata optional metadata for the class
         */
        define : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var cdef = args[0];
            var parts = cdef.split('.');

            /*
             * bp base part pp package part sp rest
             */
            var bp = parts[0];

            var pp = parts[1];

            var sp = parts.slice(2).join('.');

            var pdef = this.packages[pp];
            if (!pdef) {
                pdef = {};
                this.packages[pp] = pdef;
            }

            var pdefsp = pdef[sp];

            if (pdefsp) {
                // update constrcutor
                if (args[1]) {
                    pdefsp._constructor = args[1];
                }

                // update prototype
                var catFuncs = args[2];
                var prot = pdefsp._class.prototype;

                for (p in catFuncs) {
                    var pi = catFuncs[p];

                    prot[p] = pi;
                }
                var catName = cdef;
                if (catFuncs) {
                    pdefsp._category[catName] = catFuncs;
                }
                if (args.length > 3) {

                    var extnds = args[3].extend;
                    for (var e = 0; extnds && e < extnds.length; e++) {
                        var superClazz = this.lookup(extnds[e]);
                        if (!superClazz._composition.subClazz)
                            superClazz._composition.subClazz = {};
                        superClazz._composition.subClazz[extnds[e]] = pdefsp;
                        pdefsp._composition.superClazz = superClazz;
                    }

                    this.updateMetadata(bp, pp, sp, pdefsp, args[3]);
                }

                this.pullDown(pdefsp);
                this.pushDown(pdefsp);

                return pdefsp;
            }

            var cd = function() {
            };
            var compo = {
                clazzName : cdef,
                superClazz : null,
                subClazz : null
            };
            cd.prototype = {
            };
            //args[2];
            pdefsp = {
                _class : cd,
                _constructor : args[1],
                _category : {},
                _composition : compo
            };
            cd.prototype['_'] = pdefsp;
            cd.prototype['_super'] = this['_super'];

            // update prototype
            var catFuncs = args[2];
            var prot = cd.prototype;

            for (p in catFuncs) {
                var pi = catFuncs[p];

                prot[p] = pi;
            }
            var catName = cdef;
            if (catFuncs) {
                pdefsp._category[catName] = catFuncs;
            }

            this.inheritance[cdef] = compo;
            pdef[sp] = pdefsp;

            if (args.length > 3) {

                var extnds = args[3].extend;
                for (var e = 0; extnds && e < extnds.length; e++) {
                    var superClazz = this.lookup(extnds[e]);
                    if (!superClazz._composition.subClazz)
                        superClazz._composition.subClazz = {};
                    superClazz._composition.subClazz[cdef] = pdefsp;
                    pdefsp._composition.superClazz = superClazz;
                }

                this.updateMetadata(bp, pp, sp, pdefsp, args[3]);
            }
            this.pullDown(pdefsp);
            this.pushDown(pdefsp);

            return pdefsp;
        },
        /**
         * @method category
         *
         * adds some logical group of methods to class prototype
         *
         * Oskari.clazz.category('Oskari.mapframework.request.common.ActivateOpenlayersMapControlRequest',
         * 'map-layer-funcs',{ "xxx": function() {} });
         */
        category : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var cdef = args[0];
            var parts = cdef.split('.');
            /*
             * bp base part pp package part sp rest
             */
            var bp = parts[0];

            var pp = parts[1];

            var sp = parts.slice(2).join('.');

            var pdef = this.packages[pp];
            if (!pdef) {
                pdef = {};
                this.packages[pp] = pdef;
            }
            var pdefsp = pdef[sp];

            if (!pdefsp) {
                var cd = function() {
                };
                var compo = {
                    clazzName : cdef,
                    superClazz : null,
                    subClazz : null
                };
                cd.prototype = {
                };
                pdefsp = {
                    _class : cd,
                    _constructor : args[1],
                    _category : {},
                    _composition : compo
                };
                cd.prototype['_'] = pdefsp;
                cd.prototype['_super'] = this['_super'];
                this.inheritance[cdef] = compo;
                pdef[sp] = pdefsp;

            }

            var catName = args[1];
            var catFuncs = args[2];
            var prot = pdefsp._class.prototype;

            for (p in catFuncs) {
                var pi = catFuncs[p];

                prot[p] = pi;
            }

            if (catFuncs) {
                pdefsp._category[catName] = catFuncs;
            }

            this.pullDown(pdefsp);
            this.pushDown(pdefsp);

            return pdefsp;
        },

        /**
         * looup and create stub
         */
        lookup : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var cdef = args[0];
            var parts = cdef.split('.');
            /*
             * bp base part pp package part sp rest
             */
            var bp = parts[0];

            var pp = parts[1];

            var sp = parts.slice(2).join('.');

            var pdef = this.packages[pp];
            if (!pdef) {
                pdef = {};
                this.packages[pp] = pdef;
            }
            var pdefsp = pdef[sp];

            if (!pdefsp) {
                var cd = function() {
                };
                cd.prototype = {};
                var compo = {
                    clazzName : cdef,
                    superClazz : null,
                    subClazz : null
                };
                pdefsp = {
                    _class : cd,
                    _constructor : args[1],
                    _category : {},
                    _composition : compo
                };
                this.inheritance[cdef] = compo;
                pdef[sp] = pdefsp;

            }

            return pdefsp;
        },
        extend : function() {
            var args = arguments;
            var superClazz = this.lookup(args[1]);
            var subClazz = this.lookup(args[0]);
            if (!superClazz._composition.subClazz)
                superClazz._composition.subClazz = {};
            superClazz._composition.subClazz[args[0]] = subClazz;
            subClazz._composition.superClazz = superClazz;
            this.pullDown(subClazz);
            return subClazz;
        },
        composition : function() {
            var cdef = arguments[0];

            var pdefsp = this.pdefsp(cdef);
            return pdefsp;
        },
        /**
         * @method pushDown
         *
         * force each derived class to pullDown
         * some overhead here if complex hierarchies are
         * implemented
         *
         */
        pushDown : function(pdefsp) {
            /* !self */
            if (!pdefsp._composition.subClazz) {
                return;
            }
            for (var sub in pdefsp._composition.subClazz) {
                var pdefsub = pdefsp._composition.subClazz[sub];
                this.pullDown(pdefsub);
                this.pushDown(pdefsub);
            }
            return pdefsp;
        },
        /**
         * @method pullDown
         *
         * EACH class is responsible for it's entire hierarchy
         * no intermediate results are being consolidated
         *
         */
        pullDown : function(pdefsp) {
            if (!pdefsp._composition.superClazz) {
                return;
            }

            var clazzHierarchy = [];
            clazzHierarchy.push(pdefsp);

            var funcs = {};
            var spr = pdefsp;
            while (true) {
                spr = spr._composition.superClazz;
                if (!spr) {
                    break;
                }
                clazzHierarchy.push(spr);
            }

            var prot = pdefsp._class.prototype;
            var constructors = [];
            var superClazzMethodCats = {};
            for (var s = clazzHierarchy.length - 1; s >= 0; s--) {
                var cn = clazzHierarchy[s]._composition.clazzName;

                var ctor = clazzHierarchy[s]._constructor;
                constructors.push(ctor);

                var superClazzMetCat = {};
                for (var c in clazzHierarchy[s]._category ) {

                    var catName = cn + "#" + c;
                    var catFuncs = clazzHierarchy[s]._category[c];
                    for (p in catFuncs) {
                        var pi = catFuncs[p];
                        prot[p] = pi;
                        superClazzMetCat[p] = pi;
                    }
                }
                superClazzMethodCats[cn] = superClazzMetCat;
            }
            pdefsp._constructors = constructors;
            pdefsp._superCategory = superClazzMethodCats;

            return pdefsp;
        },

        slicer : Array.prototype.slice,

        /*
         * @method create
         *
         * creates a class instance THIS is for compatibility mode only
         * construct should be used for new classes
         *
         * var x =
         * Oskari.clazz.create('Oskari.mapframework.request.common.ActivateOpenlayersMapControlRequest','12313');
         */
        create : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";
            var instargs = this.slicer.apply(arguments, [1])/*[];
             for(var n = 1; n < args.length; n++)
             instargs.push(args[n]);*/

            var cdef = args[0];

            var pdefsp = this.pdefsp(cdef);
            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            var inst = new pdefsp._class();
            var ctors = pdefsp._constructors;
            if (ctors) {
                for (var c = 0; c < ctors.length; c++) {
                    ctors[c].apply(inst, instargs);
                }
            } else {
                pdefsp._constructor.apply(inst, instargs);
            }
            return inst;
        },
        /*
         * @method create
         *
         * creates a class instance THIS is for compatibility mode only
         * construct should be used for new classes
         *
         * var x =
         * Oskari.clazz.create('Oskari.mapframework.request.common.ActivateOpenlayersMapControlRequest','12313');
         */
        createWithPdefsp : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";
            var instargs = arguments[1];
            var pdefsp = args[0];
            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            var inst = new pdefsp._class();
            var ctors = pdefsp._constructors;
            if (ctors) {
                for (var c = 0; c < ctors.length; c++) {
                    ctors[c].apply(inst, instargs);
                }
            } else {
                pdefsp._constructor.apply(inst, instargs);
            }
            return inst;
        },
        /**
         * @method construct
         *
         * constructs class instance assuming props as single argument to
         * constructor
         *
         *
         */
        construct : function() {
            var args = arguments;
            if (args.length != 2)
                throw "missing arguments";

            var cdef = args[0];
            var instprops = args[1];

            var pdefsp = this.pdefsp(cdef);

            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            var inst = new pdefsp._class();
            var ctors = pdefsp._constructors;
            if (ctors) {
                for (var c = 0; c < ctors.length; c++) {
                    ctors[c].apply(inst, instargs);
                }
            } else {
                pdefsp._constructor.apply(inst, instargs);
            }
            return inst;
        },
        /**
         * @builder
         *
         * Implements Oskari frameworks support for cached class instance
         * builders
         * @param classname
         */
        builder : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var cdef = args[0];

            var pdefsp = this.pdefsp(cdef);

            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            if (pdefsp._builder)
                return pdefsp._builder;

            pdefsp._builder = function() {
                var instargs = arguments;
                var inst = new pdefsp._class();
                var ctors = pdefsp._constructors;
                if (ctors) {
                    for (var c = 0; c < ctors.length; c++) {
                        ctors[c].apply(inst, instargs);
                    }
                } else {
                    pdefsp._constructor.apply(inst, instargs);
                }
                return inst;
            };
            return pdefsp._builder;

        },
        /**
         * @builder
         *
         * Implements Oskari frameworks support for cached class instance
         * builders
         * @param classname
         */
        builderFromPdefsp : function() {
            var args = arguments;
            if (args.length == 0)
                throw "missing arguments";

            var pdefsp = args[0];

            if (!pdefsp)
                throw "clazz " + sp + " does not exist in package " + pp + " bundle " + bp;

            if (pdefsp._builder)
                return pdefsp._builder;

            pdefsp._builder = function() {
                var instargs = arguments;
                var inst = new pdefsp._class();
                var ctors = pdefsp._constructors;
                if (ctors) {
                    for (var c = 0; c < ctors.length; c++) {
                        ctors[c].apply(inst, instargs);
                    }
                } else {
                    pdefsp._constructor.apply(inst, instargs);
                }
                return inst;
            };
            return pdefsp._builder;

        },
        global : function() {
            if (arguments.length == 0)
                return this.globals;
            var name = arguments[0];
            if (arguments.length == 2) {
                this.globals[name] = arguments[1];
            }
            return this.globals[name];

        }
    };

    var clazz_singleton = new nativeadapter();
    var cs = clazz_singleton;

    /**
     * @class Oskari.bundle_mediator
     *
     * A mediator class to support bundle to/from bundle manager communication
     * and initialisation as well as bundle state management
     *
     */
    var bundle_mediator = function(opts) {
        this.manager = null;

        for (p in opts) {
            this[p] = opts[p];
        }
        ;
    };
    bundle_mediator.prototype = {
        /**
         * @method setState
         * @param state
         * @returns
         */
        "setState" : function(state) {
            this.state = state;
            this.manager.postChange(this.bundle, this.instance, this.state);
            return this.state;
        },
        /**
         * @method getState
         * @returns
         */
        "getState" : function() {

            return this.state;
        }
    };

    /**
     * @class Oskari.bundle_trigger
     */
    var bundle_trigger = function(btc, cb, info) {
        this.config = btc;
        this.callback = cb;
        this.fired = false;
        this.info = info;
    };
    bundle_trigger.prototype = {
        /**
         * @method execute
         *
         * executes a trigger callback based on bundle state
         */
        "execute" : function(manager, b, bi, info) {

            var me = this;
            if (me.fired) {
                //manager.log("trigger already fired " + info || this.info);
                return;
            }

            for (p in me.config["Import-Bundle"]) {
                var srcState = manager.stateForBundleSources[p];
                if (!srcState || srcState.state != 1) {
                    manager.log("trigger not fired due " + p + " for " + info || this.info);
                    return;
                }
            }
            me.fired = true;
            manager.log("posting trigger");
            var cb = this.callback;

            window.setTimeout(function() {
                cb(manager);
            }, 0);
        }
    };

    cs.define('Oskari.BundleManager', function() {
        this.serial = 0;
        this.impls = {};
        this.sources = {};
        this.instances = {};
        this.bundles = {};
        this.stateForBundleDefinitions = {};
        this.stateForBundleSources = {};
        this.stateForBundles = {};
        this.stateForBundleInstances = {};
        this.triggers = [];
        this.loaderStateListeners = [];
    }, {
        purge : function() {
            for (var p in this.sources ) {
                delete this.sources[p];
            }
            for (var p in this.stateForBundleDefinitions ) {
                delete this.stateForBundleDefinitions[p].loader;
            }
            for (var p in this.stateForBundleSources ) {
                delete this.stateForBundleSources[p].loader;
            }
        },
        /**
         * @
         */
        notifyLoaderStateChanged : function(bl, finished) {
            if (this.loaderStateListeners.length == 0)
                return;
            for (var l = 0; l < this.loaderStateListeners.length; l++) {
                var cb = this.loaderStateListeners[l];
                cb(bl, finished);
            }
        },
        registerLoaderStateListener : function(cb) {
            this.loaderStateListeners.push(cb);
        },
        /**
         * @method alert
         * @param what
         *
         * a loggin and debugging function
         */
        alert : function(what) {
            logMsg(what);
        },
        /**
         * @method log a loggin and debuggin function
         *
         */
        log : function(what) {
            logMsg(what);

        },
        /**
         * @method self
         * @returns {bundle_manager}
         */
        self : function() {
            return this;
        },

        /* ! NOTE ! implid and bundleid ARE NOT TO BE CONFUSED WITH FACADE'S INSTANCEID OR instances arrays indexes */
        /* ! NOTE ! implid AND bundleid AS WELL AS bnldImpl are most likely always the same value */

        /**
         * @method install
         * @param implid
         *            bundle implementation identifier
         * @param bp
         *            bundle registration function
         * @param srcs
         *            source files
         *
         *
         */
        install : function(implid, bp, srcs, metadata) {
            // installs bundle
            // DOES not INSTANTIATE only register bp as function
            // declares any additional sources required

            var me = this;
            var bundleImpl = implid;
            var defState = me.stateForBundleDefinitions[bundleImpl];
            if (defState) {
                defState.state = 1;
                me.log("SETTING STATE FOR BUNDLEDEF " + bundleImpl + " existing state to " + defState.state);
            } else {
                defState = {
                    state : 1
                };

                me.stateForBundleDefinitions[bundleImpl] = defState;
                me.log("SETTING STATE FOR BUNDLEDEF " + bundleImpl + " NEW state to " + defState.state);
            }
            defState.metadata = metadata;

            me.impls[bundleImpl] = bp;
            me.sources[bundleImpl] = srcs;

            var srcState = me.stateForBundleSources[bundleImpl];
            if (srcState) {
                if (srcState.state == -1) {
                    me.log("triggering loadBundleSources for " + bundleImpl + " at loadBundleDefinition");
                    window.setTimeout(function() {
                        me.loadBundleSources(bundleImpl);
                    }, 0);
                } else {
                    me.log("source state for " + bundleImpl + " at loadBundleDefinition is " + srcState.state);
                }
            }
            me.postChange(null, null, "bundle_definition_loaded");
        },
        /**
         * @method installBundleClass
         * @param implid
         * @param bp
         * @param srcs
         *
         * Installs a bundle defined as Oskari native Class
         */
        installBundleClass : function(implid, clazzName) {

            var classmeta = cs.metadata(clazzName);
            var bp = cs.builder(clazzName);
            var srcs = classmeta.meta.source;
            var bundleMetadata = classmeta.meta.bundle;

            this.install(implid, bp, srcs, bundleMetadata);

        },
        /**
         * @method installBundlePdefs
         * @param implid
         * @param bp
         * @param srcs
         *
         * Installs a bundle defined as Oskari native Class
         */
        installBundlePdefsp : function(implid, pdefsp) {

            var bp = cs.builderFromPdefsp(pdefsp);
            var bundleMetadata = pdefsp._metadata;
            var srcs = {};

            this.install(implid, bp, srcs, bundleMetadata);

        },
        /**
         * @method impl
         * @param implid
         * @returns bundle implemenation
         *
         */
        impl : function(implid) {
            return this.impls[implid];
        },

        /**
         * @method postChange
         * @private
         * @param b
         * @param bi
         * @param info
         *
         * posts a notification to bundles and bundle instances
         *
         */
        postChange : function(b, bi, info) {
            // self
            var me = this;
            me.update(b, bi, info);

            // bundles
            for (bid in me.bundles) {
                var o = me.bundles[bid];
                o.update(me, b, bi, info);

            }
            // and instances
            for (i in me.instances) {
                var o = me.instances[i];
                if (!o)
                    continue;
                o.update(me, b, bi, info);
            }

        },
        /**
         * @method createBundle
         * @param implid
         * @param bundleid
         * @param env
         * @returns
         *
         * Creates a Bundle (NOTE NOT an instance of bundle)
         * implid, bundleid most likely same value
         */
        createBundle : function(implid, bundleid) {
            // sets up bundle runs the registered func to instantiate bundle
            // this enables 'late binding'
            var bundlImpl = implid;
            var me = this;
            var defState = me.stateForBundleDefinitions[bundlImpl];
            if (!defState) {
                throw "INVALID_STATE: for createBundle / " + "definition not loaded " + implid + "/" + bundleid;
            }

            var bp = this.impls[implid];
            if (!bp) {
                alert("this.impls[" + implid + "] is null!");
                return;
            }
            var b = bp(defState);

            this.bundles[bundleid] = b;
            this.stateForBundles[bundleid] = {
                state : true,
                bundlImpl : bundlImpl
            };

            this.postChange(b, null, "bundle_created");

            return b;
        },

        /**
         * @method update
         * @param bundleid
         * @returns
         *
         * fires any pending bundle or bundle instance triggers
         *
         */
        update : function(b, bi, info) {

            var me = this;
            me.log("update called with info " + info);

            for (var n = 0; n < me.triggers.length; n++) {
                var t = me.triggers[n];
                t.execute(me);
            }
        },
        /**
         * @method bundle
         * @param bundleid
         * @returns bundle
         */
        bundle : function(bundleid) {
            return this.bundles[bundleid];
        },
        /**
         * @method destroyBundle
         * @param bundleid
         *
         * NYI. Shall DESTROY bundle definition
         */
        destroyBundle : function(bundleid) {
            // var bi = this.impls[bundleid];
        },
        /**
         * @method uninsttall
         * @param implid
         * @returns
         *
         * removes bundle definition from manager Does NOT remove bundles or bundle
         * instances currently.
         */
        uninstall : function(implid) {
            var bp = this.impls[implid];
            return bp;
        },
        /**
         * creates a bundle instance for previously installed and created bundle
         */
        createInstance : function(bundleid) {
            // creates a bundle_instance
            // any configuration and setup IS BUNDLE / BUNDLE INSTANCE specific
            // create / config / start / process / stop / destroy ...

            var me = this;
            if (!me.stateForBundles[bundleid] || !me.stateForBundles[bundleid].state) {
                throw "INVALID_STATE: for createInstance / " + "definition not loaded " + bundleid;
            }

            var s = "" + (++this.serial);

            var b = this.bundles[bundleid];
            var bi = b["create"]();

            bi.mediator = new bundle_mediator({
                "bundleId" : bundleid,
                "instanceid" : s,
                "state" : "initial",
                "bundle" : b,
                "instance" : bi,
                "manager" : this,
                "clazz" : cs,
                "requestMediator" : {}
            });

            this.instances[s] = bi;
            this.stateForBundleInstances[s] = {
                state : true,
                bundleid : bundleid
            };

            this.postChange(b, bi, "instance_created");
            return bi;
        },
        /**
         * @method instance
         * @param instanceid
         * @returns bundle instance
         */
        instance : function(instanceid) {

            return this.instances[instanceid];
        },
        /**
         * @method destroyInstance
         * @param instanceid
         * @returns
         *
         * destroys and unregisters bundle instance
         */
        destroyInstance : function(instanceid) {

            var bi = this.instances[instanceid];
            var mediator = bi.mediator;
            mediator.bundle = null;
            mediator.manager = null;
            mediator.clazz = null;

            bi.mediator = null;

            this.instances[instanceid] = null;
            bi = null;

            return bi;
        },
        /**
         * @method on
         * @param config
         * @param callback
         *
         * trigger registration
         */
        on : function(cfg, cb, info) {
            this.triggers.push(new bundle_trigger(cfg, cb, info));
        }
    });

    clazz_singleton.define('Oskari.BundleFacade', function(bm) {
        this.manager = bm;

        this.bundles = {};
        this.bundleInstances = {};
        /* keyed by identifier */
        this.appSetup = null;

        this.bundlePath = "";

        /**
         * @property appConfig
         * application configuration (state) for instances
         * this is injected to instances before 'start' is called
         *
         */
        this.appConfig = {};
    }, {

        /**
         * @method getBundleInstanceByName
         *
         * returns bundle_instance by bundleinstancename defined in player json
         */
        getBundleInstanceByName : function(bundleinstancename) {
            var me = this;
            return me.bundleInstances[bundleinstancename];
        },
        /**
         * @method getBundleInstanceConfigurationByName
         *
         * returns configuration for instance by bundleinstancename
         */
        getBundleInstanceConfigurationByName : function(bundleinstancename) {
            var me = this;
            return me.appConfig[bundleinstancename];
        },

        setConfiguration : function(config) {
            this.appConfig = config;
        },
        getConfiguration : function() {
            return this.appConfig;
        }
    });

    /**
     *
     */

    /**
     * let's create bundle manager singleton
     */
    var bm = cs.create('Oskari.BundleManager');
    bm.clazz = cs;

    /**
     * let's create bundle facade for bundle manager
     */
    var fcd = cs.create('Oskari.BundleFacade', bm);
    var ga = cs.global;

    cs.define('Oskari.DomManager', function(dollar) {
        this.$ = dollar;
    }, {
        getEl : function(selector) {
            return this.$(selector);
        },
        getElForPart : function(part) {
            throw "N/A";
        },
        setElForPart : function(part, el) {
            throw "N/A";
        },
        setElParts : function(partsMap) {
            throw "N/A";
        },
        getElParts : function() {
            throw "N/A";
        },
        pushLayout : function(s) {
            throw "N/A";
        },
        popLayout : function(s) {
            throw "N/A";
        },
        getLayout : function() {
            throw "N/A";
        }
    });

    var domMgr = cs.create('Oskari.DomManager', $);

    /* o2 clazz module  */
    var o2anonclass = 0;
    var o2anoncategory = 0;
    var o2anonbundle = 0;

	/* this is Oskari 2 modulespec prototype which provides a leaner API  */
	
    cs.define('Oskari.ModuleSpec', function(clazzInfo, clazzName) {
        this.cs = cs;
        this.clazzInfo = clazzInfo;
        this.clazzName = clazzName;
    }, {

        slicer : Array.prototype.slice,
        category : function(protoProps, traitsName) {
            var clazzInfo = cs.category(this.clazzName, traitsName || ( ['__', (++o2anoncategory)].join('_')), protoProps);
            this.clazzInfo = clazzInfo;
            return this;
        },
        extend : function(clsss) {
            var clazzInfo = cs.extend(this.clazzName, clsss.length ? clsss : [clsss]);
            this.clazzInfo = clazzInfo;
            return this;
        },
        construct : function(props) {
            return cs.construct(this.clazzName, props);
        },
        create : function() {
            return cs.createWithPdefsp(this.clazzInfo, arguments);
        },
        name : function() {
            return this.clazzName;
        },
        metadata : function() {
            return cs.metadata(this.clazzName);
        },
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

    /**
     * @static
     * @property Oskari
     */
    var bndl = {
        bundle_manager : bm, /* */
        bundle_facade : fcd,
        bundle_locale : blocale,
        app : fcd, /* */
        clazz : cs,

        /**
         * @method Oskari.$
         */
        "$" : function() {
            ;
            return ga.apply(cs, arguments);
        },
        /** @static
         *  @property Oskari.clazzadapter
         *  prototype for a class namespace adapter class
         */
        //clazzadapter : clazzadapter,

        run : function(func) {
            func();
        },
        /**
         * @static
         * @method Oskari.setLoaderMode
         */
        setLoaderMode : function(m) {
            mode = m;
        },
        getLoaderMode : function() {
            return mode;
        },
        setDebugMode : function(d) {
            isDebug = d;
        },
        setSupportBundleAsync : function(a) {
            supportBundleAsync = a;
        },
        getSupportBundleAsync : function() {
            return supportBundleAsync;
        },
        setBundleBasePath : function(bp) {
            basePathForBundles = bp;
        },
        getBundleBasePath : function() {
            return basePathForBundles;
        },
        setPreloaded : function(usep) {
            _preloaded = usep;
        },
        getPreloaded : function() {
            return _preloaded;
        },
        /**
         * @static
         * @method Oskari.registerLocalization
         */
        registerLocalization : function(props) {
            if (props.length) {
                for (var p = 0; p < props.length; p++) {
                    var pp = props[p];
                    blocale.setLocalization(pp.lang, pp.key, pp.value);
                }
            } else {
                return blocale.setLocalization(props.lang, props.key, props.value);
            }
        },
        /**
         * @static
         * @method Oskari.getLocalization
         */
        getLocalization : function(key) {
            return blocale.getLocalization(key);
        },
        /**
         * @static
         * @method Oskari.getLang
         */
        getLang : function() {
            return blocale.getLang();
        },
        /**
         * @static
         * @method Oskari.setLang
         */
        setLang : function(lang) {
            return blocale.setLang(lang);
        },
        /**
         * @static
         * @method Oskari.purge
         */
        purge : function() {
            bm.purge();
            cs.purge("Oskari");
        },
        /**
         * @static
         * @method Oskari.getDomManager
         */
        getDomManager : function() {
            return domMgr;
        },
        /**
         * @static
         * @method Oskari.setDomManager
         */
        setDomManager : function(dm) {
            domMgr = dm;
        },
        /**
         * @static
         * @method getSandbox
         */
        getSandbox : function(sandboxName) {
            return ga.apply(cs, [sandboxName || 'sandbox'])
        },
        /**
         * @static
         * @method setSandbox
         */
        setSandbox : function(sandboxName, sandbox) {
            return ga.apply(cs, [sandboxName || 'sandbox', sandbox])
        },

        /**
         * @static
         * @method registerMimeTypeToPlugin
         * @param mimeType mimetype to be mapped
         * @param pluginMapFunc requirejs plugin
         */
        registerMimeTypeToPlugin : function(mimeType, plugin) {
            blMimeTypeToPlugin[mimeType] = plugin;
        },

        /* O2 builders and helpers */
        /* NOTE REQUIRES SOME CHANGES TO CLAZZ IMPL return pdefsp etc calls */

        cls : function(clazzName, ctor, protoProps, metas) {

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
        },

        sandbox : function(sandboxName) {

            var sandboxref = {
                sandbox : ga.apply(cs, [sandboxName || 'sandbox'])
            };

            sandboxref.on = function(instance) {
                var me = this;
                if (instance.eventHandlers) {
                    for (p in instance.eventHandlers) {
                        me.sandbox.registerForEventByName(instance, p);
                    }
                }
                if (instance.requestHandlers) {
                    for (r in instance.requestHandlers ) {
                        me.sandbox.addRequestHandler(r, reqHandlers[r]);
                    }
                }
            }, sandboxref.off = function(instance) {
                if (instance.eventHandlers) {
                    for (p in instance.eventHandlers) {
                        me.sandbox.unregisterFromEventByName(instance, p);
                    }
                }
                if (instance.requestHandlers) {
                    for (r in instance.requestHandlers ) {
                        me.sandbox.removeRequestHandler(r, reqHandlers[r]);
                    }
                }
            }, sandboxref.slicer = Array.prototype.slice, sandboxref.notify = function(eventName) {
                var me = this;
                var sandbox = me.sandbox;
                var builder = me.sandbox.getEventBuilder(eventName);
                var args = me.slicer.apply(arguments, [1]);
                var eventObj = eventBuilder.apply(eventBuilder, args);
                return sandbox.notifyAll(eventObj);
            };

            return sandboxref;

        },

        loc : function() {
            return bndl.registerLocalization.apply(bndl, arguments);
        }
    };

    /* o2 api for event class */
    bndl.eventCls = function(eventName, constructor, protoProps) {
        var clazzName = ['Oskari', 'event', 'registry', eventName].join('.');
        var rv = bndl.cls(clazzName, constructor, protoProps, {
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
    bndl.requestCls = function(requestName, constructor, protoProps) {
        var clazzName = ['Oskari', 'request', 'registry', requestName].join('.');
        var rv = bndl.cls(clazzName, constructor, protoProps, {
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

    /* o2 api for request handlers - note restriction: one for each request - no overrides */
    bndl.requestHandlerCls = function(requestCls, impl) {
        var clazzName = ['Oskari', 'requesthandler', 'registry', requestCls.getName()].join('.');
        var rv = bndl.cls(clazzName, function() {
        }, {
            handleRequest : function(core, request) {
                return impl(request);
            }
        }, {
            protocol : ['Oskari.mapframework.core.RequestHandler']
        });
        rv.requestName = requestCls.getName();

        return rv;
    };

    /* o2 api for bundle classes */
    bndl.bundleCls = function(bnldId, clazzName) {

        if (!bnldId) {
            bnldId = ( ['__', (++o2anonbundle)].join('_'));
        }

        var rv = bndl.cls(clazzName, function() {
        }, {
            update : function() {
            }
        }, {
            "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
            "manifest" : {
                "Bundle-Identifier" : bnldId
            }
        });
        bm.installBundlePdefsp(bnldId, rv.clazzInfo);

        rv.___bundleIdentifier = bnldId;
        rv.loc = function(props) {
            props.key = this.___bundleIdentifier;
            bndl.registerLocalization(props);
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
    };

    /**
     * Let's register Oskari as a Oskari global
     */
    ga.apply(cs, ['Oskari', bndl]);

    /*
     * window.bundle = bndl; window.Oskari = bndl;
     */

    Oskari = bndl;

    exports.Oskari = bndl;
    return bndl;
});
