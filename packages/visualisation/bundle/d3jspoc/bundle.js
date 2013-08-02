/**
 * @class Oskari.sample.bundle.visualisation.D3ProofOfConceptBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.visualisation.bundle.d3jspoc.D3ProofOfConceptBundle",
/**
 * @method create called automatically on construction
 * @static
 */ 
function() {

}, {
    "create" : function() {
        var me = this;
        var inst = Oskari.clazz.create("Oskari.visualisation.bundle.d3jspoc.D3ProofOfConceptBundleInstance");
        return inst;

    },
    "update" : function(manager, bundle, bi, info) {

    }
}, {

    "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source" : {

        "scripts" : [{
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/instance.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/Flyout.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/Tile.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/Scene.js"
        },{
            "type" : "text/css",
            "src" : "../../../../resources/visualisation/bundle/d3jspoc/css/style.css"
        }],

        "locales" : [{
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/locale/fi.js"
        }, {
            "lang" : "sv",
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/locale/sv.js"
        }, {
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/visualisation/bundle/d3jspoc/locale/en.js"
        }]
    },
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "visualisation",
            "Bundle-Name" : "visualisation",
            "Bundle-Author" : [{
                "Name" : "ev",
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
            }],
            "Bundle-Name-Locale" : {
                "fi" : {
                    "Name" : " style-1",
                    "Title" : " style-1"
                },
                "en" : {}
            },
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}

        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies" : ["jquery"]

});

Oskari.bundle_manager.installBundleClass("d3jspoc", "Oskari.visualisation.bundle.d3jspoc.D3ProofOfConceptBundle");
