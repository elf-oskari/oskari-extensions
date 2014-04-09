/* note: Fixed locale */

require(["oskari", "divmanazer"],function(Oskari) { 

    /* 1) Declarations */
    var Flyout = Oskari.ui.Flyout.extend({
        startPlugin : function () {
            var el = this.getEl(), msg = 'This is an Oskari2 extension Flyout';
            el.append(msg);
        }
    });

    var Extension  = Oskari.ui.Extension.extend({
        startPlugin : function () {
            this.setDefaultTile('O2');
            this.setFlyout(Flyout.create(this, { title: 'Oskari2 Extension'}));
        }
    });
 
    /* 2) Getting things Started */
    var Module = Oskari.Module.extend({
        extension: Extension, 
        identifier: 'simpleextension1', 
        locale : {}
    });

    Module.start()

});
