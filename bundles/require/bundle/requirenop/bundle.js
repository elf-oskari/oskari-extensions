define(["oskari"], function(Oskari) {
    return Oskari.bundleCls().methods({
        create : function() {
            return Oskari.extensionCls().methods({
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