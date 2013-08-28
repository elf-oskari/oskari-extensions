require.config({

    /* the base is set to requirejs lib to help requiring 3rd party libs */
    "baseUrl" : "../../../libraries/requirejs/lib",

    /* some path shortcuts to ease declarations */
    paths : {
        _bundles_ : '../../../bundles',
        _libraries_ : '../../../libraries',
        _applications_ : '../../../applications',
        _packages_ : '../../../packages',
        _resources_ : '../../../resources'

    },
    config: {
    	i18n: {
            locale: 'fi'
        }
    }

});

/* using provided jquery in this demo */
define("jquery", [], function() {
    return jQuery;
});

/* loading base requirements */
require(["jquery", "oskari", /*"oskariloader",*/"domReady!"],
/**
 * ... now we have jQuery and Oskari
 */
function($, Oskari) {

	/* loading configuration */
    require(["json!_applications_/oskari2/nextgen/config.json"],function(appConfig) {
        Oskari.setLang('fi');
        Oskari.setConfiguration(appConfig);

		/* loading openlayers first due to incomplete dependency declarations in this PoC */
        require(["_bundles_/oskari/bundle/map-openlayers/bundle"], function() {

			/* loading main map and divmanazer */
            require(["_bundles_/oskari/bundle/mapfull-openlayers/bundle", 
            	"_bundles_/framework/bundle/divmanazer/bundle"], 
            	function(mapfull, divmanazer) {

				/* starting to show user that something or another is happening */
                mapfull.start();
                divmanazer.start();

				/* loading more bundles */
                require(["_bundles_/require/bundle/require/bundle", 
                	"_bundles_/require/bundle/requiresf/bundle", 
                		"_bundles_/require/bundle/requireminimal/bundle", 
                			"_bundles_/require/bundle/requirenr/bundle", 
                				"_bundles_/require/bundle/requireminloc/bundle", 
                					"_bundles_/require/bundle/requirenop/bundle", 
                					"_bundles_/require/bundle/requirei18n/bundle"],
                	function(rclassic, rsinglefile, rminimal, rnorules, rminlinesofcode, rnop,ri18n) {

                    /* and starting */
                    rclassic.start();
                    rsinglefile.start();
                    rminimal.start();
                    rnorules.start();
                    rminlinesofcode.start();
                    rnop.start();
                    ri18n.start();

                })
            });
        });
    })
});
