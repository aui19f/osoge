"use server";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import { z } from "zod";

/**
 * 비밀번호 유효성 검사 스키마
 * - 8글자 이상
 * - 영문과 숫자 포함
 * - @ 또는 _ 중 하나 포함
 */
const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8글자 이상이어야 합니다.")
  .regex(/[a-zA-Z]/, "비밀번호는 영문을 포함해야 합니다.")
  .regex(/\d/, "비밀번호는 숫자를 포함해야 합니다.")
  .regex(/[@_]/, "비밀번호는 @ 또는 _ 중 하나를 포함해야 합니다.");

/**
 * 비밀번호 변경 요청 스키마
 */
const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
  newPassword: passwordSchema,
});

/**
 * 프로필 업데이트 스키마
 */
const updateProfileSchema = z
  .object({
    nickname: z.string().max(20, "닉네임은 20자 이하여야 합니다.").optional(),
    email: z.string().email("올바른 이메일 형식을 입력해주세요.").optional(),
  })
  .refine((data) => data.nickname || data.email, {
    message: "업데이트할 정보를 입력해주세요.",
    path: ["nickname"], // 에러 경로 지정
  });

/**
 * 사용자 비밀번호 업데이트 함수
 * @param currentPassword - 현재 비밀번호
 * @param newPassword - 새로운 비밀번호
 * @returns 업데이트 결과
 */
export async function updateUserPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Zod를 사용한 입력값 검증
    const validationResult = updatePasswordSchema.safeParseAsync({
      currentPassword,
      newPassword,
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        "입력값이 올바르지 않습니다.";
      return {
        success: false,
        message: errorMessage,
      };
    }

    // 세션 확인
    const session = await getSession();
    if (!session || !session.id) {
      return {
        success: false,
        message: "로그인이 필요합니다.",
      };
    }

    // 현재 사용자 정보 조회 (password 필드 제거)
    const user = await db.users.findUnique({
      where: { id: session.id },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        message: "사용자 정보를 찾을 수 없습니다.",
      };
    }

    // 비밀번호 변경 기능이 현재 데이터베이스 구조에서 지원되지 않음
    return {
      success: false,
      message: "비밀번호 변경 기능은 현재 지원되지 않습니다.",
    };
  } catch (error) {
    console.error("비밀번호 업데이트 중 오류 발생:", error);

    // 데이터베이스 연결 오류 처리
    if (error instanceof Error && error.message.includes("connect")) {
      return {
        success: false,
        message: "데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    // 기타 예상치 못한 오류
    return {
      success: false,
      message:
        "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 사용자 프로필 정보 업데이트 함수
 * @param data - 업데이트할 사용자 데이터
 * @returns 업데이트 결과
 */
export async function updateUserProfile(data: {
  nickname?: string;
  email?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Zod를 사용한 입력값 검증
    const validationResult = await updateProfileSchema.safeParseAsync(data);

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        "입력값이 올바르지 않습니다.";
      return {
        success: false,
        message: errorMessage,
      };
    }

    // 세션 확인
    const session = await getSession();
    if (!session || !session.id) {
      return {
        success: false,
        message: "로그인이 필요합니다.",
      };
    }

    // 사용자 정보 업데이트
    await db.users.update({
      where: { id: session.id },
      data: {
        ...validationResult.data,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: "프로필 정보가 성공적으로 업데이트되었습니다.",
    };
  } catch (error) {
    console.error("프로필 업데이트 중 오류 발생:", error);

    // 중복 이메일 오류 처리
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return {
        success: false,
        message: "이미 사용 중인 이메일입니다.",
      };
    }

    // 데이터베이스 연결 오류 처리
    if (error instanceof Error && error.message.includes("connect")) {
      return {
        success: false,
        message: "데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    // 기타 예상치 못한 오류
    return {
      success: false,
      message:
        "프로필 업데이트 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 비밀번호 유효성 검사 함수 (클라이언트에서 사용 가능)
 * @param password - 검사할 비밀번호
 * @returns 유효성 검사 결과
 */
export async function validatePassword(password: string): Promise<{
  isValid: boolean;
  error?: string;
}> {
  const result = await passwordSchema.safeParseAsync(password);

  if (result.success) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      error:
        result.error.errors[0]?.message || "비밀번호 형식이 올바르지 않습니다.",
    };
  }
}

/**
 * 1. 스키마 정의
passwordSchema: 비밀번호 유효성 검사 규칙을 명확하게 정의
updatePasswordSchema: 비밀번호 변경 요청 데이터 검증
updateProfileSchema: 프로필 업데이트 데이터 검증
2. 유효성 검사 개선
정규식 기반 검증: Zod의 regex() 메서드로 각 조건을 명확하게 검증
에러 메시지: 각 검증 규칙별로 구체적인 에러 메시지 제공
타입 안전성: TypeScript와 완벽하게 통합되어 타입 안전성 보장
3. 에러 처리 개선
safeParse(): 예외를 발생시키지 않고 검증 결과를 반환
구체적인 에러 메시지: 첫 번째 에러 메시지를 사용자에게 전달
일관된 에러 형식: 모든 검증 에러가 동일한 형식으로 처리
4. 재사용 가능한 검증 함수
validatePassword(): 클라이언트에서도 사용할 수 있는 독립적인 검증 함수
일관된 검증 로직: 서버와 클라이언트에서 동일한 검증 규칙 적용
5. 개발자 경험 개선
자동완성: TypeScript와 Zod의 통합으로 IDE에서 자동완성 지원
런타임 타입 검증: 컴파일 타임뿐만 아니라 런타임에서도 타입 안전성 보장
스키마 재사용: 다른 곳에서도 동일한 스키마를 재사용 가능
이제 Zod를 사용하여 더 안전하고 유지보수하기 쉬운 유효성 검사가 구현되었습니다!
 */
