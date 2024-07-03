/* eslint-disable no-undef */
module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,html,svg}'
	],
	swDest: 'dist/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
  swSrc: 'src/sw-template.js' // generateSW no funciona con esta propiedad
};