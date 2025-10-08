import { create } from "zustand";

import { z } from "zod";

/**
 * zod를 이용하는 방법
 * Prisma에서 JSON 타입을 TS가 실제로 올바른 구조인지 런타임에 직접 검사
 *
 * zod스키마를 정의하고, 타입추출(infer)해서 type정의
 */

export const SnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
});
export type snsType = z.infer<typeof SnsSchema>;

// //영업시간작성하기, {요일: 월, 오픈여부: true, 오픈시간: 00:00, 마감시간:00:00, 점심시간: 00:00~00:00}..
export const BusinessHoursSchema = z.object({
  week: z.string(),
  opening: z.string(),
  closing: z.string(),
  lunchtime_open: z.string().optional(),
  lunchtime_close: z.string().optional(),
  isOpen: z.boolean(),
});

export type businessHourType = z.infer<typeof BusinessHoursSchema>;

export const MapSchema = z.object({
  types: z.string(),
  name: z.string(),
  code: z.string().optional(),
  value: z.string().optional(),
});

export type mapType = z.infer<typeof MapSchema>;

export interface IShop {
  id: string;
  created_at: Date;
  updated_at?: Date | null;
  name: string;
  address: string;
  // //{types: 'sido', name: '경기도', code: ''}, ... SIGUGUN DONGMYUN types ROAD_NAME BUILDING_NUMBER BUILDING_NAME naver map
  address_elements: mapType[];
  phone: string;
  business_hours: businessHourType[];
  //쉬는날 공휴일 쉬는날 여부확인
  holiday: string;
  homepage: string;
  sns: snsType[];
  image: string[];
  description: string;
  business_number: string[];
  usersId: string;
}

interface IShopStore {
  shop: IShop | null;
  setShop: (settings: IShop) => void;
  resetShop: () => void;
}

export const useShopStore = create<IShopStore>((set) => ({
  shop: null,
  setShop: (shop) => set({ shop }),
  resetShop: () => set({ shop: null }),
}));
