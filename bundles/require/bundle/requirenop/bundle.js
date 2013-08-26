define(["oskari"], function(Oskari) {
    return Oskari.bundleCls().category({
        create : function() {
            return Oskari.extensionCls().category({
                startPlugin : function() {
                    this.setFlyout(Oskari.cls("Oskari.userinterface.extension.EnhancedFlyout").create(this, {
                        "title" : "require (no-op implementation)"
                    }));
                    this.setDefaultTile("require-nop");
                }
            }).create();
        }
    })
}); 