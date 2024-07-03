/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
	new RegExp('https://kit.fontawesome.com/caf6c2f77a.js'),
	//* Aplicar la estrategia que se desee
	new CacheFirst()
);

registerRoute(
	new RegExp('https://mern-calendar-nigthdreamer-3e02285419bf.herokuapp.com/api/auth/renew'),
	new NetworkFirst(),
);

registerRoute(
	new RegExp('https://mern-calendar-nigthdreamer-3e02285419bf.herokuapp.com/api/events'),
	new NetworkFirst()
);

// Offline Posts
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

const statusPlugin = {
  fetchDidSucceed: ({response}) => {
    if (response.status >= 500) {
      // Throwing anything here will trigger fetchDidFail.
      throw new Error('Server error.');
    }
    // If it's not 5xx, use the response as-is.
    return response;
  },
};

registerRoute(
	new RegExp('https://mern-calendar-nigthdreamer-3e02285419bf.herokuapp.com/api/events'),
	new NetworkOnly({
    plugins: [bgSyncPlugin, statusPlugin]
  }),
	'POST'
);