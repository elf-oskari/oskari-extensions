define(["oskari"], function(Oskari) {
    return Oskari.bundleCls('requireminloc').category({
        create : function() {
            return Oskari.cls().extend("Oskari.userinterface.extension.EnhancedExtension").category({
                startPlugin : function() {
                    this.setFlyout(Oskari.cls().extend("Oskari.userinterface.extension.EnhancedFlyout").category({
                        startPlugin : function() {
                            this.getEl().append("require based 'extreme' implementation with no vars and nested anonymous classes");
                        }
                    }).create(this, {
                        "title" : "require (no-rules-no comments)"
                    }));
                    this.setTile(Oskari.cls('Oskari.userinterface.extension.DefaultTile').create(this, {
                        "title" : "require-loc"
                    }));
                }
            }).create('requireminloc');
        }
    })
});