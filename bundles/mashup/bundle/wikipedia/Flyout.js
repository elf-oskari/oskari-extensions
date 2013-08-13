/**
 * @class Oskari.sample.bundle.wikipedia.wikipediaFlyout
 *
 * Sample extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.mashup.bundle.wikipedia.Flyout',
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

		"content" : '<div class="wikipedia_container"></div>',
		"wikipedia" : '<div class="wikipedia"><div class="wikipedia_title"></div><div class="wikipedia_content"><div class="fid"><a target="_blank"></a></div></div><div class="wikipedia_spinner"></div></div>'

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
		elContainer.parent().parent().addClass("wikipedia_wrapper");
		var elTb = elContainer.parent().parent().find('.oskari-flyouttoolbar')
		elTb.css('height', '16px');
		elTb.css('color', 'white');

		/* alert */
		this.alert = Oskari.clazz.create('Oskari.userinterface.component.Alert');
		this.alert.insertTo(elContainer);

		/* placeholders for data */

		var elWikipedia = jQuery(this.__templates['wikipedia']);
		var elWikipediaContent = elWikipedia.find('.wikipedia_content');
		elWikipedia.find('.wikipedia_title').text(loc.data.wikipedia.title);
		this.els.wikipedia = elWikipedia;

		elContainer.append(elWikipedia);

		/**
		 *
		 */
		var elWikipediaSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elWikipediaSpinnerContainer = elWikipedia.find('.wikipedia_spinner');
		elWikipediaSpinner.insertTo(elWikipediaSpinnerContainer, this.__spinnerConf);
		this.spinners.wikipedia = {
			spinner : elWikipediaSpinner,
			container : elWikipediaSpinnerContainer,
			content : elWikipediaContent
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

	showArticleFeature : function(feat) {

		var me = this, el = me.els.wikipedia.find('.fid').find('a');

		el.empty();

		var url = 'http://' + feat.properties.uri;

		el.attr('href', url);
		el.append(feat.properties.title);
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
