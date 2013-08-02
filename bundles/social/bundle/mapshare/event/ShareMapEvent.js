/**
 * @class Oskari.social.bundle.parcelselector.event.ParcelSelectedEvent
 *
 * Notifies components that parcel with the given fid has been selected.
 */
Oskari.clazz.define('Oskari.social.bundle.mapshare.event.ShareMapEvent',
/**
 * @method create called automatically on construction
 * @static
 * @param {String} fid The feature ID that defines the parcel that has been selected.
 */
function(maplinkArgs, history) {
	this._maplinkArgs = maplinkArgs;
	this._history = history;
}, {
	/**
	 * @method getName
	 * @return {String} Event name.
	 */
	getName : function() {
		return "mapshare.ShareMap";
	},
	getMaplinkArgs : function() {
		return this._maplinkArgs;
	},
	getHistory : function() {
		return this._history;
	}
}, {
	'protocol' : ['Oskari.mapframework.event.Event']
});

