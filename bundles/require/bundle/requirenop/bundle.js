define(["oskari"], function(Oskari) {
    return Oskari.bundleCls().category({
        create : function() {
            return Oskari.cls().extend("Oskari.userinterface.extension.EnhancedExtension").category({
                startPlugin : function() {
                    this.setFlyout(Oskari.cls("Oskari.userinterface.extension.EnhancedFlyout").create(this, {
                        "title" : "require (no-op implementation)"
                    }));
                    this.setTile(Oskari.cls('Oskari.userinterface.extension.DefaultTile').create(this, {
                        "title" : "require-nop"
                    }));
                }
            }).create();
        }
    })
}); 