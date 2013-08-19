

define(["oskari"], function(Oskari) {

	return Oskari.eventCls("request.SampleEvent", function(fid) {
		this._fid = fid;
	}, {
		getFid : function() {
			return this._fid;
		}
	});

});
