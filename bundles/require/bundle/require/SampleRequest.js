

define(["oskari"], function(Oskari) {

	return Oskari.requestCls("sample.SampleRequest", function(fid) {
		this._fid = fid;
	}, {
		getFid : function() {
			return this._fid;
		}
	});

});
