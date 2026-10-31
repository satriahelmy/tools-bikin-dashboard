(function (window, document) {
  'use strict';

  if (window.location.hostname !== 'tools.bikindashboard.com') return;

  var measurementId = 'G-XEBWBZB42D';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);
})(window, document);
