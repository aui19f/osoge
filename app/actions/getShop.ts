import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import {
  BusinessHoursSchema,
  MapSchema,
  SnsSchema,
} from "@/store/useShopStore";

export async function getShop() {
  try {
    const session = await getSession();

    const shop = await db.store.findFirst({
      where: { usersId: session.id },
    });

    if (!shop) return null;

    // array().parse(data) -- 배열구조확인
    return {
      ...shop,
      address_elements: MapSchema.array().parse(shop.address_elements),
      sns: SnsSchema.array().parse(shop.sns),
      business_hours: BusinessHoursSchema.array().parse(shop.business_hours),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No store information.");
  }
}
