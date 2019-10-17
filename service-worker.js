// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var cacheName = 'Offline_1019';
var filesToCache = [
'.',
	'css/css.css',
	'fontawesome/css/all.css',
	'fontawesome/webfonts/fa-brands-400.eot',
	'fontawesome/webfonts/fa-brands-400.woff',
	'fontawesome/webfonts/fa-brands-400.ttf',
	'fontawesome/webfonts/fa-regular-400.eot',
	'fontawesome/webfonts/fa-regular-400.woff',
	'fontawesome/webfonts/fa-regular-400.ttf',
	'fontawesome/webfonts/fa-solid-900.eot',
	'fontawesome/webfonts/fa-solid-900.woff',
	'fontawesome/webfonts/fa-solid-900.ttf',
	'images/logo.png',
	'images/iconos_cafe.png',
	'images/no-image.png',
	'images/icons/icon-32x32.png',
	'images/icons/icon-128x128.png',
	'images/icons/icon-144x144.png',
	'images/icons/icon-152x152.png',
	'images/icons/icon-192x192.png',
	'images/icons/icon-256x256.png',
	'js/js.js',
	'activacion.html',
	'ajustes.html',
	'capuchinos.html',
	'favicon.ico',
	'frapes.html',
	'grano.html',
	'index.html',
	'tgo.html',
	'manifest.json'
	];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);

    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
