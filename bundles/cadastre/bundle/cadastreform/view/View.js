/**
 * @class Oskari.cadastre.bundle.cadastreform.View
 *
 * Sample extension 'mode' view to show form
 *
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreform.View',
/**
 * @static constructor function
 */
function() {
	this.form = null;
	this.formSelector = null;
	this.conf = null;
	this.formData = {};
}, {

	"selectors" : {
		"pages" : "#contentMap.cadastreform-mode .pages"
	},

	setFormData : function(formSelector, formData) {
		this.formSelector = formSelector;
		this.conf = formData;

	},

	/**
	 * @method startPlugin
	 * called by host to start view operations
	 */
	startPlugin : function() {
		var me = this;
		var sandbox = me.instance.getSandbox();

		this.toolbar = Oskari.clazz.create('Oskari.cadastre.bundle.cadastreform.Toolbar', this.instance);

		var el = me.getEl();
		el.addClass("cadastreform");

		this.setFormData(this.instance.conf.form, this.getLocalization());
	},

	getForm : function() {
		return this.form;
	},

	showMode : function(isShown, blnFromExtensionEvent) {
		var me = this;
		var sandbox = this.instance.getSandbox();
		this.toolbar.show(isShown);

		var mapModule = this.instance.getSandbox().findRegisteredModuleInstance('MainMapModule');
		var map = mapModule.getMap();

		/** Set zoom to min **/

		// CONF!
		var elContentMap = jQuery('#contentMap');
		var elMapDiv = jQuery('#mapdiv');
		var elBody = jQuery('body');
		var elPages = jQuery("#contentMap .pages");

		if (isShown) {
			/** ENTER The Mode */

			if (!this.form) {
				var form = Oskari.clazz.create('Oskari.cadastre.bundle.cadastreform.Form', this.conf.forms[this.formSelector]);
				form.buildForm();
				form.appendTo(elPages);
				this.form = form;
				this.form.refreshData(this.formData);

			} else {
				this.form.refreshData(this.formData);
				this.form.show();
			}

			this.isShown = isShown;

			sandbox.requestByName(this.instance, 'MapFull.MapResizeEnabledRequest', [false]);

			elBody.addClass('cadastreform-mode');
			elContentMap.addClass('cadastreform-mode');
			elMapDiv.addClass('cadastreform-mode');
			elMapDiv.height('');

			/** a hack to notify openlayers of map size change */
			map.updateSize();

			/* temp */
			if (!this.pagesScroller) {
				var pagesContainer = jQuery(this.selectors.pages);
				this.pagesScroller = function() {
					if (me.isShown) {
						console.log(me, "SCROLL");
						map.updateSize();
					} else {
						console.log(me, "WON't SCROLL");
					}
				};
				pagesContainer.scroll(this.pagesScroller);
			}

		} else {
			/** EXIT The Mode */

			if (this.form) {
				this.form.hide();
			}
			
			var pagesContainer = jQuery(this.selectors.pages);

			elMapDiv.removeClass('cadastreform-mode');
			elContentMap.removeClass('cadastreform-mode');
			elBody.removeClass('cadastreform-mode');
			jQuery('.oskariui-mode-content').removeClass('cadastreform-mode');

			elMapDiv.height(jQuery(window).height());

			if (!blnFromExtensionEvent) {
				// reset tile state if not triggered by tile click
				sandbox.postRequestByName('userinterface.UpdateExtensionRequest', [this.instance, 'close']);
			}

			/** a hack to notify openlayers of map size change */
			map.updateSize();

			sandbox.requestByName(this.instance, 'MapFull.MapResizeEnabledRequest', [true]);

			this.isShown = isShown;
		}

	},

	/**
	 * @method stopPlugin
	 * called by host to stop view operations
	 */
	stopPlugin : function() {
		this.toolbar.destroy();

	},
	showContent : function(isShown) {

	},

	showRegisterUnitInfo : function(fid) {
		this.formData['kiinteistotunnus'] = fid;
		if (this.form) {
			this.form.refreshData(this.formData);
		}
	},
	showParcelInfo : function(fid) {
		this.formData['kiinteistotunnus'] = fid;
		if (this.form) {
			this.form.refreshData(this.formData);
		}
	},

	showParcelRelatedInfo : function(geomFeatures) {
		var format = new OpenLayers.Format.GeoJSON();
		for (var n = 0; n < geomFeatures.length; n++) {
			console.log("GEOM", n, format.write(geomFeatures[n].geometry, true));
		}
	},
	hideParcelRelatedInfo : function() {

	},

	showHoverInfo : function(lon, lat, pageX, pageY) {

	}
}, {
	"protocol" : ["Oskari.userinterface.View"],
	"extend" : ["Oskari.userinterface.extension.DefaultView"]
});
