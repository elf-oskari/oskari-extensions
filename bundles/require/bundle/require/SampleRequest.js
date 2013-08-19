define(["oskari"], function(Oskari) {

	return Oskari.requestCls('request.SampleRequest', function(placeId) {
		this._placeId = placeId;
	}, {
		getId : function() {
			return this._placeId;
		}
	});

});
