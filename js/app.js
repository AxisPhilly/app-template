if (typeof app === 'undefined' || !app) {
  var app = {};
}

// Merge url params with settings set by user
// URL params take preference
app.mergeMapSettings = function() {
  var mapParams = {},
      urlParams = decodeURIComponent(location.hash.substring(1)).trim().split('/');

  if(urlParams[1] && typeof Number(urlParams[1]) === "number") {
    mapParams = {
      zoom: urlParams[1],
      center: [urlParams[2], urlParams[3]]
    };
  }

  _.defaults(mapParams, app.opts.mapOptions);

  return mapParams;
};

// Create the map
app.initMap = function(callback) {
  var mapSettings = app.mergeMapSettings();

  wax.tilejson(app.opts.tileURL,
  function(tilejson) {
    L.Icon.Default.imagePath = 'img/leaflet';

    app.map = new L.Map(app.opts.mapContainer, mapSettings)
      .addLayer(new wax.leaf.connector(tilejson))
      .setView(mapSettings.center, mapSettings.zoom);

    L.control.zoom({position: 'topright'}).addTo(app.map);

    app.map.attributionControl.addAttribution(
        'Map Data: (c) <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      );

    if(mapSettings.urlPosition === true) {
      app.setEvents();
    }

    if(callback && typeof callback === 'function') { callback(); }
  });
};

// Listen for changes as user pans and zoom on the map
app.setEvents = function() {
  app.map
    .on('zoomend', function(e) {
      app.updateURL();
    })
    .on('dragend', function(e) {
      app.updateURL();
    });
};

// Gets the current map center and zoom and sets
// those values in the url
// i.e. #zoom=12&lat=39.976&lng=-75.172
app.updateURL = function() {
  var zoom = app.map.getZoom(),
      lat = app.map.getCenter().lat.toFixed(3),
      lng = app.map.getCenter().lng.toFixed(3),
      params = '/' + zoom + '/' + lat + '/' + lng;

  location.hash = params;
};

// HTML5 browser location
app.getLocation = function(callback) {
  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert('Sorry. Your browser does not support this function.');
  }
};

// Add a marker at the given position and zoom to it
app.addMarker = function(lat, lng) {
  L.marker([lat, lng]).addTo(app.map);
  app.map.setView([lat, lng], 18);
};

// Send @address to the Nomatim geocoding service
app.geocodeRequest = function(address) {
  var url = 'http://open.mapquestapi.com/nominatim/v1/search.php?' +
            'format=json&json_callback=app.processGeocodeResponse&q=' + encodeURIComponent(address) +
            '&viewbox=40.125%2C-75.407%2C39.834%2C-75.017' +
            '&limit=1';

  $.ajax({
    url: url,
    dataType : "jsonp",
    success: function(resp) {
      app.processGeocodeResponse(resp);
    }
  });
};

// Plot the geocode response on the map, or 
// alert the user if there was an error
app.processGeocodeResponse = function(resp) {
  if(resp.length !== 0) {
    app.addMarker(resp[0].lat, resp[0].lon);
  } else {
    window.alert('Sorry, your search did have any results. ' +
      'Please try searching again or zooming to the location.');
  }

  if (app.geocodeDoneCallback && typeof app.geocodeDoneCallback === 'function') { app.geocodeDoneCallback(); }
};