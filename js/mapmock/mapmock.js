/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var map = L.map('map-div');

L.OfflineTileLayer = L.TileLayer.extend({
    getTileUrl : function(tilePoint, tile) {
        var zoom = tilePoint.z, x = tilePoint.x, y = tilePoint.y;

        if (mapsforge.cache) {
            mapsforge.cache.getTile([x,y,zoom],{ onSuccess: function(result) {tile.src=result;}, 
                                                 onError: function() {tile.src = "path to an error image";}});
        }else{
            tile.src = "path to an error image";
        }
    },

    _loadTile: function (tile, tilePoint) {
    tile._layer = this;
    tile.onload = this._tileOnLoad;
    tile.onerror = this._tileOnError;

    this._adjustTilePoint(tilePoint);
    this.getTileUrl(tilePoint, tile);

    this.fire('tileloadstart', {
                tile: tile,
                    url: tile.src
                });
    }
});

L.offlineTileLayer = function (options) {
  return new L.OfflineTileLayer(null, options);
};

L.offlineTileLayer({
    maxZoom: 18
}).addTo(map);

map.setView([43.360594,-5.849361],18);












































/// APPENDICE


/*
 * Line
mapsforge.embedded.COLOR_DKGRAY: -12303292;
mapsforge.embedded.COLOR_CYAN: -16711681;
mapsforge.embedded.COLOR_BLACK: -16777216;
mapsforge.embedded.COLOR_BLUE: -16776961;
mapsforge.embedded.COLOR_GREEN: -16711936;
mapsforge.embedded.COLOR_RED: -65536;
mapsforge.embedded.COLOR_WHITE: -1;
mapsforge.embedded.COLOR_TRANSPARENT: 0;
mapsforge.embedded.COLOR_YELLOW: -256;
*/
/*
 * MARKER
mapsforge.embedded.MARKER_RED: "marker_red";
mapsforge.embedded.MARKER_GREEN: "marker_green";
mapsforge.embedded.MARKER_BLUE: "marker_blue";
mapsforge.embedded.MARKER_YELLOW: "marker_yellow";
mapsforge.embedded.MARKER_BLACK: "marker_black";
mapsforge.embedded.MARKER_WHITE: "marker_white";
 */


/*
 * Methods
initialize([String mapFilePath, int viewWidth, int viewHeight], function success(result), function error(message)): The map file path provided must be the absolute file path. You can specify the width and height values for the view that will be added, or you can set them to 0 for set the value to MATCH_PARENT. You must call this method before any other method.
show(function success(result), function error(message)): To show the map view.
hide(function success(result), function error(message)): To hide the map view.
---
setCenter(double lat, double lng, function success(result), function error(message)): Sets the center of the map to the given coordinates.
setZoom(byte zoomLevel, function success(result), function error(message)): Sets the zoom to the specified value (if it is between the zoom limits).
setMaxZoom(byte maxZoom, function success(result), function error(message)): Sets the maximum zoom level.
setMinZoom(byte minZoom, function success(result), function error(message)): Sets the minimum zoom level.
setOfflineTileLayer([String mapFilePath, String renderThemePath], function success(result), function error(message)): The path to the map ile is required, and the path to the render theme may be null in order to apply the default render theme.
setOnlineTileLayer([String providerName, String host, String baseUrl, String extension, int port], function success(result), function error(message)): The best way to explain this function is through a call  mapsforge.embedded.setOnlineTileLayer(['MapQuest', 'otile1.mqcdn.com', '/tiles/1.0.0/map/', 'png', 80]);
---
addMarker([String marker_color, double lat, double lng], function success(result), function error(message)): Adds a marker to the map in the specified coordinates and returns the key for that marker to the success function. That key is the one you have to use if you want to delete it. The color of the marker should be one of the constants shown at the beginning of this section; if the marker doesn't exist a green marker will be used instead.
addPolyline([int color, int strokeWidth,[double points]], function success(result), function error(message)): Adds a polyline to the map and returns the key generated for it. The color can be one of the constants specified before, or the new color you want. This function will use the odd positions of the array of points for the latitudes and the even positions for the longitudes. Example: [lat1, lng1, lat2, lng2, lat3, lng3]. If the length of the array is not even, the function will throw an exception and return the error message to the error function.
deleteLayer(int key, function success(result), function error(message)): Deletes the layer(markers or polylines) with the specified key from the map.
---
onStart(function success(result), function error(message)): Initializes again the map if the onStop method was called.
onStop(function success(result), function error(message)): Stops the rendering. Useful for when the app goes to the background. You have to call the onStart method to restart it.
onDestroy(function success(result), function error(message)): Stops and cleans the resources that have been used.
*/


/*
 *Offline Tile Layer
--
render	--> .map --> PNG
use	--> .obj --> mapsforge.cache
--

initialize(String mapFilePath, function success(result), function error(message)): You should call this method before any other one, and provide it with the absolute map file path.
getTile([double lat, double lng, byte zoom], function success(result), function error(message)): This method is the one that provides the tiles, generating them if their are not in the cache. Despite the success function is optional, you should provide a valid function since this method will return the tile's path to your success function.
setCacheEnabled(boolean enabled, function success(result), function error(message)): Enables or disables the cache. If disabled, the plugin will generate the tiles always from scratch. Cache is enabled by default.
setExternalCache(boolean external, function success(result), function error(message)): Sets whether or not the cache should be placed in the internal memory or in the SD card. By default it is placed in SD card, so devices with not too much memory have a better performance.
setMapFile(String absolutePath, function success(result), function error(message)): Sets the map file to be used for rendering to the map specified by its absolute path.
setMaxCacheAge(long milliseconds, function success(result), function error(message)): Sets the age for the generated images. This means that when the cache is being cleaned, all images younger than the specified value will be kept in the cache in order to avoid deleting images that are being used at the moment.
setMaxCacheSize(int sizeInMB, function success(result), function error(message)): Sets the maximum size for the cache. This size must be specified in megabytes. If there is not that space available, the cache will fit the maximum size.
setTileSize(int size, function success(result), function error(message)): Sets the tile size. By default the tile size is set to 256.
setCacheCleaningTrigger(int sizeInMB, function success(result), function error(message)): This method sets the size in megabytes that will remain always available in memory in order to avoid that the application uses all space available.
destroyCacheOnExit(boolean destroy, function success(result), function error(message)): Sets a flag to destroy the cache when the onDestroy method is called.
onDestroy(function success(result), function error(message)): Deletes the cache depending on the flag state.


 */