self.addEventListener('message', (event) => {
  if (event.data === 'VERSION') {
    event.source.postMessage({ typ: 'VERSION', version: VERSION });
  }
});
