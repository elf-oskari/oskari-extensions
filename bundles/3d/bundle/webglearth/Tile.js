/** This is free software */

/*
 * @class Oskari.3d.bundle.webglearth.Tile
 */
Oskari.clazz.define('Oskari.3d.bundle.webglearth.Tile',

/**
 * @method create called automatically on construction
 * @static
 *
 * Always extend this class, never use as is.
 */
function(instance) {
	this.instance = instance;
	this.container = null;
	this.template = null;
}, {
	getName : function() {
		return 'Oskari.3d.bundle.webglearth.Tile';
	},
	setEl : function(el, width, height) {
		this.container = $(el);
	},
	startPlugin : function() {
		this.refresh();
	},
	stopPlugin : function() {
		this.container.empty();
	},
	getTitle : function() {
		return "WebGLEarth";
	},
	getDescription : function() {
	},
	getOptions : function() {

	},
	setState : function(state) {
		this.state = state;
	},
	refresh : function() {
		var me = this;
		var instance = me.instance;
		var cel = this.container;
		var tpl = this.template;
		var sandbox = instance.getSandbox();
		/*
		 var status = cel.children('.oskari-tile-status');
		 status.empty();
		 */
		/*status.append('(' + layers.length + ')');*/

	}
}, {
	'protocol' : ['Oskari.userinterface.Tile']
});
