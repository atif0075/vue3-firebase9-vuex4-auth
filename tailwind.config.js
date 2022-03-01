module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#141E27",
        light: "#f4f7f6",
        red: "#ff4e4e",
        "mid-light": "#f4f7f675",
        "mid-dark": "#20212171",
      },
      width: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
