define(["oskari"], function(Oskari) {
    return Oskari.bundleCls().category({
        create : function() {
            return Oskari.extensionCls().category({
                startPlugin : function() {
                    this.setFlyout(Oskari.cls().extend("Oskari.userinterface.extension.EnhancedFlyout").category({
                        startPlugin : function() {
                            this.getEl().append("require based 'extreme' implementation with no vars and nested anonymous classes");
                        }
                    }).create(this, {
                        "title" : "require (no-rules-no comments)"
                    }));
                    this.setDefaultTile("require-loc");
                }
            }).create('requireminloc');
        }
    })
});