var sb,sa,sb1,sb2,
    hash     = window.location.hash,
    locVal   = document.querySelector("[data-grab=locval]"),
    locBtn   = document.querySelector("[data-grab=locbtn]"),
    mapFrame = document.querySelector("[data-call=map]");

var shareLocation = function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      sa = position.coords.latitude;
      sb = position.coords.longitude;
      locVal.value = sa + "," + sb;
      window.location.hash = locVal.value;

      document.querySelector(".frame").innerHTML = "";
      var frame = document.createElement("iframe");
      frame.setAttribute("id", "frame");
      frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
      document.querySelector(".frame").appendChild(frame);
      var mapFrame = document.getElementById("frame");
      mapFrame.src = "/GPSLink/frame/#" + window.location.hash;
      locBtn.value = "Share";
    });
  }
}

if (hash) {
  // Grab URL Hash
  locVal.value = sb = sa = hash.toString().replace(/#/g,'');
  mapFrame.src = "/GPSLink/frame/#" + locVal.value;

  // Remove all text before character
  sb = sb.split(",").pop();
  // Remove all text after character
  sa = sa.substring(0, sa.indexOf(','));
  // Set location in textbox
  var LatnLng = sa + "," + sb;
  
  locBtn.value = "Locate Me";
} else {
  shareLocation();
}

// Change Map Location
locVal.onkeyup = function(e) {
  if (!this.value) {
    locBtn.value = "Locate Me";
    if (e.keyCode == 13) {
      shareLocation();
    }
  } else {
    locBtn.value = "Go To";
    if (e.keyCode == 13) {
      locBtn.click();
    }
  }
  
  if (window.location.hash === this.value) {
    locBtn.value = "Share";
    if (e.keyCode == 13) {
      locBtn.click();
    }
  }
}

// Click Button To Share Your Location
locBtn.onclick = function() {
  if (!locVal.value) {
    if (e.keyCode == 13) {
      shareLocation();
    }
  } else if (this.value === "Locate Me") {
    this.value = "Loading";
    locVal.value = window.location.hash.toString().replace(/#/g,'');
    shareLocation();
  } else if (this.value === "Share") {
    locVal.value = window.location.href;
  } else if (this.value === "Go To") {
    window.location.hash = locVal.value.replace(/#/g,'');
    document.querySelector(".frame").innerHTML = "";
    var frame = document.createElement("iframe");
    frame.setAttribute("id", "frame");
    frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
    document.querySelector(".frame").appendChild(frame);
    var mapFrame = document.getElementById("frame");
    mapFrame.src = "/GPSLink/frame/#" + locVal.value.replace(/#/g,'');
    locBtn.value = "Share";
  }
};

// Random background image onload

function changeImg(imgNumber) {
  var myImages = [
    "background/norway-mountain-sky-blue.jpg",
    "background/pexels-photo-28424.jpg",
    "background/pexels-photo-29967.jpg",
    "background/pexels-photo-50520.jpeg",
    "background/pexels-photo-52062.jpeg",
    "background/pexels-photo-70906.jpeg",
    "background/pexels-photo-80277.png",
    "background/pexels-photo-132076.jpeg",
    "background/pexels-photo-140928.jpeg",
    "background/pexels-photo-141557.jpeg"
  ];
  var imgShown = document.body.style.backgroundImage;
  var newImgNumber = Math.floor(Math.random()*myImages.length);
  document.body.style.backgroundImage = 'linear-gradient(rgba(0, 173, 255, 0.45), rgba(0, 173, 255, 0.45)), url('+myImages[newImgNumber]+')';
}
changeImg();