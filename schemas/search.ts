import { z } from "zod";
import { EnumStatus } from "@prisma/client";

export const searchBarSchema = z.object({
  type: z.enum(["day", "week", "month", "all"]),

  date: z.object({
    start: z.date().nullable(),
    end: z.date().nullable(),
  }),
  status: z.array(z.nativeEnum(EnumStatus)),
  sort: z.enum(["desc", "asc"]),
  word: z.string(),
});

export type SearchBarInput = z.infer<typeof searchBarSchema>;
export const itemDetailSchema = searchBarSchema.extend({
  id: z.string(),
});

export type DateTarget = z.infer<typeof searchBarSchema>["type"];
export type SortTarget = z.infer<typeof searchBarSchema>["sort"];
