/**
 * @class Oskari.weather.bundle.metolibpoc.MetoLibPocBundleInstance
 *
 * Q&D poc which transforms metolib XML/JSON response to GeoJSON and posts json to map
 *
 */
Oskari.clazz.define('Oskari.weather.bundle.metolibpoc.MetoLibPocBundleInstance',
/**
 * @static constructor function
 */
function() {
	this.conf = {
		"name" : "metolibpoc",
		"sandbox" : "sandbox",
		"tileClazz" : "Oskari.userinterface.extension.DefaultTile",
		"flyoutClazz" : "Oskari.weather.bundle.metolibpoc.Flyout"
	};
	this.state = {};
	this.mapMoved = true;
}, {

	"eventHandlers" : {
		"AfterMapMoveEvent" : function(event) {
			var me = this, sandbox = this.getSandbox(), map = sandbox.getMap(), scale = map.getScale();

			var n = map.getY();
			var e = map.getX();
			var mapExtent = map.getExtent()
			var clonedExtent = {
				bottom : mapExtent.bottom,
				left : mapExtent.left,
				top : mapExtent.top,
				right : mapExtent.right
			};

			me.setNE(n, e, clonedExtent);

		},
		"MouseHoverEvent" : function(event) {
			var x0 = event.getLon();
			var y0 = event.getLat();

			if (!event.isPaused()) {
				return;
			}
			this.getFeatureInfo(x0, y0, true);
		},

		"MapLayerVisibilityChangedEvent" : function(event) {
			var me = this;
			var layer = event.getMapLayer();
			var layerId = layer.getId();
			if (layerId != this.layerId) {
				return;
			}

			if (this.paused) {
				return;
			}

			if (!this.mapMoved) {
				return;
			}

			var map = me.getSandbox().getMap();
			var extent = map.getExtent();
			var leftBottom = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
				x : extent.left,
				y : extent.bottom
			});
			var rightTop = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
				x : extent.right,
				y : extent.top
			});
			var transformedExtent = {
				left : leftBottom.x,
				bottom : leftBottom.y,
				right : rightTop.x,
				top : rightTop.y
			};
			var bboxTemplate = [transformedExtent.left, transformedExtent.bottom, transformedExtent.right, transformedExtent.top];

			var bbox = bboxTemplate.join(',');

			me.processWeather(bbox, function() {
				return;
			});

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
		}
	},

	processWeather : function(bbox, cb) {

		var me = this;
		if (me.stopped) {
			return;
		}

		var requestParameter = "ws_10min";
		// Stored query ids.
		var STORED_QUERY_OBSERVATION = "fmi::observations::weather::multipointcoverage";
		var STORED_QUERY_FORECAST = "fmi::forecast::hirlam::surface::point::multipointcoverage";

		// URL for test server.
		var TEST_SERVER_URL = "/weather/wfs";
		if (TEST_SERVER_URL.indexOf("insert-your-apikey-here") !== -1) {
			alert("Check connection.html source! TEST_SERVER_URL should contain proper API-key!");
		}

		var url = TEST_SERVER_URL;

		// See API documentation and comments from parser source code of
		// fi.fmi.metoclient.metolib.WfsConnection.getData function for the description
		// of function options parameter object and for the callback parameters objects structures.
		// Notice, when spatial data is requested through Connection API,
		// it always uses directly request parser instead of cache.
		var connection = new fi.fmi.metoclient.metolib.WfsConnection();
		if (connection.connect(url, STORED_QUERY_OBSERVATION)) {
			// Connection was properly initialized. So, get the data.

			var end = new Date();

			var begin = new Date(end.getTime() - 1000 * 60 * 60 * 2)

			connection.getData({
				requestParameter : requestParameter,
				// Integer values are used to init dates for older browsers.
				// (new Date("2013-05-10T08:00:00Z")).getTime()
				// (new Date("2013-05-12T10:00:00Z")).getTime()
				begin : begin,
				end : end,
				timestep : 15 * 60 * 1000,
				bbox : bbox,
				callback : function(data, errors) {
					// Handle the data and errors object in a way you choose.
					// Here, we delegate the content for a separate handler function.
					// See parser documentation from source code comments for more details.
					// Disconnect because the flow has finished.
					connection.disconnect();

					me.processWeatherJsonResponse(data);

					cb(data, errors);
				}
			});
		} else {
			cb({}, {
				fail : true
			});
		}

	},

	createMapVisualisation : function() {
		var me = this, sandbox = me.getSandbox();
		if (me.layerId && me.layer) {
			return;
		}

		/* should define how to handle these kinds of situations */
		var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
		if (!mapmodule.getLayerPlugin('vectorlayer')) {
			var veclayerPlugin = Oskari.clazz.create('Oskari.mapframework.mapmodule.VectorLayerPlugin');

			mapmodule.registerPlugin(veclayerPlugin);
			mapmodule.startPlugin(veclayerPlugin);
		}

		this.layerId = '____Weather___' + this.mediator.instanceid;
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
			"EPSG:4326" : new Proj4js.Proj("EPSG:4326"),
			"EPSG:3067" : new Proj4js.Proj("EPSG:3067")
		};
	},

	/**
	 * @method start
	 *
	 * start bundle instance register any resources, add layer to map
	 * and start worker
	 *
	 */
	"startProcessing" : function() {
		var me = this, sandbox = this.getSandbox(), map = sandbox.getMap(), scale = map.getScale();

		me.createProjs();

		me.createMapVisualisation();
		this.stopped = false;

		var n = map.getY();
		var e = map.getX();
		var mapExtent = map.getExtent()
		var clonedExtent = {
			bottom : mapExtent.bottom,
			left : mapExtent.left,
			top : mapExtent.top,
			right : mapExtent.right
		};

		me.setNE(n, e, clonedExtent);
	},

	"stopProcessing" : function() {

		this.stopped = true;

		var me = this;

	},

	setNE : function(n, e, extent) {
		this.ne = {
			n : n,
			e : e,
			extent : extent,
			processed : false
		};
		this.mapMoved = true;

	},

	defaults : {
		minScale : 8000000,
		maxScale : 1
	},

	getFeatureInfo : function(lon, lat, dontShow) {

		var me = this, flyout = me.plugins['Oskari.userinterface.Flyout'];
		if (!me.features)
			return;

		var pt = new OpenLayers.Geometry.Point(lon, lat);
		var c = OpenLayers.Geometry.Polygon.createRegularPolygon(pt, 64, 8);

		for (var f = 0; f < me.features.length; f++) {
			var feat = me.features[f];

			if (!feat.geometry)
				continue;

			var fg = new OpenLayers.Geometry.Point(feat.geometry.coordinates[0], feat.geometry.coordinates[1]);

			if (!fg.intersects(c)) {
				continue;
			}

			flyout.showWeatherFeature(feat);

			break;

		}

	},

	/**
	 * @property styledLayerDescriptors
	 *
	 * A set of SLD descriptors for this bundle
	 *
	 */
	styledLayerDescriptors : {
		'default' : '<StyledLayerDescriptor version="1.0.0" ' + 'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" ' + '    xmlns="http://www.opengis.net/sld" ' + '    xmlns:ogc="http://www.opengis.net/ogc" ' + '    xmlns:xlink="http://www.w3.org/1999/xlink" ' + '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> ' + '  <NamedLayer> ' + '    <Name>Simple point with stroke</Name> ' + '   <UserStyle><Title>GeoServer SLD Cook Book: Simple point with stroke</Title> ' + '    <FeatureTypeStyle><Rule>' + '<PointSymbolizer>' + ' <Graphic><Mark><WellKnownName>circle</WellKnownName><Fill>' + '        <CssParameter name="fill">#a00000</CssParameter>' + '       </Fill><Stroke>' + '          <CssParameter name="stroke">#000000</CssParameter>' + '           <CssParameter name="stroke-width">2</CssParameter>' + '          </Stroke></Mark><Size>12</Size></Graphic>' + '     </PointSymbolizer>' + '<TextSymbolizer><Label><ogc:PropertyName>title</ogc:PropertyName></Label>' + '<Fill><CssParameter name="fill">#000000</CssParameter></Fill></TextSymbolizer>' + '</Rule></FeatureTypeStyle>' + '</UserStyle></NamedLayer></StyledLayerDescriptor>'
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
			"name" : "Weather",
			"wmsName" : "1",
			"type" : "vectorlayer",
			"styles" : {
				"title" : "Weather",
				"legend" : "",
				"name" : "1"
			},
			"orgName" : "fmi.fi",
			"inspire" : "fmi.fi",
			"descriptionLink" : "http://www.fmi.fi/",
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

		var mapLayerService = this.sandbox.getService('Oskari.mapframework.service.MapLayerService');
		var mapLayer = mapLayerService.createMapLayer(spec);
		mapLayerService.addLayer(mapLayer);
		var layer = mapLayerService.findMapLayer(mapLayerId);
		this.layer = layer;

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

	},

	/**
	 * @method processWikipediaJsonResponse
	 *
	 */
	processWeatherJsonResponse : function(response) {

		var me = this;
		var proj4326 = me.projs["EPSG:4326"], proj3067 = me.projs["EPSG:3067"];

		var resultsBindings = response.locations;

		var features = [];
		var fc = {
			"type" : "FeatureCollection",
			"features" : features
		};

		jQuery.each(resultsBindings, function(indexInArray, valueOfElement) {
			var geometryCoords = [valueOfElement.info.position[1], valueOfElement.info.position[0]];
			var pos = Proj4js.transform(proj4326, proj3067, {
				x : geometryCoords[0],
				y : geometryCoords[1]
			});

			var label = valueOfElement.info.name;
			var unit = valueOfElement.data.ws_10min.property.unit;
			var timeValuePairs = valueOfElement.data.ws_10min.timeValuePairs
			var value = timeValuePairs[timeValuePairs.length - 1].value;

			features.push({
				"type" : "Feature",
				"geometry" : {
					"type" : "Point",
					"coordinates" : [pos.x, pos.y]
				},
				"properties" : {
					"title" : label,
					"value" : value,
					"unit" : unit
				}
			});

		});

		this.features = features;

		this.busy = false;
		this.mapMoved = false;

		var event = me.sandbox.getEventBuilder("FeaturesAvailableEvent")(me.layer, fc, "application/json", "EPSG:3067", "replace");

		me.sandbox.notifyAll(event);

	},
}, {
	"extend" : ["Oskari.userinterface.extension.DefaultExtension"]
});

