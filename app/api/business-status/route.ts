import { NextResponse } from "next/server";

type BusinessStatusRequest = {
  b_no: string[];
};

const serviceKey = process.env.ODCLOUD_SERVICE_KEY;
const serviceURL = process.env.DATA_GO_KR_URL;

export async function POST(req: Request) {
  try {
    const body: BusinessStatusRequest = await req.json();

    if (!body.b_no || body.b_no.length === 0) {
      return NextResponse.json(
        { message: "사업자번호가 필요합니다." },
        { status: 400 }
      );
    }

    if (!serviceKey) {
      return NextResponse.json(
        { message: "서비스 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const response = await fetch(`${serviceURL}?serviceKey=${serviceKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        b_no: [body.b_no],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}

/**
 * https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808#/%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%20%EC%83%81%ED%83%9C%EC%A1%B0%ED%9A%8C%20API/status
 * 리턴타입중 tax_type_code로 구분
 * 과세유형메세지(코드):
 * 01:부가가치세 일반과세자,
 * 02:부가가치세 간이과세자,
 * 03:부가가치세 과세특례자,
 * 04:부가가치세 면세사업자,
 * 05:수익사업을 영위하지 않는 비영리법인이거나 고유번호가 부여된 단체,국가기관 등,
 * 06:고유번호가 부여된 단체,
 * 07:부가가치세 간이과세자(세금계산서 발급사업자)
 */
