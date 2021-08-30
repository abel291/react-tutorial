const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            padding: {
                DEFAULT: "1rem",
                sm: "1rem",
                lg: "2rem",
                xl: "3rem",
                "2xl": "4rem",
            },
        },
        extend: {
            fontFamily: {
              'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
            }
          },
    },
    variants: {
        extend: {},
    },

    plugins: [require("@tailwindcss/forms")],
}
