(function () {
  function starten() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const style = document.createElement('style');
    style.textContent = [
      '#version {',
      '  position: fixed;',
      '  right: 12px;',
      '  bottom: 8px;',
      '  font-size: 0.75rem;',
      '  color: rgba(255, 255, 255, 0.45);',
      '  user-select: none;',
      '}'
    ].join('\n');
    document.head.appendChild(style);

    const versionAnzeige = document.createElement('div');
    versionAnzeige.id = 'version';
    document.body.appendChild(versionAnzeige);

    const hatteController = !!navigator.serviceWorker.controller;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hatteController) {
        window.location.reload();
      }
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.typ === 'VERSION') {
        versionAnzeige.textContent = event.data.version;
      }
    });

    function versionAnzeigen() {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage('VERSION');
      }
    }

    versionAnzeigen();
    navigator.serviceWorker.ready.then(versionAnzeigen);
  }

  if (document.body) {
    starten();
  } else {
    document.addEventListener('DOMContentLoaded', starten);
  }
})();
