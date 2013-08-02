/*
 * @class Oskari.poc.yuilibrary.leaflet.Tile
 */
Oskari.clazz.define('Oskari.games.bundle.solsol.Tile',

/**
 * @method create called automatically on construction
 * @static
 *
 * Always extend this class, never use as is.
 */
function(instance,player) {
	this.instance = instance;
	this.container = null;
	this.template = null;
	this.player = player;
}, {
	getName : function() {
		return 'Oskari.games.bundle.solsol.Tile';
	},
	setEl : function(el, width, height) {
		this.container = $(el);
	},
	startPlugin : function() {
		this.setup();
	},
	stopPlugin : function() {
		this.container.empty();
	},
	getTitle : function() {
		return "Pasianssi";
	},
	getDescription : function() {
	},
	getOptions : function() {

	},
	setState : function(state) {
		console.log("Tile.setState", this, state);
	},
	setup : function() {
		var me = this;
		var instance = me.instance;
		var cel = this.container;
		var tpl = this.template;
		var sandbox = instance.getSandbox();
		var layers = sandbox.findAllSelectedMapLayers();

		/*var status = cel.children('.oskari-tile-status');
		 status.empty();

		 status.append('(' + layers.length + ')');*/

	}
}, {
	'protocol' : ['Oskari.userinterface.Tile']
});
