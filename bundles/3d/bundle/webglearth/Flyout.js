/**
 * @class Oskari.3d.bundle.webglearth.Flyout
 */
Oskari.clazz.define('Oskari.3d.bundle.webglearth.Flyout',

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
	this.state = null;
	this.layercontrols = {};
}, {
	getName : function() {
		return 'Oskari.3d.bundle.webglearth.Flyout';
	},
	setEl : function(el, width, height) {
		this.container = el[0];
	
	},
	startPlugin : function() {
		var me = this;

		var tpl = me.template;

		if(!tpl) {
			tpl = jQuery('<div style="width:600px;height:400px;border:1px solid gray; padding:2px;"></div>');
			me.template = tpl;
		}

		var cel = jQuery(this.container);

		var sandbox = me.instance.getSandbox();

		cel.empty();

		var earthDiv = tpl.clone();
		this.earthDiv = earthDiv.get()[0];

		cel.append(earthDiv);

	},
	stopPlugin : function() {

	},
	getTitle : function() {
		return "WebGLEarth";
	},
	getDescription : function() {
	},
	getOptions : function() {

	},
	setViewState : function(state) {
		var earthDiv = this.earthDiv;
		this.state = state;
		if(state == 'attach' || state == 'detach') {
			if(!this.earth) {
				var options = {
					zoom : 3.0,
					position : [47.19537, 8.524404]
				};
				var earth = new WebGLEarth(earthDiv, options);

				this.earth = earth;
			}
		}
	},
	setPosition : function(lat, lng) {
		if( !this.earth ) {
			return;
		}
		this.earth.flyTo(lat, lng);
	}
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
