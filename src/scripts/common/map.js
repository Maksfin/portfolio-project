const map, marker, piter = new google.maps.LatLng(59.731269, 30.611774),
    size, newPiter = new google.maps.LatLng(59.733335, 30.604035),
    image;
if (window.innerWidth <= 768) {
    size = piter
} else {
    size = newPiter
}

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: size,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [{
                featureType: 'water',
                stylers: [{
                    color: '#86a77a'
                }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#f2f2f2'
                }]
            },
            {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    color: '#eaeaea'
                }]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            },
            {
                featureType: "road.arterial",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }
        ]
    });

    image = new google.maps.MarkerImage(
        'assets/img/icons/map_marker.svg',
        new google.maps.Size(40, 60),
        new google.maps.Point(0, 0),
    );
    marker = new google.maps.Marker({
        position: piter,
        map: map,
        icon: image
    });
}
google.maps.event.addDomListener(window, 'load', initialize);