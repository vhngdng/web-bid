/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
        },
        colors: {
            'lime-rgb': 'rgb(190, 215, 176)',
            'green-rgb': 'rgb(110, 141, 133)',
            'blue-rgb': 'rgb(126, 155, 188)',
            'pink-rgb': 'rgb(226, 181, 244)',
        },
        maxHeight: {
            '75vh': '75vh',
            '60vh': '60vh',
            '65vh': '65vh',
        },
        backgroundImage: {
            'my-pattern':
                'linear-gradient(180deg, rgb(190, 215, 176) 0%, rgb(110, 141, 133)30%, rgb(126, 155, 188)60%, rgb(226, 181, 244)90%)',
        },
    },
    plugins: [require('tailwindcss-animation')],
});
