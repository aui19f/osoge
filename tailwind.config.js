/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          // 애니메이션 시작 (0%): 왼쪽 끝 (opacity 0)
          "0%": { backgroundPosition: "-1000px 0" },
          // 애니메이션 끝 (100%): 오른쪽 끝 (opacity 0)
          "100%": { backgroundPosition: "1000px 0" },
        },
        ellipsis1: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        ellipsis2: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(24px, 0)" },
        },
        ellipsis3: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        // 'shimmer'라는 이름의 애니메이션을 2초 동안 무한 반복합니다.
        shimmer: "shimmer 2s infinite",
        ellipsis1: "ellipsis1 0.6s infinite cubic-bezier(0,1,1,0)",
        ellipsis2: "ellipsis2 0.6s infinite cubic-bezier(0,1,1,0)",
        ellipsis3: "ellipsis3 0.6s infinite cubic-bezier(0,1,1,0)",
      },
    },
  },
  plugins: [],
  safelist: ["dark"], //추가!
};
