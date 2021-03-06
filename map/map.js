var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.39234762613166, 127.13087848124754),
    zoom: 16
});

var infowindows = [];

for (var i = 0, ii = CHURCHS.length; i < ii; i++) {

    let marker = new naver.maps.Marker({
        position: CHURCHS[i].position,
        map: map,
    });

    marker.set('seq', i);

    marker.addListener('click', onClick);

    let infowindow = new naver.maps.InfoWindow({
        content: [
            '<div class="wrap">',
            '   <div class="info">',
            '       <div class="title">' + CHURCHS[i].name,
            '           <div class="close" onclick="closeOverlay(' + CHURCHS[i].id + ');" title="닫기"></div>',
            '       </div>',
            '       <div class="body">',
            '           <div class="img">',
            '               <img src="' + CHURCHS[i].img + '" width="73" height="70">',
            '           </div>',
            '           <div class="desc">',
            '               <div class="ellipsis">담임목사: ' + CHURCHS[i].pastor + '</div>',
            '               <div class="jibun ellipsis">' + CHURCHS[i].address + '</div>',
            '               <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">자세히보기</a></div>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>'
        ].join(''),

        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: 'transparent',

        pixelOffset: new naver.maps.Point(73, 33),
    });

    infowindows.push(infowindow);

    icon = null;
    marker = null;
    infowindow = null;
}

function onClick(e) {
    let marker = e.overlay,
        seq = marker.get('seq'),
        infowindow = infowindows[seq];

    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수
function closeOverlay(churchId) {
    let infowindow = infowindows[churchId - 1];
    infowindow.close();
}