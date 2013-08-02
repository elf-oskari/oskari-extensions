/**
 * @class Oskari.social.bundle.mapviewlog.mapviewlogFlyout
 *
 * framework extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.social.bundle.mapviewlog.Flyout',
/**
 * @static constructor function
 */
function() {
	this.ref = new Date().getTime();
	this.max = 0;
}, {
	/**
	 * @method startPlugin
	 * called by host to start flyout operations
	 */
	startPlugin : function() {
		var el = this.getEl();

		/* this gets the flyout part */
		var loc = this.getLocalization();

		var me = this;

		var elContainer = jQuery(me.container);
		elContainer.empty();
		elContainer.addClass('mapviewlog');

		/* hackzone begin */
		elContainer.parent().css("backgroundColor", "transparent");
		elContainer.parent().parent().css("backgroundColor", "transparent");

		/*elContainer.parent().addClass("solsol_wrapper")*/
		elContainer.parent().parent().addClass("mapviewlog_wrapper");
		var elTb = elContainer.parent().parent().find('.oskari-flyouttoolbar')
		elTb.css('height', '16px');
		elTb.css('color', 'white');

		/*me.refresh();*/

	},

	refresh : function(historyFrame, historyPrevious) {
		if (historyPrevious.length == 0) {
			return;
		}

		var me = this, dv = me.container;
		var ref = historyFrame.timestamp ? historyFrame.timestamp : me.ref;

		/*dv.empty();*/
		var min = Math.max(historyPrevious.length - 20, 0), max = historyPrevious.length;
		var imgs = dv.children('.mapviewlogframe');
		imgs.each(function(n) {
			var el = jQuery(this);
			if (el.attr('timestamp') >= ref) {
				el.remove();
			}
		});

		for (var n = min; n < max; n++) {
			var historyFrame = historyPrevious[n];

			if (!historyFrame.maplinkArgs) {
				continue;
			}

			if (historyFrame.timestamp < me.ref) {
				continue;
			}

			var img = jQuery('<img />');
			img.attr('src', me.instance.conf.formatProducers["image/png"] + '?' + historyFrame.maplinkArgs + '&width=735&height=300&scaledWidth=245');

			var imgDv = jQuery('<div class="mapviewlogframe"/>');
			imgDv.attr('timestamp', historyFrame.timestamp);

			img.attr('historyFrame', n);

			img.click(function() {
				var sh = me.instance.getSandbox().findRegisteredModuleInstance('StateHandler');
				sh.historyMoveNth(jQuery(this).attr('historyFrame'));
			});

			var badge = Oskari.clazz.create('Oskari.userinterface.component.Badge');
			badge.insertTo(imgDv);
			badge.setContent('' + n, 'info');
			imgDv.append(img);
			dv.prepend(imgDv);

			var shareBuilder = me.instance.sandbox.getEventBuilder("mapshare.ShareMap");
			if (shareBuilder) {

				var shareBtn = jQuery('<div class="mapviewlog_sharebtn" />');
				shareBtn.attr('maplinkArgs', historyFrame.maplinkArgs);
				shareBtn.click(function() {
					me.instance.getSandbox().notifyAll(shareBuilder(jQuery(this).attr('maplinkArgs')));
				})
				imgDv.append(shareBtn);
			}

		}
		me.ref = ref;

	},

	displayContent : function(isOpen, historyFrame, history) {
		var me = this;
		var sh = me.instance.getSandbox().findRegisteredModuleInstance('StateHandler');
		if (isOpen) {
			me.refresh( historyFrame ? historyFrame : sh._historyPrevious[sh._historyPrevious.length - 1], history ? history : sh._historyPrevious);
		} else {

		}
	},

	/**
	 * @method stopPlugin
	 * called by host to stop flyout operations
	 */
	stopPlugin : function() {
	}
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
});
