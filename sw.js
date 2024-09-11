
const STATIC_CACHE_NAME = 'static-cache-v1.3';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const cleanCache = (cacheName, limitItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > limitItems) {
        cache.delete(keys[0]).then(cleanCache(cacheName, limitItems));
      }
    });
  });
};

self.addEventListener('install', (event) => {
  const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
    return cache.addAll([
      '/',
      'index.html',
      'images/icons/android-launchericon-48-48.png',
      'images/icons/android-launchericon-72-72.png',
      'images/icons/android-launchericon-96-96.png',
      'images/icons/android-launchericon-144-144.png',
      'images/icons/android-launchericon-192-192.png',
      'images/icons/android-launchericon-512-512.png',
      'manifest.json',
      'pages/offline.html',
      'images/error.png'
    ]);
  });

  self.addEventListener('activate', (evemt=>{
    console.log('activado');
    const proDelete = caches.keys().then((cachesItems)=>{
        cachesItems.forEach(element => {
            if(element != STATIC_CACHE_NAME && element.includes('static')){
                return caches.delete(element)
            }
        });
    })
    event.waitUntil(proDelete)
  }));


  const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
    return cache.addAll([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
    ]);
  });

  event.waitUntil(Promise.all([respCache, respCacheInmutable]));
});

// self.addEventListener('fetch',(event)=>{
//     const resp = caches.match(event.request)
//     event.respondWith(resp)  
// })
/*
self.addEventListener('fetch', (event) => {
  const resp = caches.match(event.request).then((respCache) => {
    if (respCache) {
      return respCache;
    }
    return fetch(event.request).then((respWeb) => {
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        cache.put(event.request, respWeb);
        cleanCache(DYNAMIC_CACHE_NAME, 10);
      });
      return respWeb.clone();
    });
  }).catch((err)=>{
    if(event.request.headers.get('accept').includes('text/html')){
        return caches.match('pages/offline.html')
    }
    if(event.request.headers.get('accept').includes('image')){
        return caches.match('/images/error.png')
    }   
    
  });
  event.respondWith(resp);
});











const STATIC_CACHE_NAME = 'static-cache-v1.2';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';



self.addEventListener('install', (event)=>{
    console.log('SW: instalado');
    console.log(event.request.url);
    /*guardar cache de rutas estáticas, las cuales no cambian
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache)=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/manifest.json',
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        ]);
        
    });
    //Rutas inmutables (que son CDN, o recursos que usamos)
    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME)
        .then((cache)=>{
            return cache.addAll([

                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                    'http://localhost:8080/images/icons/android-launchericon-144-144.png'
                ]);
        });
    
    event.waitUntil(Promise.all[respCache, respCacheInmutable]); //espera a que se terminen de crear esos dos caches.


});

/*primero intento siempre ir a la web y si no cache
self.addEventListener('fetch', (event)=>{
    console.log(event.request.url);

    const resp = fetch(event.request).then((respWeb)=>{
        if(!respWeb.ok){
            
            return caches.match(event.request)
              
        }

        caches.open(DYNAMIC_CACHE_NAME).then((cacheDynamic)=>{
            cacheDynamic.put(event.request, respWeb)
        })

        return respWeb.clone();
    }).catch(()=>{
        return caches.match(event.request)
    })


    event.respondWith(resp);
})*/

