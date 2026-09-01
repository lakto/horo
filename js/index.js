// Add your own dark/night images to img/backgrounds/ and list their filenames here.
var backgroundImages = [
  'img/moon.jpg',
  'img/the-view.jpg',
  'img/vorstadt.jpg'
];

if (backgroundImages.length > 0) {
  var randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.body.style.backgroundImage = "url('" + randomImage + "')";
}

setInterval(function() {
  var secondsEl = document.querySelector('.seconds');
  var minutesEl = document.querySelector('.minutes');
  var hoursEl = document.querySelector('.hours');

  var secondsSize = secondsEl.offsetWidth;
  var minutesSize = minutesEl.offsetWidth;
  var hoursSize = hoursEl.offsetWidth;

  var seconds = new Date().getSeconds();
  var sdegree = seconds * 6 + 270;
  var stranslate = Math.round(hoursSize / 2 + secondsSize / 2);
  seconds = ("0" + seconds).slice(-2);
  secondsEl.style.transform = "rotate(" + sdegree + "deg) translate(" + stranslate + "px) rotate(-" + sdegree + "deg)";
  secondsEl.textContent = seconds;

  var minutes = new Date().getMinutes();
  var mdegree = minutes * 6 + 270;
  var mtranslate = Math.round(hoursSize / 2 + minutesSize / 2);
  minutes = ("0" + minutes).slice(-2);
  minutesEl.style.transform = "rotate(" + mdegree + "deg) translate(" + mtranslate + "px) rotate(-" + mdegree + "deg)";
  minutesEl.textContent = minutes;

  var hours = new Date().getHours();
  hours = ("0" + hours).slice(-2);
  hoursEl.textContent = hours;

}, 1000);