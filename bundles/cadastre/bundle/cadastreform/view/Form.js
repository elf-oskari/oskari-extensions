/**
 * @class Oskari.cadastre.bundle.cadastreform.Form
 *
 * Somewhat generic form implementation for demo purposes
 *
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreform.Form',
/**
 * @static constructor function
 */
function(loc) {
	this.loc = loc;
	this.controls = {};
	this.controlsContainers = {};
	this.pages = [];
}, {
	"templates" : {
		"checkbox" : '<div class="">' + '<input type="checkbox" />' + '<label></label></div>',
		"textbox" : '<div class="">' + '<input type="textbox" />' + '<label></label></div>',
		"textarea" : '<div class="">' + '<textarea></textarea>' + '<label></label></div>',
		"placeholder" : '<div class=""></div>'
	},
	"templatesControlSelector" : {
		"checkbox" : "input",
		"textbox" : "input",
		"textarea" : "textarea"
	},

	getControls : function() {
		return this.controls;
	},
	getPages : function() {
		return this.pages;
	},

	buildForm : function() {
		var loc = this.loc;
		var cls = loc.cls;
		var title = loc.title;

		var pages = loc['pages'];
		var optTemplate = jQuery(this.templates['option']);

		for (var p = 0; p < pages.length; p++) {

			var pageDef = pages[p];
			var page = null;
			if (pageDef.ref) {
				page = jQuery(pageDef.ref);
				page.addClass(pageDef.cls);
				page.addClass(cls);
			} else {
				page = jQuery('<div />');
				page.addClass(pageDef.cls);
				this.pages.push(page);
			}

			var pageOpts = pageDef.controls;
			for (var o = 0; o < pageOpts.length; o++) {
				var dat = pageOpts[o];
				var controlType = dat.type;

				var opt = jQuery(this.templates[controlType]);
				opt.find('input').attr({
					'id' : dat.id,
					'checked' : dat.checked
				});
				opt.find('label').html(dat.label).attr({
					'for' : dat.id,
					'class' : 'printout_checklabel'
				});

				for (var cssopt in dat.css ) {
					opt.css(cssopt, dat.css[cssopt]);
				}

				if( this.templatesControlSelector[controlType] ) {
					this.controls[dat.id] = opt.find(this.templatesControlSelector[controlType]);
				} else {
					this.controls[dat.id] = opt;
				}
				this.controlsContainers[dat.id] = opt;
				page.append(opt);
			}

		}

	},

	appendTo : function(elPages) {
		for (var p = 0; p < this.pages.length; p++) {
			var page = this.pages[p];
			elPages.append(page);
		}
	},

	show : function() {
		for (var opt in this.controlsContainers ) {
			this.controlsContainers[opt].show();
		}
		for (var page in this.pages ) {
			this.pages[page].show();
		}
	},
	hide : function() {
		for (var opt in this.controlsContainers ) {
			this.controlsContainers[opt].hide();
		}
		for (var page in this.pages ) {
			this.pages[page].hide();
		}
	},
	refreshData : function(data) {
		for (p in data ) {
			if (this.getControls()[p]) {

				this.getControls()[p].val(data[p]);
			}
		}
	}
});
