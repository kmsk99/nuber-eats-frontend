const colors = require('tailwindcss/colors');

module.exports = {
    future: {},
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                lime: colors.lime,
            },
        },
    },
    variants: {},
    plugins: [],
};
