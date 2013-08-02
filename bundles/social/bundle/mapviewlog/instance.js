/**
 * @class Oskari.framework.bundle.navigationhistory.navigationhistoryBundleInstance
 *
 * framework extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.social.bundle.mapviewlog.BundleInstance',
/**
 * @static constructor function
 */
function() {

}, {
	"conf" : {
		"formatProducers" : {
			"image/png" : "http://wps.paikkatietoikkuna.fi/dataset/map/process/imaging/service/thumbnail/maplink.png"
		}
	},

	"eventHandlers" : {
		/**
		 * @method userinterface.ExtensionUpdatedEvent
		 */
		'userinterface.ExtensionUpdatedEvent' : function(event) {

			var me = this;
			if (event.getExtension().getName() != me.getName()) {
				// not me -> do nothing
				return;
			}

			var viewState = event.getViewState();
			if (!me._prevState || me._prevState != viewState) {
				var isOpen = viewState != "close";

				me.displayContent(isOpen);
			}

			me._prevState = viewState;

		},
		"statehandler.HistoryContent" : function(event) {
			var me = this, viewState = me._prevState;
			if (!me._prevState ) {
				return;
			}
			
			var isOpen = viewState != "close";
			me.displayContent(isOpen, event.getHistoryFrame(),event.getHistory());
			
		}
	},
	
	displayContent: function(isOpen,historyFrame,history) {
		var me = this, flyout = me.plugins['Oskari.userinterface.Flyout'];
		flyout.displayContent(isOpen,historyFrame,history); 
	}

}, {
	"extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});
