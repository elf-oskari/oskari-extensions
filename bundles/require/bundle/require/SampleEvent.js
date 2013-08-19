

define(["oskari"], function(Oskari) {

	return Oskari.eventCls("event.SampleEvent", function(fid) {
		this._fid = fid;
	}, {
		getFid : function() {
			return this._fid;
		}
	});

});
