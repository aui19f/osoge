/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        // 'shimmer'라는 이름의 애니메이션을 2초 동안 무한 반복합니다.
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        shimmer: {
          // 애니메이션 시작 (0%): 왼쪽 끝 (opacity 0)
          "0%": { backgroundPosition: "-1000px 0" },
          // 애니메이션 끝 (100%): 오른쪽 끝 (opacity 0)
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
