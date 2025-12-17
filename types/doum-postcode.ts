export type DaumPostcodeData = {
  zonecode: string;
  roadAddress: string;
  buildingName: string;
  apartment: "Y" | "N";
  bname: string;
};

export type ReturnAddress = {
  zonecode: string;
  roadAddress: string;
  detailAddress: string;
};
