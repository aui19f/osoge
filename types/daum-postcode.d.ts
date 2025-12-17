import { DaumPostcodeData } from "@/types/doum-postcode";

export {};
/**
 * 파일을 module scope로 만들기 위함해 export{}를 작성
 * 만약, 없으면 TS가 “이 파일은 스크립트다”로 인식
 * -> Next.js + TS에서 전역 선언 누락 버그 방지
 *
 * 그리고, tsconfig.json에 include에서  아래 문구 추가
 */
//"src/types/**/*.d.ts"

/**
 * declare global -- 전역 스코프에 타입을 추가(확장)
 *
 * 보통 window, document 처럼 이미 존재하는 전역 객체에
 * 우리가 쓰는 속성을 타입으로만 알려줄 때 사용
 *
 * 실제 코드를 추가하는 게 아니라 TypeScript 컴파일러용 선언입니다.
 * ❗ JS 실행 결과에는 아무 영향이 없습니다.
 */

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open: () => void };
    };
  }
}
