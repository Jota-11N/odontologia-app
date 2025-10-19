/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E66A00", // naranja oscuro (color principal)
        secondary: "#002B5B", // azul oscuro (para encabezados o detalles)
        dark: "#000000", // negro (texto o contraste)
        light: "#FFFFFF", // blanco (fondo o textos)
        graybg: "#F8F8F8", // gris suave para fondos
      },
    },
  },
  plugins: [],
};
