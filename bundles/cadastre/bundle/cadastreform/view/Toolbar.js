/**
 * @class Oskari.cadastre.bundle.cadastreform.Toolbar
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreform.Toolbar', 
/**
 * @static constructor function
 * @param {Oskari.cadastre.bundle.cadastreform.StatsGridBundleInstance} instance
 */
function(instance) {
    this.toolbarId = 'cadastreform';
    this.instance = instance;
    this._createUI();
    
}, {
    show : function(isShown) {
        var showHide = isShown ? 'show' : 'hide';
        var sandbox = this.instance.getSandbox();
        sandbox.requestByName(this.instance, 'Toolbar.ToolbarRequest', [this.toolbarId, showHide]);
    },
    destroy : function() {
        var sandbox = this.instance.getSandbox();
        sandbox.requestByName(this.instance, 'Toolbar.ToolbarRequest', [this.toolbarId, 'remove']);
    },
    changeName: function(title) {
        var sandbox = this.instance.getSandbox();
        sandbox.requestByName(this.instance, 'Toolbar.ToolbarRequest', [this.toolbarId, 'changeName', title]);
    },
	/**
	 * @method _createUI
	 * sample toolbar for cadastre functionality
	 */
	_createUI : function() {
		var me = this;
		var loc = me.instance.getLocalization('toolbar');
        var view = this.instance.plugins['Oskari.userinterface.View'];
        
        
        
        var sandbox = this.instance.getSandbox();
        sandbox.requestByName(this.instance, 'Toolbar.ToolbarRequest', [this.toolbarId, 'add', {
            title : loc['title'],
            show : false,
            closeBoxCallback : function() {
                view.showMode(false);
                view.showContent(false);
            }
        }]);

		var buttonGroup = 'myplacesx';
		var buttons = {
			'print' : {
				toolbarid : me.toolbarId,
				toolbartitle : 'Tilastonäkymä',
				iconCls : 'tool-print',
				tooltip : loc['print'],
				sticky : false,
				callback : function() {
					
				}
			},
			'save' : {
                toolbarid : me.toolbarId,
				iconCls : 'tool-save-view',
				tooltip : loc['save'],
				sticky : true,
				callback : function() {
					var sandbox = me.instance.getSandbox();
					var popup = Oskari.clazz.create('Oskari.userinterface.component.Popup');
					popup.show(loc['title'],loc['progress']['save']);
					popup.fadeout();
					
				}
			},
			'send' : {
                toolbarid : me.toolbarId,
				iconCls : 'icon-arrow-right',
				tooltip : loc['send'],
				sticky : true,
				callback : function() {
					var popup = Oskari.clazz.create('Oskari.userinterface.component.Popup');
					popup.show(loc['title'],loc['progress']['send']);
					popup.fadeout();
				}
			}
		};


		var requester = this.instance;
		var reqBuilder = sandbox.getRequestBuilder('Toolbar.AddToolButtonRequest');

		for(var tool in buttons ) {
			sandbox.request(requester, reqBuilder(tool, buttonGroup, buttons[tool]));
		}

	}
});
