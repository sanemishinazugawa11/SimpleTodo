// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
        extend: {
            fontFamily: {
                switzer: ['Switzer', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
