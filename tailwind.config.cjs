
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: {
				light: '#2C2942',
				DEFAULT: '#0f0e17',
				dark: '#0D0C12'
			},
			white: {
				light: '#F7F7F5',
				DEFAULT: '#F6F6F4',
				dark: '#D5D5CB'
			},
			highlight: {
				light: '#FF9C2B',
				DEFAULT: '#ff8906',
				dark: '#CD7511'
			},

			second: {
				light: '#F37666',
				DEFAULT: '#F25F4C',
				dark: '#DE432E'
			},
			third: {
				light: '#EA5187',
				DEFAULT: '#E53170',
				dark: '#C62960'
			},
			offwhite: {
				light: '#B4B6C8',
				DEFAULT: '#a7a9be',
				dark: '#8B8DA4'
			},
			valid: {
				light: '#A3E9A4',
				DEFAULT: '#8DE68D',
				dark: '#6BCF6B'
			},
			invalid: {
				light: '#F9A3A3',
				DEFAULT: '#F88D8D',
				dark: '#CF6B6B'
			},
			codeMetasequence: '#a7a9be',
			codeCharClass: '#be95c4',
			codeCharClassMetaSequence: '#9f86c0',
			codeRangeHyphen: '#FF9C2B',
			codeDepth1: '#0077b6',
			codeDepth2: '#0096c7',
			codeDepth3: '#00b4d8',
			codeDepth4: '#48cae4',
			codeDepth5: '#90e0ef',
			codeError: '#c1121f',
		}
	},
	plugins: []
};
