/**
 * @class Oskari.poc.yuilibrary.leaflet.Flyout
 */
Oskari.clazz.define('Oskari.games.bundle.solsol.Flyout',

/**
 * @method create called automatically on construction
 * @static
 *
 * Always extend this class, never use as is.
 */
function(instance,player) {
	this.player = player;
	this.instance = instance;
	this.container = null;
	this.template = null;
	this.state = null;
	
}, {
	getName : function() {
		return 'Oskari.games.bundle.solsol.Flyout';
	},
	setEl : function(el, width, height) {
		this.container = el[0];
		
	},
	startPlugin : function() {
		
		this.templates = {
			game: $('<div class="solsol"></div>'),
			toolbar : $('<div class="solsol_toolbar"><button class="solsol_btn_play" style="display:none"/><button class="solsol_btn_pause" /><button class="solsol_btn_new" /></div>')
		};
		
		this.setup();
		
	},
	stopPlugin : function() {

	},
	getTitle : function() {
		return "Pasianssi";
	},
	getDescription : function() {
	},
	getOptions : function() {

	},
	setState : function(state) {
		this.state = state;
		
	},
	setup : function() {
		var me = this;
		var sandbox = me.instance.getSandbox();
		var elContainer = jQuery(me.container);
		elContainer.empty();
		
		/* hackzone begin */
		elContainer.parent().css("backgroundColor","transparent");
		elContainer.parent().parent().css("backgroundColor","transparent");
		
        /*elContainer.parent().addClass("solsol_wrapper")*/
        elContainer.parent().parent().addClass("solsol_wrapper");
        
        /* hackzone end */
	
		var elGame = jQuery(me.templates.game).clone();
		var elToolbar = jQuery(me.templates.toolbar).clone();
		
		var me = this;
		elToolbar.children('.solsol_btn_play').click(function() {
			me.player.solStart();
			elToolbar.children('.solsol_btn_play').hide();
			elToolbar.children('.solsol_btn_pause').show();
		});
			elToolbar.children('.solsol_btn_pause').click(function() {
			me.player.solStart();
			elToolbar.children('.solsol_btn_pause').hide();
			elToolbar.children('.solsol_btn_play').show();
		});
		elToolbar.children('.solsol_btn_new').click(function() {
			me.player.solNewGame();
		});
		
		jQuery(me.container).append(elGame);
		jQuery(me.container).append(elToolbar);
		
		this.player.startup(elGame.get()[0]);
	     
	}
}, {
	'protocol' : ['Oskari.userinterface.Flyout']
});
