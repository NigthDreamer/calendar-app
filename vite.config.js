import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'Calendar',
        short_name: 'Calendar',
        description: 'Aplicacion del calendario',
        theme_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /https:\/\/kit\.fontawesome\.com\/\.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontawesome-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /https:\/\/mern-calendar-nigthdreamer-3e02285419bf\.herokuapp\.com\/api\/auth\/renew/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'renew-network-first',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            urlPattern: /https:\/\/mern-calendar-nigthdreamer-3e02285419bf\.herokuapp\.com\/api\/events/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'events-network-first',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            handler: 'NetworkOnly',
            urlPattern: /https:\/\/mern-calendar-nigthdreamer-3e02285419bf\.herokuapp\.com\/api\/events/i,
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'offlinePostsQueue',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
          {
            handler: 'NetworkOnly',
            urlPattern: /https:\/\/mern-calendar-nigthdreamer-3e02285419bf\.herokuapp\.com\/api\/events/i,
            method: 'PUT',
            options: {
              backgroundSync: {
                name: 'offlinePutsQueue',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
          {
            handler: 'NetworkOnly',
            urlPattern: /https:\/\/mern-calendar-nigthdreamer-3e02285419bf\.herokuapp\.com\/api\/events/i,
            method: 'DELETE',
            options: {
              backgroundSync: {
                name: 'offlineDeletesQueue',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
        ]
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});
