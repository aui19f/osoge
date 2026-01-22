export default async function verifyBusinessStatus(bizNum: string) {
  const bizString = String(bizNum);
  try {
    const res = await fetch("/api/business-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ b_no: bizString }),
    });

    if (!res.ok) throw "리턴타입확인";
    const result = await res.json();

    const { b_no, tax_type_cd } = result.data[0];
    return {
      b_no,
      tax_type_cd,
    };
  } catch (error) {
    console.log(error);
    return {
      b_no: "",
      tax_type_cd: "",
    };
  }
}
