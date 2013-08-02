/**
 * @class Oskari.cadastre.bundle.cadastreform.CadastreWebFormBundleInstance
 *
 * Sample extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreform.CadastreWebFormBundleInstance',
/**
 * @static constructor function
 */
function() {
    this.conf =  {};
    this.state = {};
    this.layers = {};
        
    
}, {
    "init" : function() {
        return null;
    },
    
	"eventHandlers" : {
		/**
		 * @method userinterface.ExtensionUpdatedEvent
		 */
		'userinterface.ExtensionUpdatedEvent' : function(event) {

			var me = this, view = this.plugins['Oskari.userinterface.View'];

			if(event.getExtension().getName() != me.getName()) {
				// not me -> do nothing
				return;
			}

			var isShown = event.getViewState() != "close";

            view.showMode(isShown, true);
			view.showContent(isShown);
		},
		'ParcelSelector.ParcelSelectedEvent' : function(event) {
			var me = this, view = this.plugins['Oskari.userinterface.View'];
			view.showParcelInfo(event.getFid());
		},
		'ParcelSelector.RegisterUnitSelectedEvent' : function(event) {
			var me = this, view = this.plugins['Oskari.userinterface.View'];
			view.showRegisterUnitInfo(event.getFid());
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
		'MouseHoverEvent' : function(event) {
			if( !event.isPaused() ) {
				return;
			}
			
			var me = this, view = this.plugins['Oskari.userinterface.View'];
			view.showHoverInfo(event.getLon(), event.getLat(), event.getPageX(), event.getPageY());
			
		}
	},
	
	_registerLayer : function(layer) {
		var me = this, view = this.plugins['Oskari.userinterface.View'];
		me.layers['parcel'] = layer[0] ;
		me.layers['parcelEdit'] = layer[1] ;
	},
	
	_refreshLayer: function() {
		var me = this, view = this.plugins['Oskari.userinterface.View'];
		view.showParcelRelatedInfo(this.layers['parcel'].features);
	},
	
	_unregisterLayer: function(layer) {
		var me = this, view = this.plugins['Oskari.userinterface.View'];
		me.layers['parcel'] = null;
		me.layers['parcelEdit'] = null ;
		
		view.hideParcelRelatedInfo();
		console.log("UNREG",layer);
	},
	
	getState : function() {
		return {};
	},
	setState : function() {
		
	}
	
   
	
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});

