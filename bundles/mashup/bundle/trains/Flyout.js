/**
 * @class Oskari.sample.bundle.trains.trainsFlyout
 *
 * Sample extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.mashup.bundle.trains.Flyout',
/**
 * @static constructor function
 */
function() {
	
	this.els = {};
	this.spinners = {};
	this.ajax = {};

	this.protocols = {};


}, {

	__spinnerConf : {
		lines : 15, // The number of lines to draw
		length : 0, // The length of each line
		width : 5, // The line thickness
		radius : 16, // The radius of the inner circle
		corners : 0, // Corner roundness (0..1)
		rotate : 0, // The rotation offset
		color : '#fff', // #rgb or #rrggbb
		speed : 0.6, // Rounds per second
		trail : 59, // Afterglow percentage
		shadow : false, // Whether to render a shadow
		hwaccel : false, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the spinner
		zIndex : 2e9, // The z-index (defaults to 2000000000)
		top : 'auto', // Top position relative to parent in px
		left : 'auto' // Left position relative to parent in px
	},
	__templates : {

		"content" : '<div class="trains_container"></div>',
		"location" : '<div class="trains_location trains"><div class="trains_title"></div><div class="trains_hover"></div><div class="trains_content"><div class="fid"></div></div><div class="trains_spinner"></div></div>',

		"trains" : '<div class="trains"><div class="trains_title"></div><div class="trains_content"><div class="fid"><a target="_blank"></a></div></div><div class="trains_spinner"></div></div>'

	},

	/**
	 * @method startPlugin
	 * called by host to start flyout operations
	 */
	startPlugin : function() {
		var el = this.getEl();

		/* this gets the flyout part */
		var loc = this.getLocalization();

		var me = this;

		var elContainer = jQuery(me.container);
		elContainer.empty();

	/* hackzone begin */
		elContainer.parent().css("backgroundColor", "transparent");
		elContainer.parent().parent().css("backgroundColor", "transparent");

		/*elContainer.parent().addClass("solsol_wrapper")*/
		elContainer.parent().parent().addClass("trains_wrapper");
		var elTb = elContainer.parent().parent().find('.oskari-flyouttoolbar')
		elTb.css('height', '16px');
		elTb.css('color', 'white');

		/* alert */
		this.alert = Oskari.clazz.create('Oskari.userinterface.component.Alert');
		this.alert.insertTo(elContainer);

		/* placeholders for data */

		var elTrains = jQuery(this.__templates['trains']);
		var elTrainsContent = elTrains.find('.trains_content');
		elTrains.find('.trains_title').text(loc.data.trains.title);
		this.els.trains = elTrains;
		
		elContainer.append(elTrains);
		
		/**
		 *
		 */
		var elTrainsSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elTrainsSpinnerContainer = elTrains.find('.trains_spinner');
		elTrainsSpinner.insertTo(elTrainsSpinnerContainer, this.__spinnerConf);
		this.spinners.trains = {
			spinner : elTrainsSpinner,
			container : elTrainsSpinnerContainer,
			content : elTrainsContent
		};
	},

	showContent : function(isShown) {

	},
	
	showSpinner : function(key, isBusy) {
		var me = this, spinner = me.spinners[key];

		if (isBusy) {
			spinner.container.show();
			spinner.spinner.start();
		} else {
			spinner.spinner.stop();
			spinner.container.hide();
		}
	},

	showTrainFeature: function(feat) {
		
		var me = this, el = me.els.trains.find('.fid').find('a');
		
		el.empty();
		
		el.append(feat.attributes.guid);
	},

	/**
	 * @method stopPlugin
	 * called by host to stop flyout operations
	 */
	stopPlugin : function() {
	}
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
});
