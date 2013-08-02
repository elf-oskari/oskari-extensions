/**
 * @class Oskari.cadastre.bundle.cadastreinfo.CadastreInfoBundleInstance
 *
 * Sample extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreinfo.CadastreInfoBundleInstance',
/**
 * @static constructor function
 */
function() {
	this.conf = {};
	this.layers = {};

}, {
	"init" : function() {
		return null;
	},

	"eventHandlers" : {
		'ParcelSelector.ParcelSelectedEvent' : function(event) {
			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
			flyout.showParcelInfo(event.getFid());
		},
		'ParcelSelector.RegisterUnitSelectedEvent' : function(event) {
			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
			flyout.showRegisterUnitInfo(event.getFid());
		},

		'ParcelInfo.ParcelLayerRegisterEvent' : function(event) {
			var me = this;
			if (event && event.getLayer()) {
				// Register the given layer for this plugin.
				me._registerLayer(event.getLayer());
			}
		},
		'ParcelInfo.ParcelLayerUnregisterEvent' : function(event) {
			var me = this;
			if (event && event.getLayer()) {
				// Unregister the given layer from this plugin.
				me._unregisterLayer(event.getLayer());
			}
		},
		'Parcel.FinishedDrawingEvent' : function(event) {
			/* something's changes */
			var me = this;
			me._refreshLayer();
		},
		
		/* workaround for Parcel swallowing MapClickedEvents */
		'MouseHoverEvent' : function(event) {
			if (!event.isPaused()) {
				return;
			}
			
			

			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
			flyout.showHoverInfo(event.getLon(), event.getLat(), event.getPageX(), event.getPageY());

		},
		
		/* uncomment this impl when Parcel does not swallowMapClickedEvents */
		/*'MapClickedEvent' : function(event) {
			var lonlat = event.getLonLat();
			
			console.log("MAPCLICKED",event);
			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
			flyout.showHoverInfo(lonlat.lon, lonlat.lat, event.getMouseX(), event.getMouseY());
		},*/
		/**
		 * @method userinterface.ExtensionUpdatedEvent
		 */
		'userinterface.ExtensionUpdatedEvent' : function(event) {

			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];

			if(event.getExtension().getName() != me.getName()) {
				// not me -> do nothing
				return;
			}

			var isShown = event.getViewState() != "close";

			flyout.showContent(isShown);
		},
	},
	_registerLayer : function(layer) {
		var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
		me.layers['parcel'] = layer[0];
		me.layers['parcelEdit'] = layer[1];
	},

	_refreshLayer : function() {
		var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
		flyout.showParcelRelatedInfo(this.layers['parcel'].features);
	},

	_unregisterLayer : function(layer) {
		var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
		me.layers['parcel'] = null;
		me.layers['parcelEdit'] = null;

		flyout.hideParcelRelatedInfo();
		console.log("UNREG", layer);
	},
	
	getState : function() {
		return {};
	},
	setState : function() {
		
	}
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});

