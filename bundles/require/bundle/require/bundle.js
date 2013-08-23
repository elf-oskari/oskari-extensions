
define(["oskari", "./instance"], function(Oskari, instanceCls) {

    return Oskari.bundleCls("Oskari.sample.bundle.require.RequireBundle", 'require').
    	category({
        	create : function() {
            	var inst = instanceCls.create('require');
            	return inst;
        	}
    	});

});
