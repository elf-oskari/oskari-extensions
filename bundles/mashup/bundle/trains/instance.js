/**
 * @class Oskari.mashup.bundle.TrainsBundleInstance
 *
 * An OpenLayers based GeoRSS reader updater module
 *
 * This sample adds a vector layer to map.
 * This sample listens to some events to control trains visualization and reloading.

 *
 *
 *
 * Trains Bundle Instance
 */
Oskari.clazz.define("Oskari.mashup.bundle.TrainsBundleInstance", function(b) {

	/* a static sample n/a for now */
	this.url = //'trains.xml';
	/* this requires a proxy for cross domain access */
	'/rss/TrainRSS/TrainService.svc/AllTrains';
	this.name = 'TrainsModule';

	this.mediator = null;
	this.sandbox = null;

	this.layerId = null;
	this.layer = null;

	this.ui = null;

	this.features = null;
	this.paused = false;
},
/*
 * prototype
 */
{
	/**
	 * @method start
	 *
	 * start bundle instance register any resources, add layer to map
	 * and start worker
	 *
	 */
	startProcessing : function() {
		var me = this;

		var sandbox = me.getSandbox();

		this.createProjs();
		this.createFormats();

		this.createMapVisualisation();

		this.stopped = false;
		this.startWorker();

		return this;
	},
	/**
	 * @method startWorker
	 *
	 * let's reload occasionally to show that trains do move
	 *
	 */
	startWorker : function() {
		var me = this;

		/**
		 * throttled func
		 */

		me.func = window.setInterval(function() {
			me.processQuery();
		}, 3200);
	},
	/**
	 * @method stopWorker
	 *
	 * let's not reload when we're gone
	 *
	 */
	stopWorker : function() {
		var me = this;
		window.clearInterval(me.func);
	},

	createMapVisualisation : function() {
		var me = this, sandbox = me.getSandbox();

		if (this.layerId && this.layer) {
			return;
		}

		/* should define how to handle these kinds of situations */
		var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
		if (!mapmodule.getLayerPlugin('vectorlayer')) {
			var veclayerPlugin = Oskari.clazz.create('Oskari.mapframework.mapmodule.VectorLayerPlugin');

			mapmodule.registerPlugin(veclayerPlugin);
			mapmodule.startPlugin(veclayerPlugin);
		}

		this.layerId = '____Trains___' + this.mediator.instanceid;
		this.addVectorLayer();

	},
	/**
	 * @method createProjs
	 *
	 * Creates OpenLayers Projections for this bundle
	 * this
	 */
	createProjs : function() {
		var me = this;
		if (me.projs) {
			return;
		}
		/*
		 * projection support
		 */
		me.projs = {
			"EPSG:3067" : new OpenLayers.Projection("EPSG:3067"),
			"EPSG:4326" : new OpenLayers.Projection("EPSG:4326")
		};
	},
	/*
	 * @method creatFormats
	 *
	 * Creates (OpenLayers) Formats for this bundle
	 */
	createFormats : function() {

		var me = this;
		if (me.format) {
			return;
		}
		/*
		 * format
		 */
		var format = new OpenLayers.Format.GeoRSS({
			internalProjection : me.projs['EPSG:3067'],
			externalProjection : me.projs['EPSG:4326']
		});

		var readFlds = {
			'guid' : {},
			'category' : {},
			'description' : {},
			'pubDate' : {
				type : 'date'
			},
			'from' : {},
			'to' : {},
			'status' : {},
			'dir' : {}
		};
		format.readFields = readFlds;

		/**
		 * some 'guidance' for building the attributes
		 */
		format.createFeatureFromItem = function(item) {
			var geometry = this.createGeometryFromItem(item);

			/* Provide defaults for title and description */
			var title = this.getChildValue(item, "*", "title", this.featureTitle);

			/*
			 * First try RSS descriptions, then Atom
			 * summaries
			 */
			var description = this.getChildValue(item, "*", "description", this.getChildValue(item, "*", "content", this.getChildValue(item, "*", "summary", this.featureDescription)));

			/*
			 * If no link URL is found in the first child
			 * node, try the href attribute
			 */
			var link = this.getChildValue(item, "*", "link");
			if (!link) {
				try {
					link = this.getElementsByTagNameNS(item, "*", "link")[0].getAttribute("href");
				} catch(e) {
					link = null;
				}
			}

			var id = this.getChildValue(item, "*", "id", null);

			/*
			 * <item> <guid isPermaLink="false">H8152</guid>
			 * <category>2</category> <title>A</title>
			 * <description>Summary</description>
			 * <pubDate>Mon, 22 Aug 2011 14:59:08 +0300</pubDate>
			 * <georss:point>60.1761500000001
			 * 24.9393200000001</georss:point> <from>LPV</from>
			 * <to>HKI</to> <status>1</status> <dir>177</dir>
			 * </item>
			 */

			var data = {
				"title" : title,
				"description" : description,
				"link" : link
			};

			var readFlds = this.readFields;
			for (f in readFlds ) {
				var val = this.getChildValue(item, "*", f, readFlds[f].defaultValue);
				data[f] = val;
			}

			var feature = new OpenLayers.Feature.Vector(geometry, data);
			feature.fid = id;
			return feature;
		};

		me.format = format;

	},
	/**
	 * @method update
	 * notifications from the bundle manager
	 */
	"update" : function(manager, b, bi, info) {
		manager.alert("RECEIVED update notification @BUNDLE_INSTANCE: " + info);
	},
	/**
	 * @method stop
	 *
	 * stop bundle instance
	 *
	 */
	stopProcessing : function() {

		this.stopped = true;

		this.stopWorker();
		/*this.removeVectorLayer();*/

	},
	/**
	 * @method setNE
	 *
	 * support function for feature info requests
	 *
	 *
	 */
	setNE : function(n, e) {
		this.ne = {
			n : n,
			e : e
		}
	},

	/**
	 * @property defaults
	 *
	 * some defaults for this bundle
	 */
	defaults : {
		minScale : 8000000,
		maxScale : 1
	},

	/*
	 * @method getFeatureInfo
	 *
	 * search for any hits using OpenLayers geometry operations
	 *
	 */
	getFeatureInfo : function(lon, lat, dontShow) {

		var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
		if (!me.features)
			return;

		var pt = new OpenLayers.Geometry.Point(lon, lat);
		var c = OpenLayers.Geometry.Polygon.createRegularPolygon(pt, 32, 8);

		for (var f = 0; f < me.features.length; f++) {
			var feat = me.features[f];

			if (!feat.geometry)
				continue;

			if (!feat.geometry.intersects(c)) {
				continue;
			}

			flyout.showTrainFeature(feat);

			break;
		}

	},
	/*
	 *
	 * eventHandlers to be bound to map framework
	 */
	eventHandlers : {

		/**
		 * @method eventHandlers.AfterMapLayerRemoveEvent
		 *
		 */
		"AfterMapLayerRemoveEvent" : function(event) {
			var layer = event.getMapLayer();
			if (layer.getId() == this.layerId) {
				if (this.sandbox.getObjectCreator(event) != this.getName()) {

					this.stop();

					var manager = this.mediator.manager;
					var instanceid = this.mediator.instanceid;
					manager.destroyInstance(instanceid);
				}
			}
		},
		/**
		 * @method eventHandlers.AfterMapMoveEvent
		 *
		 */
		"AfterMapMoveEvent" : function(event) {
			var me = this;
			var sandbox = this.sandbox;

			var scale = event.getScale();

			if (!(scale < this.defaults.minScale && scale > this.defaults.maxScale))
				return;

			var n = event.getCenterY();
			var e = event.getCenterX();

			me.sandbox.printDebug("N:" + n + " E:" + e);
			/**
			 * throttled func to avoid overloading trains JSONP
			 */
			me.setNE(n, e);

		},

		/**
		 * @method eventHandlers.MouseHoverEvent
		 *
		 */
		"MouseHoverEvent" : function(event) {
			var x0 = event.getLon();
			var y0 = event.getLat();

			this.getFeatureInfo(x0, y0, true);
		},
		/**
		 * @method eventHandlers.AfterAddExternalMapLayerEvent
		 *
		 */
		"AfterAddExternalMapLayerEvent" : function(event) {
			if (event.getMapLayerId() == this.layerId)
				this.layer = event.getLayer();
		},
		/**
		 * @method eventHandlers.AfterRemoveExternalMapLayerEvent
		 *
		 */
		"AfterRemoveExternalMapLayerEvent" : function(event) {
			if (event.getMapLayerId() == this.layerId)
				this.layer = null;
		},
		"MapLayerVisibilityChangedEvent" : function(event) {
			var layer = event.getMapLayer();
			var layerId = layer.getId();
			if (layerId != this.layerId) {
				return;
			}

			this.paused = !layer.isVisible();
		},
		'userinterface.ExtensionUpdatedEvent' : function(event) {

			var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];

			if (event.getExtension().getName() != me.getName()) {
				// not me -> do nothing
				return;
			}

			var isShown = event.getViewState() != "close";

			flyout.showContent(isShown);

			if (isShown) {
				me.startProcessing();
			} else {
				me.stopProcessing();
			}
		},
	},

	/**
	 * @method processQuery
	 *
	 *
	 */

	processQuery : function() {

		var me = this;
		if (me.paused)
			return;
		if (me.stopped)
			return;

		var ne = this.ne;
		if (!ne)
			return;

		var n = ne.n;
		var e = ne.e;

		me.sandbox.printDebug("STARTING Trains LOAD N:" + n + " E:" + e);

		me.loadRss();

	},
	/**
	 * @method loadRSS
	 *
	 */
	loadRss : function() {
		var me = this, flyout = this.plugins['Oskari.userinterface.Flyout'];
		var params = {};
		var tsNow = new Date().getTime();

		flyout.showSpinner('trains', true);

		var rssOptions = {
			url : me.url + "?ts=" + tsNow,
			params : OpenLayers.Util.upperCaseObject(params),
			callback : function(request) {
				flyout.showSpinner('trains', false);
				me.handleResponse(request);
			},
			scope : this
		};

		OpenLayers.Request.GET(rssOptions);
	},
	/**
	 * @method handleResponse
	 *
	 *
	 */
	handleResponse : function(request) {

		if (!this.layer)
			return;

		if (this.stopped)
			return;

		var me = this;

		var doc = request.responseXML;
		if (!doc || !doc.documentElement) {
			doc = request.responseText;
		}
		var feats = me.format.read(doc);

		if (this.stopped)
			return;

		if (!feats)
			return;

		var event = this.sandbox.getEventBuilder("FeaturesAvailableEvent")(this.layer, feats, "application/nlsfi-x-openlayers-feature", "EPSG:3067", "replace");

		me.sandbox.notifyAll(event);

		this.features = feats;

	},
	/**
	 * @property styledLayerDescriptors
	 *
	 * A set of SLD descriptors for this bundle
	 *
	 */
	styledLayerDescriptors : {
		'default' : '<StyledLayerDescriptor version="1.0.0" ' + 'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" ' + '    xmlns="http://www.opengis.net/sld" ' + '    xmlns:ogc="http://www.opengis.net/ogc" ' + '    xmlns:xlink="http://www.w3.org/1999/xlink" ' + '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> ' + '  <NamedLayer> ' + '    <Name>Simple point with stroke</Name> ' + '   <UserStyle><Title>GeoServer SLD Cook Book: Simple point with stroke</Title> ' + '    <FeatureTypeStyle><Rule>' + '<PointSymbolizer>' + ' <Graphic><Mark><WellKnownName>circle</WellKnownName><Fill>' + '        <CssParameter name="fill">#00A000</CssParameter>' + '       </Fill><Stroke>' + '          <CssParameter name="stroke">#000000</CssParameter>' + '           <CssParameter name="stroke-width">2</CssParameter>' + '          </Stroke></Mark><Size>12</Size></Graphic>' + '     </PointSymbolizer>' + '<TextSymbolizer><Label><ogc:PropertyName>title</ogc:PropertyName></Label>' + '<Fill><CssParameter name="fill">#000000</CssParameter></Fill></TextSymbolizer>' + '</Rule></FeatureTypeStyle>' + '</UserStyle></NamedLayer></StyledLayerDescriptor>'
	},

	/**
	 * @method addVectorLayer
	 *
	 * Adds a (OpenLayers) Vector Layer
	 *
	 */
	addVectorLayer : function() {

		/*
		 * hack
		 */
		var mapLayerId = this.layerId, keepLayersOrder = true, isBasemap = false;

		var defaultSLD = this.styledLayerDescriptors['default'];

		var spec = {
			"text" : "",
			"name" : "Trains",
			"wmsName" : "1",
			"type" : "vectorlayer",
			"styles" : {
				"title" : "Trains",
				"legend" : "",
				"name" : "1"
			},
			"descriptionLink" : "http://www.vr.fi/",
			"legendImage" : "",
			"info" : "",
			"isQueryable" : true,
			"formats" : {
				"value" : "text/html"
			},
			"id" : mapLayerId,
			"minScale" : this.defaults.minScale,
			"maxScale" : this.defaults.maxScale,
			"style" : "",
			"dataUrl" : "",
			"wmsUrl" : "x",
			"opacity" : 100,
			"checked" : "false",
			"styledLayerDescriptor" : defaultSLD
		};

		var request = this.sandbox.getRequestBuilder(
		"AddExternalMapLayerRequest")(mapLayerId, spec);
		this.sandbox.request(this.getName(), request);

		/**
		 * Note: Added Layer Info is received via Event see below
		 *
		 */
		var requestAddToMap = this.sandbox.getRequestBuilder(
		"AddMapLayerRequest")(mapLayerId, keepLayersOrder);

		this.sandbox.request(this.getName(), requestAddToMap);

	},
	/*
	 * @method removeVectorLayer
	 *
	 * removes this bundle's vector layer
	 *
	 */
	removeVectorLayer : function() {

		/**
		 * remove map layer from map
		 */
		var mapLayerId = this.layerId;
		var requestRemovalFromMap = this.sandbox.getRequestBuilder(
		"RemoveMapLayerRequest")(mapLayerId);

		this.sandbox.request(this.getName(), requestRemovalFromMap);

		/**
		 * remove map layer spec
		 */
		var request = this.sandbox.getRequestBuilder(
		"RemoveExternalMapLayerRequest")(mapLayerId);

		this.sandbox.request(this.getName(), request);

		/*
		 * Note: AfterRemoveExternalMapLayerEvent resets
		 * this.layer
		 */

	},
	/**
	 * @method getName
	 *
	 * required method for
	 * Oskari.mapframework.module.Module protocol
	 *
	 */
	getName : function() {
		return this.__name;
	},
	/**
	 * @property __name
	 *
	 *  this BundleInstance's name
	 *
	 */
	__name : "trains"

}, {
	"protocol" : ["Oskari.bundle.BundleInstance", "Oskari.mapframework.module.Module", "Oskari.mapframework.bundle.extension.Extension", "Oskari.mapframework.bundle.extension.EventListener"],
	"extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});
