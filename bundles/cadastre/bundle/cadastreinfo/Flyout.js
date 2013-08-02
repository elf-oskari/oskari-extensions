/**
 * @class Oskari.cadastre.bundle.cadastreinfo.Flyout
 *
 * Sample extension bundle definition which inherits most functionalty
 * from DefaultExtension class.
 *
 */
Oskari.clazz.define('Oskari.cadastre.bundle.cadastreinfo.Flyout',
/**
 * @static constructor function
 */
function() {

	this.location = {};

	this.els = {};
	this.spinners = {};
	this.ajax = {};

	this.protocols = {};

}, {
	__spinnerConf : {
		lines : 15, // The number of lines to draw
		length : 0, // The length of each line
		width : 5, // The line thickness
		radius : 16, // The radius of the inner circle
		corners : 0, // Corner roundness (0..1)
		rotate : 0, // The rotation offset
		color : '#fff', // #rgb or #rrggbb
		speed : 0.6, // Rounds per second
		trail : 59, // Afterglow percentage
		shadow : false, // Whether to render a shadow
		hwaccel : false, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the spinner
		zIndex : 2e9, // The z-index (defaults to 2000000000)
		top : 'auto', // Top position relative to parent in px
		left : 'auto' // Left position relative to parent in px
	},
	__templates : {

		"content" : '<div class="cadastreinfo_container"></div>',
		"location" : '<div class="cadastreinfo_location cadastreinfo"><div class="cadastreinfo_title"></div><div class="cadastreinfo_hover"></div><div class="cadastreinfo_content"><div class="fid"></div></div><div class="cadastreinfo_spinner"></div></div>',
		"cadastre" : '<div class="cadastreinfo"><div class="cadastreinfo_title"></div><div class="cadastreinfo_content"><div class="fid"></div></div><div class="cadastreinfo_spinner"></div></div>',
		"cadastre_link" : '<a href="javascript:void(0);"></a><br />',
		"cadastre_table" : '<table class="cadastre_table" style="display:none;"><thead><col/><col/></thead><tbody></tbody></table>',
		"cadastre_tr" : '<tr><td class="cadastre_label" ></td><td  class="cadastre_value"></td></tr>',

		"owners" : '<div class="cadastreinfo"><div class="cadastreinfo_title"></div><div class="cadastreinfo_content"><div class="fid"></div></div><div class="cadastreinfo_spinner"></div></div>',
		"buildings" : '<div class="cadastreinfo"><div class="cadastreinfo_title"></div><div class="cadastreinfo_content"></div><div class="cadastreinfo_spinner"></div></div>',
		"terrain" : '<div class="cadastreinfo"><div class="cadastreinfo_title"></div><div class="cadastreinfo_content"></div><div class="cadastreinfo_spinner"></div></div>'

	},

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

		/* hackzone begin */
		elContainer.parent().css("backgroundColor", "transparent");
		elContainer.parent().parent().css("backgroundColor", "transparent");

		/*elContainer.parent().addClass("solsol_wrapper")*/
		elContainer.parent().parent().addClass("cadastreinfo_wrapper");
		var elTb = elContainer.parent().parent().find('.oskari-flyouttoolbar')
		elTb.css('height', '16px');
		elTb.css('color', 'white');

		/* alert */
		this.alert = Oskari.clazz.create('Oskari.userinterface.component.Alert');
		this.alert.insertTo(elContainer);

		/* placeholders for data */

		var elLocation = jQuery(this.__templates['location']);
		var elLocationContent = elLocation.find('.cadastreinfo_content');
		elLocation.find('.cadastreinfo_title').text(loc.data.location.title);
		this.els.location = elLocation;

		for (var p in loc.data.location.buttons ) {
			var elLink = jQuery(this.__templates['cadastre_link']);
			elLink.html(loc.data.location.buttons[p].title);
			elLink.attr('context', p);
			elLink.click(function() {

				me._handleClick(jQuery(this).attr('context'));

			});

			elLocationContent.append(elLink);

		}

		/* cadastre */

		var elCadastre = jQuery(this.__templates['cadastre']);
		var elCadastreContent = elCadastre.find('.cadastreinfo_content');
		elCadastre.find('.cadastreinfo_title').text(loc.data.cadastre.title);
		this.els.cadastre = elCadastre;

		for (var p in loc.data.cadastre.buttons ) {
			var elLink = jQuery(this.__templates['cadastre_link']);
			elLink.html(loc.data.cadastre.buttons[p].title);
			elLink.attr('context', p);
			elLink.click(function() {

				me._handleClick(jQuery(this).attr('context'));

			});

			elCadastreContent.append(elLink);

		}

		var elCadastreTbl = jQuery(this.__templates['cadastre_table']);
		elCadastreContent.append(elCadastreTbl);

		this.els.cadastreTable = elCadastreTbl;

		/* owners */
		var elOwners = jQuery(this.__templates['owners']);
		var elOwnersContent = elOwners.find('.cadastreinfo_content');
		elOwners.find('.cadastreinfo_title').text(loc.data.owners.title);
		this.els.owners = elOwners;

		for (var p in loc.data.owners.buttons ) {
			var elLink = jQuery(this.__templates['cadastre_link']);
			elLink.html(loc.data.owners.buttons[p].title);
			elLink.attr('context', p);
			elLink.click(function() {

				me._handleClick(jQuery(this).attr('context'));

			});

			elOwnersContent.append(elLink);
		}

		var elOwnersTbl = jQuery(this.__templates['cadastre_table']);
		elOwnersContent.append(elOwnersTbl);

		this.els.ownersTable = elOwnersTbl;

		/* buildings */

		var elBuildings = jQuery(this.__templates['buildings']);
		var elBuildingsContent = elBuildings.find('.cadastreinfo_content');

		elBuildings.find('.cadastreinfo_title').text(loc.data.buildings.title);
		this.els.buildings = elBuildings;

		var elBuildingsTbl = jQuery(this.__templates['cadastre_table']);
		elBuildingsContent.append(elBuildingsTbl);

		this.els.buildingsTable = elBuildingsTbl;

		/* terrain db */
		var elTerrain = jQuery(this.__templates['terrain']);
		var elTerrainContent = elTerrain.find('.cadastreinfo_content');

		elTerrain.find('.cadastreinfo_title').text(loc.data.terrain.title);
		this.els.terrain = elTerrain;

		/* compose */

		var elContent = jQuery(this.__templates['content']);
		elContent.append(elLocation);
		elContent.append(elCadastre);
		elContent.append(elOwners);
		elContent.append(elBuildings);
		elContent.append(elTerrain);

		elContainer.append(elContent);

		/* spinners for ajax */
		var elLocationSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elLocationSpinnerContainer = elLocation.find('.cadastreinfo_spinner');
		elLocationSpinner.insertTo(elLocationSpinnerContainer, this.__spinnerConf);
		this.spinners.location = {
			spinner : elLocationSpinner,
			container : elLocationSpinnerContainer,
			content : elLocationContent
		};

		var elCadastreSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elCadastreSpinnerContainer = elCadastre.find('.cadastreinfo_spinner');
		elCadastreSpinner.insertTo(elCadastreSpinnerContainer, this.__spinnerConf);
		this.spinners.cadastre = {
			spinner : elCadastreSpinner,
			container : elCadastreSpinnerContainer,
			content : elCadastreContent
		};

		var elOwnersSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elOwnersSpinnerContainer = elOwners.find('.cadastreinfo_spinner');
		elOwnersSpinner.insertTo(elOwnersSpinnerContainer, this.__spinnerConf);
		this.spinners.owners = {
			spinner : elOwnersSpinner,
			container : elOwnersSpinnerContainer,
			content : elOwnersContent
		};


		var elBuildingsSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elBuildingsSpinnerContainer = elBuildings.find('.cadastreinfo_spinner');
		elBuildingsSpinner.insertTo(elBuildingsSpinnerContainer, this.__spinnerConf);
		this.spinners.buildings = {
			spinner : elBuildingsSpinner,
			container : elBuildingsSpinnerContainer,
			content : elBuildingsContent
		};

		var elTerrainSpinner = Oskari.clazz.create('Oskari.userinterface.component.ProgressSpinner');
		var elTerrainSpinnerContainer = elTerrain.find('.cadastreinfo_spinner');
		elTerrainSpinner.insertTo(elTerrainSpinnerContainer, this.__spinnerConf);
		this.spinners.terrain = {
			spinner : elTerrainSpinner,
			container : elTerrainSpinnerContainer,
			content : elTerrainContent
		};

		/* outta here */

		var cadastreConf = this.instance.conf.datasources.cadastre;

		this.protocols['cadastre'] = {
			protocol : new OpenLayers.Protocol.WFS({
				version : '1.1.0',
				srsName : 'EPSG:3067', // conf!
				featureType : cadastreConf.queryFeatureType,
				featureNS : cadastreConf.queryNs,
				featurePrefix : cadastreConf.queryPrefix,
				url : cadastreConf.queryUrl
			}),
			propertyNames : cadastreConf.queryProperties,
			querySpatialProperty : cadastreConf.querySpatialProperty,
			queryEqualToProperty : cadastreConf.queryEqualToProperty
		};

		var buildingsConf = this.instance.conf.datasources.buildings;

		this.protocols['buildings'] = {
			protocol : new OpenLayers.Protocol.WFS({
				version : '1.1.0',
				srsName : 'EPSG:3067', // conf!
				featureType : buildingsConf.queryFeatureType,
				featureNS : buildingsConf.queryNs,
				featurePrefix : buildingsConf.queryPrefix,
				url : buildingsConf.queryUrl
			}),
			propertyNames : buildingsConf.queryProperties,
			querySpatialProperty : buildingsConf.querySpatialProperty,
			queryEqualToProperty : buildingsConf.queryEqualToProperty
		};

	},

	/**
	 * @method stopPlugin
	 * called by host to stop flyout operations
	 */
	stopPlugin : function() {
	},

	showRegisterUnitInfo : function(fid) {
		this.spinners.location.content.find('.fid').text(fid);
		//this.spinners.cadastre.content.find('.fid').text(fid);
	},
	showParcelInfo : function(fid) {
		this.spinners.location.content.find('.fid').text(fid);
		//this.spinners.cadastre.content.find('.fid').text(fid);
	},

	showParcelRelatedInfo : function(geomFeatures) {
		var me = this;
		var format = new OpenLayers.Format.GeoJSON();
		for (var n = 0; n < geomFeatures.length; n++) {
			//	console.log("GEOM", n, format.write(geomFeatures[n].geometry, true));
		}

		for (p in this.spinners ) {
			if (p === 'location') {
				continue;
			}
			this._launchAjax(p);
		}
		/*
		 window.setTimeout(function() {
		 for (p in me.spinners ) {
		 if (p === 'location') {
		 continue;
		 }
		 if (p == 'cadastre') {
		 continue;
		 }
		 if (p == 'buildings') {
		 continue;
		 }
		 me._finishAjax(p);
		 }
		 }, 2000);*/
	},
	hideParcelRelatedInfo : function() {

	},

	showHoverInfo : function(lon, lat, pageX, pageY) {

		if (!this.isShown()) {
			return;
		}

		var me = this;
		for (p in this.spinners ) {
			this._cancelAjax(p);
			this.spinners[p].spinner.stop();
			this.spinners[p].container.hide();
		}

		this.location = {
			lon : lon,
			lat : lat
		};

		this.els.location.find('.cadastreinfo_hover').html(lon + "," + lat);

		this._launchAjax('location');
	},

	_cancelAjax : function(key) {
		this.spinners[key].spinner.stop();
		this.spinners[key].container.hide();
	},
	_launchAjax : function(key) {
		var me = this;

		if (key === 'location') {
			/*window.setTimeout(function() {
			 me._finishAjax('location');
			 me.spinners.location.content.find('.fid').text("91-15-637-2");
			 }, 2000);
			 */
			me.spinners[key].container.show();
			me.spinners[key].spinner.start();

			/* hack to some extent */
			var parcelProtocol = this.protocols['cadastre'];

			var lonlat = new OpenLayers.Geometry.Point(this.location.lon, this.location.lat);
			var filter = new OpenLayers.Filter.Spatial({
				property : parcelProtocol.querySpatialProperty,
				type : OpenLayers.Filter.Spatial.INTERSECTS,
				value : lonlat
			});
			console.log(filter);
			var filter = parcelProtocol.protocol.read({
				filter : filter,
				propertyNames : parcelProtocol.propertyNames,
				callback : function(response) {

					if (response && response.features && response.features.length > 0) {

						me.spinners.location.content.find('.fid').text(response.features[0].data.rekisteriyksikonKiinteistotunnus);
						jQuery(me.container).parent().scrollTop(0);
						me.spinners[key].spinner.stop();
						me.spinners[key].container.hide();
					} else {

						me.spinners[key].spinner.stop();
						me.spinners[key].container.hide();
					}
				}
			});
		} else if( key === 'owners') {
			
			var fid = me.spinners.cadastre.content.find('.fid').text().trim();
			if (fid == null || fid == '') {
				me.alert.setContent(me.getLocalization().error.fid, 'error');
				return;
			}
			
			me.spinners[key].container.show();
			me.spinners[key].spinner.start();

			var uri = "/services/tp/kysely/lainhuutotiedot/xml?kohdetunnus=" + fid;
			var request = OpenLayers.Request.GET({
				url : uri,
				success : function(request) {
					window.ESB = {
						req : request,
						rspTest : request.responseText
					};
					var doc = request.responseXML;
					if (!doc || !doc.documentElement) {
						doc = request.responseText;
					}

					me._finishAjax(key, request.responseText);

					me.spinners[key].spinner.stop();
					me.spinners[key].container.hide('slow');
				},
				failure : function() {
					me.spinners[key].spinner.stop();
					me.spinners[key].container.hide('slow');
				}
			});
			
		} else if (key === 'cadastre') {

			

			var fid = me.spinners.cadastre.content.find('.fid').text().trim();
			if (fid == null || fid == '') {
				me.alert.setContent(me.getLocalization().error.fid, 'error');
				return;
			}

			me.spinners[key].container.show();
			me.spinners[key].spinner.start();
			
			var uri = "/services/tp/kysely/perustiedot/kohde/xml?kohdetunnus=" + fid;
			var request = OpenLayers.Request.GET({
				url : uri,
				success : function(request) {
					window.ESB = {
						req : request,
						rspTest : request.responseText
					};
					var doc = request.responseXML;
					if (!doc || !doc.documentElement) {
						doc = request.responseText;
					}

					me._finishAjax(key, request.responseText);

					me.spinners[key].spinner.stop();
					me.spinners[key].container.hide('slow');
				},
				failure : function() {
					me.spinners[key].spinner.stop();
					me.spinners[key].container.hide('slow');
				}
			});

		} else if (key === 'buildings') {
			/* hack to some extent */
			var buildingProtocol = this.protocols['buildings'];
			var fid = me.spinners.cadastre.content.find('.fid').text().trim();
			if (fid == null || fid == '') {
				me.alert.setContent(me.getLocalization().error.fid, 'error');
				return;
			}

			var lonlat = new OpenLayers.Geometry.Point(this.location.lon, this.location.lat);
			/*var filter = new OpenLayers.Filter.Spatial({
			 property : parcelProtocol.querySpatialProperty,
			 type : OpenLayers.Filter.Spatial.INTERSECTS,
			 value : lonlat
			 });
			 */
			var filter = new OpenLayers.Filter.Comparison({
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : buildingProtocol.queryEqualToProperty,
				value : fid
			});
			console.log(filter);
			var filter = buildingProtocol.protocol.read({
				filter : filter,
				propertyNames : buildingProtocol.propertyNames,
				callback : function(response) {

					if (response && response.features && response.features.length > 0) {

						me._finishAjax(key, response.features);
						me.spinners[key].spinner.stop();
						me.spinners[key].container.hide();
					} else {

						me.spinners[key].spinner.stop();
						me.spinners[key].container.hide();
					}
				}
			});

		}

	},
	_finishAjax : function(key, values) {

		var loc = this.getLocalization();

		this.spinners[key].spinner.stop();
		this.spinners[key].container.hide('slow');

		if (key === 'cadastre') {
			var elTbl = this.els.cadastreTable;
			var elTblTbody = elTbl.find('tbody');
			var elTblRowTpl = jQuery(this.__templates['cadastre_tr']);
			elTblTbody.empty();
			elTbl.hide();

			if (values) {

				var asXml = jQuery.parseXML(values);

				var tblRows = loc.data.cadastre.table.rows;
				for (var r = 0; r < tblRows.length; r++) {
					var rd = tblRows[r];
					var elTblRow = elTblRowTpl.clone();
					elTblRow.find('.cadastre_label').html(rd.label);

					var xmlVal = jQuery(asXml.getElementsByTagNameNS('*',rd.qname)[0]).text().trim()

					elTblRow.find('.cadastre_value').html(xmlVal);

					elTblTbody.append(elTblRow);
				}

				elTbl.show();
			}
		} else if( key === 'owners') {
			var elTbl = this.els.ownersTable;
			var elTblTbody = elTbl.find('tbody');
			var elTblRowTpl = jQuery(this.__templates['cadastre_tr']);
			elTblTbody.empty();
			elTbl.hide();

			if (values) {

				var asXml = jQuery.parseXML(values);
				
				var elTblRow = elTblRowTpl.clone();
				var rowBadge = Oskari.clazz.create('Oskari.userinterface.component.Badge');
				rowBadge.insertTo(elTblRow.find('.cadastre_label'));
				rowBadge.setContent("1", 'default');

				//elTblRow.find('.cadastre_label').html("#" + v);
				elTblTbody.append(elTblRow);

				var tblRows = loc.data.owners.table.rows;
				for (var r = 0; r < tblRows.length; r++) {
					var rd = tblRows[r];
					var elTblRow = elTblRowTpl.clone();
					
					elTblRow.find('.cadastre_label').html(rd.label);

					var xmlVal = jQuery(asXml.getElementsByTagNameNS('*',rd.qname)[0]).text().trim()

					elTblRow.find('.cadastre_value').html(xmlVal);

					elTblTbody.append(elTblRow);
				}

				elTbl.show();
			}
			
		} else if (key === 'buildings') {
			var elTbl = this.els.buildingsTable;
			var elTblTbody = elTbl.find('tbody');
			var elTblRowTpl = jQuery(this.__templates['cadastre_tr']);
			elTblTbody.empty();
			elTbl.hide();
			var feats = values;

			var tblRows = loc.data.buildings.table.rows;

			for (var v = 0; v < feats.length; v++) {
				var feat = feats[v];
				/* add one row with identifier */
				var elTblRow = elTblRowTpl.clone();

				var rowBadge = Oskari.clazz.create('Oskari.userinterface.component.Badge');
				rowBadge.insertTo(elTblRow.find('.cadastre_label'));
				rowBadge.setContent("" + (v + 1), 'warning');

				//elTblRow.find('.cadastre_label').html("#" + v);
				elTblTbody.append(elTblRow);

				/* add other rows */
				for (var r = 0; r < tblRows.length; r++) {
					var rd = tblRows[r];
					elTblRow = elTblRowTpl.clone();
					elTblRow.find('.cadastre_label').html(rd.label);
					elTblRow.find('.cadastre_value').html(feat.data[rd.qname]);

					elTblTbody.append(elTblRow);

				}
			}

			elTbl.show();

		}

	},

	_handleClick : function(key) {

		var sandbox = this.instance.getSandbox();
		if (key === 'spatial') {
			var fid = this.spinners.location.content.find('.fid').text();
			if (fid == null || fid == '') {
				this.alert.setContent(this.getLocalization().error.fid, 'error');
			} else {
				this.spinners.cadastre.content.find('.fid').text(fid);
				sandbox.notifyAll(sandbox.getEventBuilder('ParcelSelector.ParcelSelectedEvent')(fid))
			}

		} else if (key === 'extract') {
			var fid = this.spinners.cadastre.content.find('.fid').text();
			if (fid == null || fid == '') {
				this.alert.setContent(this.getLocalization().error.fid, 'error');
			} else {
				var url = '/ktjkii/extract/tuloste.pdf?kiinteistotunnus=' + fid;
				this.openURLinWindow(url);
			}
		} else if (key === 'lainhuutotodistus') {
			var fid = this.spinners.cadastre.content.find('.fid').text();
			if (fid == null || fid == '') {
				this.alert.setContent(this.getLocalization().error.fid, 'error');
			} else {
				var url = '/services/tp/lainhuutotodistus/pdf?kohdetunnus=' + fid;
				this.openURLinWindow(url);
			}

		} else if (key === 'rasitustodistus') {
			var fid = this.spinners.cadastre.content.find('.fid').text();
			if (fid == null || fid == '') {
				this.alert.setContent(this.getLocalization().error.fid, 'error');
			} else {
				var url = '/services/tp/rasitustodistus/pdf?kohdetunnus=' + fid;
				this.openURLinWindow(url);
			}

		}

	},

	showContent : function(isShown) {
		this._shown = isShown;
	},

	isShown : function() {
		return this._shown;
	},

	openURLinWindow : function(infoUrl, selections) {
		var wopParm = "location=1," + "status=1," + "scrollbars=1," + "width=850," + "height=1200";
		var link = infoUrl;
		window.open(link, "_blank", wopParm);
	}
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultFlyout"]
});
	