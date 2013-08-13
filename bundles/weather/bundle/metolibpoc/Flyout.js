/**
 * @class Oskari.social.bundle.mapviewlog.mapviewlogFlyout
 *
 * framework extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 * Contains 2 copy-pasted funcs from metolib samples
 *
 */
Oskari.clazz.define('Oskari.weather.bundle.metolibpoc.Flyout',
/**
 * @static constructor function
 */
function() {
	this.ref = new Date().getTime();
	this.max = 0;
	this.projs = {};

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

		"content" : '<div class="weather_container"></div>',
		"weather" : '<div class="weather"><div class="weather_title"></div><div class="weather_content"><div class="fid"><a target="_blank"></a></div></div><div class="weather_spinner"></div></div>'

	},

	/**
	 * @method createProjs
	 *
	 * Creates OpenLayers Projections for this bundle
	 * this
	 */
	createProjs : function() {
		var me = this;

		/*
		 * projection support
		 */
		this.projs = {
			"EPSG:4326" : new Proj4js.Proj("EPSG:4326"),
			"EPSG:3067" : new Proj4js.Proj("EPSG:3067")
		};
	},

	/**
	 * @method startPlugin
	 * called by host to start flyout operations
	 */
	startPlugin : function() {
		var el = this.getEl();

		this.createProjs();

		/* this gets the flyout part */
		var loc = this.getLocalization();

		var me = this;

		var elContainer = jQuery(me.container);
		elContainer.empty();
		elContainer.addClass('metolibpoc');

		/* hackzone begin */
		elContainer.parent().css("backgroundColor", "transparent");
		elContainer.parent().parent().css("backgroundColor", "transparent");

		/*elContainer.parent().addClass("solsol_wrapper")*/
		elContainer.parent().parent().addClass("metolibpoc_wrapper");
		var elTb = elContainer.parent().parent().find('.oskari-flyouttoolbar')
		elTb.css('height', '16px');
		elTb.css('color', 'white');

		/* alert */
		this.alert = Oskari.clazz.create('Oskari.userinterface.component.Alert');
		this.alert.insertTo(elContainer);

		/* placeholders for data */

		var elWeather = jQuery(this.__templates['weather']);
		var elWeatherContent = elWeather.find('.weather_content');
		this.els.weather = elWeather;

		elContainer.append(elWeather);

		/**
		 *
		 */
		var elWeatherSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elWeatherSpinnerContainer = elWeather.find('.weather_spinner');
		elWeatherSpinner.insertTo(elWeatherSpinnerContainer, this.__spinnerConf);
		this.spinners.weather = {
			spinner : elWeatherSpinner,
			container : elWeatherSpinnerContainer,
			content : elWeatherContent
		};

		window.setTimeout(function() {
			elContainer.empty();
			me.refresh();
		}, 500);

		elContainer.click(function() {
			elContainer.empty();
			me.refresh();
		});

	},

	refresh : function() {
		var me = this;
		var el = jQuery(me.container);

		var map = me.instance.getSandbox().getMap();
		var extent = map.getExtent();

		var leftBottom = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
			x : extent.left,
			y : extent.bottom
		});

		var rightTop = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
			x : extent.right,
			y : extent.top
		});

		var transformedExtent = {
			left : leftBottom.x,
			bottom : leftBottom.y,
			right : rightTop.x,
			top : rightTop.y
		};

		var bboxTemplate = [transformedExtent.left, transformedExtent.bottom, transformedExtent.right, transformedExtent.top];

		var bbox = bboxTemplate.join(',');
		//"21,60,24,65" ;

		/* Metolib sample example embed begin */

		/**
		 * Handle parser results in this callback function.
		 *
		 * Append result strings to the UI.
		 *
		 * @param {Object} data Parsed data.
		 * @param {Object} errors Parser errors.
		 * @param {String} test case name.
		 */

		/**
		 * This function recursively browses the given {data} structure and appends the content as text
		 * to the {container} element.
		 *
		 * @param {Element} container Content is appended as a text here.
		 * @param {Object|Array|String|etc} data Content that is browsed through recursively.
		 * @param {String} indentStr Indentation string of the previous recursion level.
		 */
		function recursiveBrowse(container, data, indentStr) {
			if (_.isArray(data) || _.isObject(data)) {
				// Browse all the child items of the array or object.
				indentStr += ">";
				_.each(data, function(value, key) {
					container.append("<br>" + indentStr + " [" + key + "]");
					recursiveBrowse(container, value, indentStr);
				});

			} else {
				// This is a leaf. So, just append it after its container array or object.
				container.append(" > " + data);
			}
		}

		/*function handleCallback(el, data, errors, caseName) {
			var results = el;
			results.append("<h2>" + caseName + "</h2>");
			if (data) {
				results.append("<h3>Data object</h3>");
				recursiveBrowse(results, data, "");
			}
			if (errors) {
				results.append("<h3>Errors object</h3>");
				recursiveBrowse(results, errors, "");
			}
		}*/

		/* Metolib sample example embed end */

		me.showSpinner('weather', true);
		me.instance.processWeather(bbox, function(data, errors) {

			me.showSpinner('weather', false);

			console.log('weatherdata', data, errors);
			el.empty();
			/*handleCallback(el, data, errors, "Spatial td wind");*/

		});

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

	showContent : function(isShown) {
		if (!isShown) {
			return;
		}

		this.refresh();
	},

	showWeatherFeature : function(feat) {
		var me = this, el = jQuery(me.container);
		el.empty();
		function recursiveBrowse(container, data, indentStr) {
			if (_.isArray(data) || _.isObject(data)) {
				// Browse all the child items of the array or object.
				indentStr += ">";
				_.each(data, function(value, key) {
					container.append("<br>" + indentStr + " [" + key + "]");
					recursiveBrowse(container, value, indentStr);
				});

			} else {
				// This is a leaf. So, just append it after its container array or object.
				container.append(" > " + data);
			}
		}
		recursiveBrowse(el, feat, " > ");
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
