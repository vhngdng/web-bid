/* eslint-disable no-undef */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
        },
    },
    plugins: [],
});
