let targetLatLng = [49.09231942317087, -122.4919778153591]; // LIG
let goalMarkerImg = "../imgs/lion.png";
let map;

//ボタンの追加
const getRoutebtn = document.createElement("button");
getRoutebtn.textContent = "Route from your current location";
getRoutebtn.classList.add("custom-map-control-button");

const initialize = function () {
  let options = {
    zoom: 16,
    center: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById("map"), options);
  new google.maps.Marker({
    position: { lat: targetLatLng[0], lng: targetLatLng[1] },
    map: map,
    title: "parking lot",
    icon: goalMarkerImg,
  });
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(getRoutebtn); // btnを地図に追加している

  getRoutebtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        let startLatLng = [pos.lat, pos.lng];
        let rendererOptions = {
          map: map, // 描画先の地図
          draggable: true, // ドラッグ可
          preserveViewport: true, // centerの座標、ズームレベルで表示
          suppressMarkers: true, // デフォルトのマーカーを削除
        };
        let directionsDisplay = new google.maps.DirectionsRenderer(
          rendererOptions
        );
        let directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(map);
        let request = {
          origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), // スタート地点
          destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), // ゴール地点
          travelMode: google.maps.DirectionsTravelMode.DRIVING, // 移動手段
        };
        directionsService.route(request, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              suppressMarkers: true, // デフォルトのマーカーを削除
            });
            let leg = response.routes[0].legs[0];
            // makeMarker(leg.end_location, markers.goalMarker, map);
            setTimeout(function () {
              map.setZoom(16); // ルート表示後にズーム率を変更
            });
          }
        });

        function makeMarker(position, icon, map) {
          let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
          });
        }
        let markers = {
          goalMarker: new google.maps.MarkerImage(
            goalMarkerImg, // 画像のパス
            new google.maps.Size(24, 33), // マーカーのwidth,height
            new google.maps.Point(0, 0), // 画像データの中で、どの部分を起点として表示させるか
            new google.maps.Point(12, 33), // マーカーのpositionで与えられる緯度経度を画像のどの点にするか
            new google.maps.Size(24, 33)
          ), // 画像の大きさを拡大縮小
        };

        /////////

        /////////
      });
    }
  });
};

initialize();

//////////////gsap animation//////////////
let tl = gsap.timeline({ defaults: { y: 50, autoAlpha: 0 } });
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({ scrub: 1 });

tl.from(".hoursandRate", {
  // y: 50,
  // autoAlpha: 0,
  scrollTrigger: {
    trigger: ".card",
    start: "top center+=30%",
    end: "bottom 70%",
  },
})
  .from(".addressAndFQ", {
    scrollTrigger: {
      trigger: ".FQ",

      end: "bottom 80%",
    },
  })
  .from(".how-to-get", {
    scrollTrigger: {
      trigger: ".by-car",
      end: "bottom 80%",
    },
  })
  .from(".parking-info", {
    scrollTrigger: {
      trigger: "#map",
      end: "bottom 80%",
    },
  })
  .from(".form-section", {
    scrollTrigger: {
      trigger: ".form-section",
      end: "center 80%",
    },
  });
