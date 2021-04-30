module.exports = {
  purge: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.100"),
            a: {
              color: theme("colors.pink.500"),
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.pink.600"),
                textDecoration: "none",
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
