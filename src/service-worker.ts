/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
/* eslint-disable  */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { BASE_URL } from 'api/initializers/axios';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });

// Any other custom service worker logic can go here.
registerRoute(
  ({ url }) => {
    return `https://${url.host}/api` === BASE_URL
  },
  new NetworkFirst({
    cacheName: "url-GET",
  })
);

const bgSyncPlugin = new BackgroundSyncPlugin("POST-que", {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  ({ url }) => {
    return `https://${url.host}/api` === BASE_URL
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

self.addEventListener("install", event => {
   console.log("Service worker installed");
   self.skipWaiting();
});

self.addEventListener("activate", event => {
   console.log("Service worker activated");
});

self.addEventListener("push", (event) => {
  const payload = event.data ? event.data.json() : 'no payload';
  const title = 'New Rumorz';
  const options = {
    body: `${payload.location.location}\n${payload.user.username}: ${payload.content}`,
    icon: '/logo_rumorz.png',
    timestamp: payload.date,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(openUrl("https://echo-o.netlify.app"));
});


const openUrl = async(url: string) => {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (let i = 0; i < windowClients.length; i++) {
    const client = windowClients[i];
    if (client.url === url && "focus" in client) {
      return client.focus();
    }
  }
  if (self.clients.openWindow) {
    return self.clients.openWindow(url);
  }
  return null;
}