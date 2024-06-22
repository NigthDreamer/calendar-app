self.addEventListener('install', async () => {
  console.log('install');
	const cache = await caches.open('cache-1');
  await cache.addAll([
    'https://kit.fontawesome.com/caf6c2f77a.js',
    '/vite.svg'
  ]);
});
