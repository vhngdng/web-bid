/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            keyframes: {
                wave: {
                    '0%': { transform: 'rotate(0.0deg)' },
                    '10%': { transform: 'rotate(14deg)' },
                    '20%': { transform: 'rotate(-8deg)' },
                    '30%': { transform: 'rotate(14deg)' },
                    '40%': { transform: 'rotate(-4deg)' },
                    '50%': { transform: 'rotate(10.0deg)' },
                    '60%': { transform: 'rotate(0.0deg)' },
                    '100%': { transform: 'rotate(0.0deg)' },
                },
            },
            animation: {
                'waving-hand': 'wave 2s linear infinite',
            },
            backgroundImage: {
                'my-pattern':
                    'linear-gradient(90deg, rgb(171, 185, 186)0% , rgb(235, 250, 248)30%, rgba(197, 205, 203, 0.815)60%, rgb(189, 211, 213)90%)',
            },
            height: {
                '93vh': '93vh',
                '90vh': '90vh',
                '85vh': '85vh',
                '80vh': '80vh',
                '75vh': '75vh',
                '60vh': '60vh',
                '65vh': '65vh',
                '53vh': '53vh',
                '50vh': '50vh',
                '45vh': '45vh',
                '30vh': '30vh',
                '10vh': '10vh',
                '7vh': '7vh',
                '5vh': '5vh',
                '1/10': '10%',
            },
            width: {
                '100vw': '100vw',
                '80vw': '80vw',
                '75vw': '75vw',
                '70vw': '70vw',
                '30vw': '30vw',
                '20vw': '20vw',
                '15vw': '15vw',
                '2vw': '2vw',
                '98vw': '98vw',
            },

            minWidth: {
                '1/2': '50%',
                '2/3': '2/3',
                '70vw': '70vw',
                '100vw': '100vw',
            },
            maxHeight: {
                '1/2': '50%',
                '30vh': '30vh',
                '1/10': '10%',
            },
            margin: {
                '5vw': '5vw',
                '5vh': '5vh',
            },
        },
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
            serif: ['Source Serif Pro', 'serif'],
            nowy: ['Poltawski Nowy', 'serif'],
        },
        colors: {
            'lime-rgb': 'rgb(190, 215, 176)',
            'green-rgb': 'rgb(110, 141, 133)',
            'blue-rgb': 'rgb(126, 155, 188)',
            'pink-rgb': 'rgb(226, 181, 244)',
            'red-rgb': 'rgb(212, 131, 93)',
        },
        maxHeight: {
            '75vh': '75vh',
            '60vh': '60vh',
            '65vh': '65vh',
        },
        minHeight: {
            '90vh': '90vh',
            '85vh': '85vh',
            '80vh': '80vh',
            '75vh': '75vh',
            '70vh': '70vh',
            '60vh': '60vh',
            '65vh': '65vh',
            '50vh': '50vh',
            '1/2': '50%',
        },
        // spacing: {
        //     '5vw': '5vw',
        // },
    },

    plugins: [
        require('tailwindcss-animation'),
        require('@tailwindcss/aspect-ratio'),
    ],
});
