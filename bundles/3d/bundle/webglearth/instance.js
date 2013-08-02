/** This is free software */
/**
 * @class Oskari.3d.bundle.WebGLEarthBundleInstance
 *
 *
 */
Oskari.clazz.define("Oskari.3d.bundle.WebGLEarthBundleInstance", function() {
	this.map = null;
	this.core = null;
	this.sandbox = null;
	this.mapmodule = null;
	this.started = false;
	this.template = null;
	this.plugins = {};


}, {
	/**
	 * @static
	 * @property __name
	 *
	 */
	__name : 'WebGLEarth',
	"getName" : function() {
		return this.__name;
	},
	/**
	 * @method getSandbox
	 *
	 */
	getSandbox : function() {
		return this.sandbox;
	},
	/**
	 * @method start
	 *
	 * implements BundleInstance start methdod
	 *
	 * Note this is async as DOJO requires are resolved and
	 * notified by callback
	 *
	 */
	"start" : function() {
		var me = this;

		if(me.started)
			return;

		me.started = true;

		/*
		 * projection support
		 */
		this.projs = {
			"EPSG:4326" : new Proj4js.Proj("EPSG:4326"),
			"EPSG:3067" : new Proj4js.Proj("EPSG:3067")
		};

		var sandbox = Oskari.$("sandbox");
		me.sandbox = sandbox;

		sandbox.register(me);
		for(p in me.eventHandlers) {
			sandbox.registerForEventByName(me, p);
		}

		/**
		 * Let's extend UI
		 */
		var request = sandbox.getRequestBuilder('userinterface.AddExtensionRequest')(this);

		sandbox.request(this, request);
	},
	"init" : function() {
		return null;
	},
	/**
	 * @method update
	 *
	 * implements bundle instance update method
	 */
	"update" : function() {

	},
	/**
	 * @method onEvent
	 */
	onEvent : function(event) {

		var handler = this.eventHandlers[event.getName()];
		if(!handler)
			return;

		return handler.apply(this, [event]);

	},
	setNE : function(n, e) {
		this.n = n;
		this.e = e;
	},
	func : function() {
		var me = this;
		var n = me.n;
		var e = me.e;

		var pos = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
			x : e,
			y : n
		});

		var lng = pos.x;
		var lat = pos.y;

		this.plugins['Oskari.userinterface.Flyout'].setPosition(lat, lng);
	},
	/**
	 * @property eventHandlers
	 * @static
	 *
	 */
	eventHandlers : {

		"userinterface.ExtensionUpdatedEvent" : function(event) {
			
			if( event.getExtension() != this ) {
				return;
			}
			
			this.plugins['Oskari.userinterface.Flyout'].setViewState(event.getViewState());
			
		},
		/**
		 * @method AfterMapMoveEvent
		 */
		"AfterMapMoveEvent" : function(event) {
			var me = this;
			var sandbox = this.sandbox;

			var scale = event.getScale();


			var n = event.getCenterY();
			var e = event.getCenterX();

			me.sandbox.printDebug("N:" + n + " E:" + e);
	
			me.setNE(n, e);

			window.setTimeout(function() {

				me.func();
			}, 0);
			
		}
	},

	/**
	 * @method stop
	 *
	 * implements bundle instance stop method
	 */
	"stop" : function() {
		var sandbox = this.sandbox();
		for(p in this.eventHandlers) {
			sandbox.unregisterFromEventByName(this, p);
		}

		var request = sandbox.getRequestBuilder('userinterface.RemoveExtensionRequest')(this);

		sandbox.request(this, request);

		this.sandbox.unregister(this);
		this.started = false;
	},
	setSandbox : function(sandbox) {
		this.sandbox = null;
	},
	startExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = Oskari.clazz.create('Oskari.3d.bundle.webglearth.Flyout', this);
		this.plugins['Oskari.userinterface.Tile'] = Oskari.clazz.create('Oskari.3d.bundle.webglearth.Tile', this);
	},
	stopExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = null;
		this.plugins['Oskari.userinterface.Tile'] = null;
	},
	getTitle : function() {
		return "WebGLEarth";
	},
	getDescription : function() {
		return "Sample";
	},
	getPlugins : function() {
		return this.plugins;
	}
}, {
	"protocol" : ["Oskari.bundle.BundleInstance", 'Oskari.mapframework.module.Module', 'Oskari.userinterface.Extension']
});
