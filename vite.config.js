import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: null,

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

			// workbox: {
			// 	globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
			// 	cleanupOutdatedCaches: true,
			// 	clientsClaim: true,
			// },

			// devOptions: {
			// 	enabled: false,
			// 	navigateFallback: 'index.html',
			// 	suppressWarnings: true,
			// 	type: 'module',
			// },
		}),
	],
});
