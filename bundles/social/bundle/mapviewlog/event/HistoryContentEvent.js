
/**
 * @class Oskari.social.bundle.parcelselector.event.ParcelSelectedEvent
 *
 * Notifies components that parcel with the given fid has been selected.
 */
Oskari.clazz.define('Oskari.social.bundle.mapviewlog.event.HistoryContentEvent',
/**
 * @method create called automatically on construction
 * @static
 * @param {String} fid The feature ID that defines the parcel that has been selected.
 */
function(historyFrame,history) {
    this._historyFrame = historyFrame;
    this._history = history;
}, {
    /**
     * @method getName
     * @return {String} Event name.
     */
    getName : function() {
        return "statehandler.HistoryContent";
    },
    /**
     * @method getFid
     * Returns parameter that components reacting to event should know about.
     * @return {String} The feature ID that defines the parcel that has been selected.
     */
    getHistoryFrame : function() {
        return this._historyFrame;
    },
    getHistory : function() {
        return this._history;
    }
}, {
    'protocol' : ['Oskari.mapframework.event.Event']
}); 

