/**
 * @class Oskari.mashup.bundle.WikipediaBundleInstance
 *
 * A fast and furious adaptation of wikipedia JSON by geonames to Oskari.
 *
 * This sample adds a vector layer to map.
 * This sample listens to some events to control wikipedia visualization and reloading.
 * This sample has no UI
 *
 *
 *
 *
 * Wikipedia Bundle Instance
 */
Oskari.clazz.define("Oskari.mashup.bundle.WikipediaBundleInstance", function(b) {

	this.url = 'http://api.geonames.org/wikipediaBoundingBoxJSON?';
	/*this.url = "http://na.nls.fi?";*/
	this.maxRows = 512;
	this.uriTemplate = [this.url,
		"maxRows=",this.maxRows,"&",
		"lang=","en","&", 
		"username=", "oskari","&"];	
	this.name = 'Wikipedia';

	this.mediator = null;
	this.sandbox = null;

	this.layerId = null;
	this.layer = null;

	this.ui = null;

	this.features = null;
	this.paused = false;
	this.busy = false;
	this.nextQuery = null;
},
/*
 * prototype
 */
{
	"createSpatialGeonamesQuery" : function(cn, ce, extent) {
		var emin = extent.left;
		var emax = extent.right;
		var nmin = extent.bottom;
		var nmax = extent.top;

		var queryArgTemplate = [
			"west=",emin,"&","east=",emax,"&","south=",nmin,"&","north=",nmax];

		return queryArgTemplate.join("");
	},
	"init" : function(sandbox) {

	},
	/**
	 * @method start
	 *
	 * start bundle instance register any resources, add layer to map
	 * and start worker
	 *
	 */
	"start" : function() {
		var me = this;

		if(this.mediator.getState() == "started")
			return;

		var sandbox = this.sandbox = Oskari.$("sandbox");
		sandbox.register(me);
		for(p in me.eventHandlers) {
			sandbox.registerForEventByName(me, p);
		}

		this.createProjs();

		this.startWorker();

		/* should define how to handle these kinds of situations */
		var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
		if(!mapmodule.getLayerPlugin('vectorlayer')) {
			var veclayerPlugin = Oskari.clazz.create('Oskari.mapframework.mapmodule.VectorLayerPlugin');

			mapmodule.registerPlugin(veclayerPlugin);
			mapmodule.startPlugin(veclayerPlugin);
		}

		this.layerId = '____Wikipedia___' + this.mediator.instanceid;
		this.addVectorLayer();

		this.mediator.setState("started");
		return this;
	},
	/**
	 * @method startWorker
	 *
	 * let's reload occasionally to show that wikipedia do move
	 *
	 */
	startWorker : function() {
		var me = this;

		/**
		 * throttled func
		 */

		me.func = window.setInterval(function() {
			me.processWikipediaQuery();
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
	/**
	 * @method createProjs
	 *
	 * Creates OpenLayers Projections for this bundle
	 * this
	 */
	createProjs : function() {
		var me = this;

		/*
		 * projection support
		 */
		this.projs = {
			"EPSG:4326" : new Proj4js.Proj("EPSG:4326"),
			"EPSG:3067" : new Proj4js.Proj("EPSG:3067")
		};
	},
	/**
	 * @method update
	 * notifications from the bundle manager
	 */
	"update" : function(manager, b, bi, info) {

	},
	/**
	 * @method stop
	 *
	 * stop bundle instance
	 *
	 */
	"stop" : function() {

		this.stopped = true;

		this.stopWorker();

		this.removeVectorLayer();

		var sandbox = this.sandbox;
		for(p in this.eventHandlers) {
			sandbox.unregisterFromEventByName(this, p);
		}

		this.mediator.setState("stopped");

		return this;
	},
	/**
	 * @method setNE
	 *
	 * support function for feature info requests
	 *
	 *
	 */
	setNE : function(n, e, extent) {
		this.ne = {
			n : n,
			e : e,
			extent : extent,
			processed : false
		};
		this.mapMoved = true;

	},
	/*
	 * @method onEvent
	 *
	 * event handler that dispatches events
	 * to handlers registered in eventHandlers props
	 *
	 */
	onEvent : function(event) {
		return this.eventHandlers[event.getName()].apply(this, [event]);
	},
	/**
	 * @property defaults
	 *
	 * some defaults for this bundle
	 */
	defaults : {
		minScale : 20000,
		maxScale : 1
	},

	/*
	 * @method getFeatureInfo
	 *
	 * search for any hits using OpenLayers geometry operations
	 *
	 */
	getFeatureInfo : function(lon, lat, dontShow) {

		var me = this;
		if(!me.features)
			return;

		var pt = new OpenLayers.Geometry.Point(lon, lat);
		var c = OpenLayers.Geometry.Polygon.createRegularPolygon(pt, 32, 8);

		for(var f = 0; f < me.features.length; f++) {
			var feat = me.features[f];

			if(!feat.geometry)
				continue;

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
			if(layer.getId() == this.layerId) {
				if(this.sandbox.getObjectCreator(event) != this.getName()) {

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

			if(!(scale < this.defaults.minScale && scale > this.defaults.maxScale))
				return;

			var n = event.getCenterY();
			var e = event.getCenterX();
			var scale = event.getScale();
			var mapExtent = sandbox.getMap().getExtent()
			var clonedExtent = {
				bottom : mapExtent.bottom,
				left : mapExtent.left,
				top : mapExtent.top,
				right : mapExtent.right
			};

			me.sandbox.printDebug("N:" + n + " E:" + e);
			/**
			 * throttled func to avoid overloading wikipedia JSONP
			 */
			me.setNE(n, e, clonedExtent);

		},
		/**
		 * @method eventHandlers.FeaturesGetInfoEvent
		 *
		 */
		"FeaturesGetInfoEvent" : function(event) {
			var sandbox = this.sandbox;

			var layer = event.getMapLayer();
			var layerId = layer.getId();
			if(layerId != this.layerId) {
				sandbox.printDebug("FeaturesGetInfoEvent@Wikipedia: " + this.layerId + " vs. queried " + layerId);
				return;
			}

			sandbox.printDebug("Handling FeaturesGetInfoEvent for " + this.layerId);

			var lon = event.getLon();
			var lat = event.getLat();

			this.getFeatureInfo(lon, lat);
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
			if(event.getMapLayerId() == this.layerId)
				this.layer = event.getLayer();
		},
		/**
		 * @method eventHandlers.AfterRemoveExternalMapLayerEvent
		 *
		 */
		"AfterRemoveExternalMapLayerEvent" : function(event) {
			if(event.getMapLayerId() == this.layerId)
				this.layer = null;
		},
		"MapLayerVisibilityChangedEvent" : function(event) {
			var layer = event.getMapLayer();
			var layerId = layer.getId();
			if(layerId != this.layerId) {
				return;
			}

			this.paused = !layer.isVisible();
		}
	},

	/**
	 * @method processWikipediaQuery
	 *
	 *
	 */

	processWikipediaQuery : function() {

		var me = this;
		var ne = me.ne;
		if(!ne)
			return;
		if(ne.processed)
			return;

		ne.processed = true;

		if(me.paused)
			return;

		if(me.stopped)
			return;

		if(me.busy)
			return;

		if(!me.mapMoved)
			return;

		me.busy = true;

		var n = ne.n;
		var e = ne.e;
		var extent = ne.extent;

		var pos = Proj4js.transform(me.projs["EPSG:3067"], me.projs["EPSG:4326"], {
			x : e,
			y : n
		});
		var lng = pos.x;
		var lat = pos.y;

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

		me.postWikipediaQuery(pos.y, pos.x, transformedExtent);

	},
	/**
	 * @method loadRSS
	 *
	 */
	postWikipediaQuery : function(cn, ce, extent) {
		var me = this;

		var query = this.createSpatialGeonamesQuery(cn, ce, extent);

		var uribase = me.uriTemplate.join('');
		var uri = [uribase, query].join('');

		jQuery.ajax({
			url : uri,
			dataType : "jsonp",
			success : function(data, textStatus) {
				me.processWikipediaJsonResponse(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(textStatus);

			}
		});

	},
	/**
	 * @method processWikipediaJsonResponse
	 *
	 */
	processWikipediaJsonResponse : function(response) {

		var me = this;
		var proj4326 = me.projs["EPSG:4326"], proj3067 = me.projs["EPSG:3067"];

		var resultsBindings = response.geonames;

		var features = [];
		var fc = {
			"type" : "FeatureCollection",
			"features" : features
		};

		jQuery.each(resultsBindings, function(indexInArray, valueOfElement) {
			var geometryCoords = [valueOfElement.lng,valueOfElement.lat];
			var pos = Proj4js.transform(proj4326, proj3067, {
					x : geometryCoords[0],
					y : geometryCoords[1]
				});

			var label = valueOfElement.title;
			var uri = valueOfElement.wikipediaUrl;
			var type = valueOfElement.feature;
			var summary = valueOfElement.summary;

			
			features.push({
				"type" : "Feature",
				"geometry" : {
					"type" : "Point",
					"coordinates" : [pos.x, pos.y]
				},
				"properties" : {
					"title" : label,
					"uri" : uri,
					"type" : type,
					"summary" : summary
				}
			});

		});

		this.busy = false;
		this.mapMoved = false;

		if(me.stopped)
			return;

		var event = me.sandbox.getEventBuilder("FeaturesAvailableEvent")(me.layer, fc, "application/json", "EPSG:3067", "replace");

		me.sandbox.notifyAll(event);

	},
	
	/**
	 * @property styledLayerDescriptors
	 *
	 * A set of SLD descriptors for this bundle
	 *
	 */
	styledLayerDescriptors : {
		'default' : '<StyledLayerDescriptor version="1.0.0" ' + 'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" ' + '    xmlns="http://www.opengis.net/sld" ' +
		 '    xmlns:ogc="http://www.opengis.net/ogc" ' + '    xmlns:xlink="http://www.w3.org/1999/xlink" ' + '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> ' + 
		 '  <NamedLayer> ' + '    <Name>Simple point with stroke</Name> ' + '   <UserStyle><Title>GeoServer SLD Cook Book: Simple point with stroke</Title> ' +
		  '    <FeatureTypeStyle><Rule>' + '<PointSymbolizer>' + ' <Graphic><Mark><WellKnownName>circle</WellKnownName><Fill>' + '        <CssParameter name="fill">#000080</CssParameter>' + '       </Fill><Stroke>' + '          <CssParameter name="stroke">#000000</CssParameter>' + '           <CssParameter name="stroke-width">2</CssParameter>' + '          </Stroke></Mark><Size>12</Size></Graphic>' + '     </PointSymbolizer>' + '<TextSymbolizer><Label><ogc:PropertyName>title</ogc:PropertyName></Label>' + '<Fill><CssParameter name="fill">#000000</CssParameter></Fill></TextSymbolizer>' + '</Rule></FeatureTypeStyle>' + '</UserStyle></NamedLayer></StyledLayerDescriptor>'
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
			"name" : "Wikipedia",
			"wmsName" : "1",
			"type" : "vectorlayer",
			"styles" : {
				"title" : "Wikipedia",
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
	__name : "Oskari.mashup.bundle.WikipediaBundleInstance"

}, {
	"protocol" : ["Oskari.bundle.BundleInstance", "Oskari.mapframework.module.Module", "Oskari.mapframework.bundle.extension.Extension", "Oskari.mapframework.bundle.extension.EventListener"]
});
