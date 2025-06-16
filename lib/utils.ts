export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatRelativeDate(date: string): string {
  const now = new Date();
  const propDate = new Date(date);
  const diffInMs = now.getTime() - propDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return diffInDays === 0 ? "오늘" : `${diffInDays}일 전`;
  } else {
    const year = propDate.getFullYear();
    const month = String(propDate.getMonth() + 1).padStart(2, "0");
    const day = String(propDate.getDate()).padStart(2, "0");
    const hours = String(propDate.getHours()).padStart(2, "0");
    const minutes = String(propDate.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
}
// 서비스 이용약관과 개인정보 처리참여에 동의합니다.
