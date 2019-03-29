var map;
function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.148598, lng: 17.107748},
        disableDefaultUI: true,
        zoom:12
    });

    $(document).ready(function () {
        let infoWindows = [];
        let markers = [];

        function drawMarkers() {
            console.log('drawing markers');
            infoWindows.forEach((item) => {
                item.close();
            });
            infoWindows = [];
            markers.forEach((item) => {
                item.setMap(null);
            });
            markers = [];
            $.ajax({
                type: "GET",
                url: "/vehicles",
                xhrFields: { withCredentials: true },
                crossDomain: false
            }).done(function(reply) {
                console.log(reply);
                let image = {
                    url: '/images/bus_marker.png',
                };
                reply.vehicles.forEach((item) => {
                    let contentString = '<div id="content">'+
                        '<h4 id="firstHeading" class="firstHeading">'+ item.name +'</h4>'+
                        '<div id="bodyContent">'+
                        '<table class="table"><tr><td>Licence plate</td><td>' + item.licencePlate +
                        '</td></tr><tr><td>Occupancy</td><td>' + item.occupancy +
                        '</td></tr><tr><td>Capacity</td><td>' + item.capacity +
                        '</td></tr></table>' +
                        '</div>'+
                        '</div>';
                    let infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    infoWindows.push(infowindow);
                    let marker = new google.maps.Marker({
                        position: {lat: parseFloat(item.lastLat), lng: parseFloat(item.lastLng)},
                        map: map,
                        icon: image,
                        title: item.name + " " + item.licencePlate,
                    });
                    markers.push(marker);

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map,marker);
                    });

                });

                google.maps.event.addListener(map, "click", function(event) {
                    infoWindows.forEach((item) => {
                        item.close();
                    });
                });

            });
        }

        drawMarkers();

        setInterval(drawMarkers, 5000);


    })
}