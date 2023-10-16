/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        default: "1440px",
        tablet: "1140px",
      },
      padding: {
        155: "155px",
        55: "55px",
      },
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        dark: "#161616",
        input: "#2A2B31",
        hover: "#202124",
        outline: "#333535",
        hint: "#41434E",
        error: "#E76143",
        disabled: "#2D2D2D",
      },
      borderColor: {
        input: "#333535",
        error: "#E76143",
      },
      width: {
        input: "325px",
        1440: "1440px",
        1130: "1130px",
        724: "724px",
      },
      maxWidth: {
        input: "325px",
      },
      height: {
        input: "52px",
      },
      minHeight: {
        30: "30px",
      },
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }),
    function styleInputRange({ addUtilities }) {
      const rangeStyles = {
        ".thumb": {
          "-webkit-appearance": "none",
          height: "2px",
          background: "transparent",
          outline: "none",
          cursor: "pointer",
          position: "absolute",
          left: "0",
          bottom: "-1px",
          width: "100%",
        },
        ".thumb::-webkit-slider-thumb": {
          "-webkit-appearance": "none",
          width: "16px",
          height: "16px",
          background: "#FBE54D",
          border: "none",
          borderRadius: "50%",
          marginTop: "-7px",
        },
        ".thumb::-moz-range-thumb": {
          width: "16px",
          height: "16px",
          border: "none",
          borderRadius: "50%",
        },
        ".thumb::-webkit-slider-runnable-track": {
          width: "100%",
          height: "2px",
          cursor: "pointer",
          borderRadius: "1.5px",
        },
        ".thumb::-moz-range-progress": {
          background: "#FBE54D",
        },
        ".thumb::-moz-range-track": {
          width: "100%",
          height: "2px",
          cursor: "pointer",
          background: "#333535",
          borderRadius: "1.5px",
        },
      };

      addUtilities(rangeStyles, ["responsive", "hover"]);
    },
  ],
};
