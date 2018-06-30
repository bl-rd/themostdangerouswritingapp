const CACHE_NAME = 'MDWA';
const urls = [
  'index.html',
  'write.html',
  'help.html',
  'js/min/app.js',
  'js/min/common.js',
  'js/min/FileSaver.js',
  'js/min/jquery.js',
  'css/normalize.css',
  'css/common.css',
  'fonts/mdwa.eot',
  'fonts/mdwa.svg',
  'fonts/mdwa.ttf',
  'fonts/mdwa.woff',
  'fonts/mdwa.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('opened cache');
        return cache.addAll(urls);
      })
      .catch(reason => console.log({reason}))
  )
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(fetchFail => console.log({fetchFail}))
      })
      .catch(reason => console.log({reason})) 
  )
});