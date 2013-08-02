
/**
 * @class Oskari.mapframework.bundle.SolSolBundle
 * 
 */
Oskari.clazz
		.define(
				"Oskari.games.bundle.solsol.SolSolBundle",
				/**
				 * @constructor
				 * 
				 * Bundle's constructor is called when bundle is created. At
				 * this stage bundle sources have been loaded, if bundle is
				 * loaded dynamically.
				 * 
				 */
				function() {

					/*
					 * Any bundle specific classes may be declared within
					 * constructor to enable stealth mode
					 * 
					 * When running within map application framework - Bundle
					 * may refer classes declared with Oskari.clazz.define() -
					 * Bundle may refer classes declared with Ext.define -
					 * Bundle may refer classes declared within OpenLayers
					 * libary
					 * 
					 * 
					 */
				},

				{
					/*
					 * @method create
					 * 
					 * called when a bundle instance will be created
					 * 
					 */
					"create" : function() {

						return Oskari.clazz
								.create("Oskari.games.bundle.solsol.SolSolBundleInstance");
					},

					/**
					 * @method update
					 * 
					 * Called by Bundle Manager to provide state information to
					 * bundle
					 * 
					 */
					"update" : function(manager, bundle, bi, info) {

					}

				},

				/**
				 * metadata
				 */
				{

					"protocol" : [ "Oskari.bundle.Bundle",
							"Oskari.mapframework.bundle.extension.ExtensionBundle" ],
					"source" : {

						"scripts" : [ {
							"type" : "text/javascript",
							"src" : "../../../../bundles/games/bundle/solsol/SolitairePlayer.js"
						}, {
							"type" : "text/css",
							"src" : "../../../../resources/games/bundle/solsol/solitaire.css"
						},{
							"type" : "text/javascript",
							"src" : "../../../../bundles/games/bundle/solsol/instance.js"
						},{
							"type" : "text/javascript",
							"src" : "../../../../bundles/games/bundle/solsol/Flyout.js"
						},{
							"type" : "text/javascript",
							"src" : "../../../../bundles/games/bundle/solsol/Tile.js"
						} ]
					},
					"bundle" : {
						"manifest" : {
							"Bundle-Identifier" : "solsol",
							"Bundle-Name" : "solsol",
							"Bundle-Author" : [ {
								"Name" : "jjk",
								"Organisation" : "nls.fi",
								"Temporal" : {
									"Start" : "2009",
									"End" : "2011"
								},
								"Copyleft" : {
									"License" : {
										"License-Name" : "EUPL",
										"License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
									}
								}
							} ],
							"Bundle-Name-Locale" : {
								"fi" : {
									"Name" : " solsol",
									"Title" : " solsol"
								},
								"en" : {}
							},
							"Bundle-Version" : "1.0.0",
							"Import-Namespace" : [ "Oskari", "jQuery" ],
							"Import-Bundle" : {}
						}
					}
				});

/**
 * Install this bundle by instantating the Bundle Class
 * 
 */
Oskari.bundle_manager.installBundleClass("solsol",
		"Oskari.games.bundle.solsol.SolSolBundle");
