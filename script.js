const darkModeToggle = document.querySelector('.dark-mode-toggle');
const textOnlyToggle = document.querySelector('.text-mode-toggle');
const batterySaverToggle = document.querySelector('.battery-saver-toggle');
const body = document.querySelector('body');
const main = document.querySelector('main');
const videoContainer = document.querySelector('.video-container');
const media = document.querySelectorAll('img, video, audio, iframe');

// Toggle Dark Mode
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('isDarkMode', true);
  } else {
    localStorage.setItem('isDarkMode', false);
  }
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// Toggle Text Only Mode
function toggleTextOnlyMode() {
  body.classList.toggle('text-only');
  media.forEach((element) => {
    element.classList.toggle('hidden');
  });
}

textOnlyToggle.addEventListener('click', toggleTextOnlyMode);

// Toggle Battery Saver Mode
function toggleBatterySaverMode() {
  body.classList.toggle('battery-saver');
  media.forEach((element) => {
    element.classList.toggle('hidden');
  });
}

batterySaverToggle.addEventListener('click', toggleBatterySaverMode);

// Check Battery Level
function checkBattery() {
  navigator.getBattery().then(function(battery) {
    if (battery.level < 0.1) {
      batterySaverToggle.classList.add('active');
      toggleBatterySaverMode();
    }
  });
}

checkBattery(); // Check battery level on page load

navigator.getBattery().then(function(battery) {
  battery.addEventListener('levelchange', function() {
    if (battery.level < 0.1 && !batterySaverToggle.classList.contains('active')) {
      batterySaverToggle.classList.add('active');
      toggleBatterySaverMode();
    } else if (battery.level >= 0.1 && batterySaverToggle.classList.contains('active')) {
      batterySaverToggle.classList.remove('active');
      toggleBatterySaverMode();
    }
  });
});

// Check Local Storage for Dark Mode
const isDarkMode = localStorage.getItem('isDarkMode');
if (isDarkMode === 'true') {
  toggleDarkMode();
}
