self.addEventListener('install', async () => {
	console.log('install');
	const cache = await caches.open('cache-1');
	await cache.addAll(['https://kit.fontawesome.com/caf6c2f77a.js', '/vite.svg']);
});

const apiOfflineFallbacks = [
	'https://mern-calendar-nigthdreamer-3e02285419bf.herokuapp.com/api/auth/renew',
	'https://mern-calendar-nigthdreamer-3e02285419bf.herokuapp.com/api/events',
];

self.addEventListener('fetch', (event) => {
	console.log(event.request.url);

	if (!apiOfflineFallbacks.includes(event.request.url)) return;

	const resp = fetch(event.request)
		.then((response) => {
			if (!response) {
				return caches.match(event.request);
			}

			caches.open('cache-dynamic').then((cache) => {
				// Si ya existe lo que queremos grabar, se sobrescribe
				cache.put(event.request, response);
			});

			return response.clone();
		})
		.catch(() => {
			console.log('offline response');
			// Devuelve la entrada del cache que coincida con la key
			return caches.match(event.request);
		});

	event.respondWith(resp);
});
