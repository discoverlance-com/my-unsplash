/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'primary-gray': {
					100: '#BDBDBD',
					200: '#4F4F4F',
					300: '#333333'
				},
				'primary-green': {
					100: '#3DB46D'
				},
				'primary-red': {
					100: '#EB5757'
				}
			}
		}
	},
	plugins: []
};
