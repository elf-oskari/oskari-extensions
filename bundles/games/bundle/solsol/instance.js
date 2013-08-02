/**
 * @class Oskari.poc.jquery.bundle.FeatureInfoBundleInstance
 *
 */
Oskari.clazz.define("Oskari.games.bundle.solsol.SolSolBundleInstance", function() {
	this.map = null;
	this.core = null;
	this.sandbox = null;
	this.mapmodule = null;
	this.started = false;
	this.template = null;
	this.plugins = {};
	
	this.player = null;

	/**
	 * @property injected yuilibrary property (by bundle)
	 */
	this.yuilibrary = null;

}, {
	/**
	 * @static
	 * @property __name
	 *
	 */
	__name : 'SolSol',
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

		var player = Oskari.clazz
								.create('Oskari.mapframework.solsol.SolSolPlayer');
		player.createAI();
		this.player = player;

		me.started = true;

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

		/**
		 * let's load dependencies me
		 */
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
	
	
		
	/**
	 * @property eventHandlers
	 * @static
	 *
	 */
	eventHandlers : {
	
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
		this.player.shutdown();
		
		var request = sandbox.getRequestBuilder('userinterface.RemoveExtensionRequest')(this);

		sandbox.request(this, request);

		this.sandbox.unregister(this);
		this.started = false;
	},
	setSandbox : function(sandbox) {
		this.sandbox = null;
	},
	startExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = Oskari.clazz.create('Oskari.games.bundle.solsol.Flyout', this,this.player);
		this.plugins['Oskari.userinterface.Tile'] = Oskari.clazz.create('Oskari.games.bundle.solsol.Tile', this,this.player);
	},
	stopExtension : function() {
		this.plugins['Oskari.userinterface.Flyout'] = null;
		this.plugins['Oskari.userinterface.Tile'] = null;
	},
	getTitle : function() {
		return "Pasianssi";
	},
	getDescription : function() {
		return "Pasianssi";
	},
	getPlugins : function() {
		return this.plugins;
	},
	/**
	 * @method refresh
	 *
	 * (re)creates selected layers to a hardcoded DOM div
	 * #leaflet This
	 */
	refresh: function() {
		var me = this;

		/*this.plugins['Oskari.userinterface.Flyout'].setup();
		this.plugins['Oskari.userinterface.Tile'].setup();*/

	}
}, {
	"protocol" : ["Oskari.bundle.BundleInstance", 'Oskari.userinterface.Extension']
});
