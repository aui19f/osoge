export default function page() {}
// "use client";
// import {
//   getListRegister,
//   searchReceiptListProps,
//   TypeRegisterItem,
// } from "@/app/master/list/actions";
// import Button from "@/components/forms/Button";

// import SelectDate from "@/components/forms/SelectDate";
// import Sort from "@/components/forms/Sort";
// import Tabs from "@/components/forms/Tabs";

// import { EnumStatus } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
// import dayjs from "dayjs";

// import { useState } from "react";

// export default function List() {
//   const [selectedDate, setSelectedDate] = useState<DateSelection>({
//     year: dayjs().format("YYYY"),
//     month: dayjs().format("MM"),
//     day: dayjs().format("DD"),
//   });

//   const [status, setStatus] = useState<EnumStatus[]>(["READY"]);
//   const [sort, setSort] = useState<"desc" | "asc">("desc");

//   // 실제 쿼리에 사용될 필터 상태
//   const [filters, setFilters] = useState<searchReceiptListProps>({
//     selectedDate,
//     status,
//     sort,
//   });

//   const { data, refetch, isFetching } = useQuery({
//     queryKey: ["recipes", filters], // filters 상태에만 의존
//     queryFn: async () => await getListRegister(filters),
//     staleTime: 1000 * 60, // 1분 캐시 유지
//     enabled: false, // 수동 실행
//     gcTime: 0, // 페이지 떠날 때 캐시 삭제
//   });

//   const changeStatus = (e: FormOption) => {
//     const id = e.id as EnumStatus;
//     if (status.includes(id)) {
//       setStatus(status.filter((item) => item !== id));
//     } else {
//       setStatus([...status, id]);
//     }
//   };

//   // 버튼 클릭 시 refetch 실행
//   const handleSearch = async () => {
//     // 현재 UI의 필터 값들로 실제 쿼리 필터를 업데이트
//     await setFilters({
//       selectedDate,
//       status,
//       sort,
//     });

//     await refetch();
//   };

//   return (
//     <div>
//       <div className="flex flex-col gap-2 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
//         <div className="flex flex-col gap-1">
//           <SelectDate
//             {...selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//           />

//           <div className="flex items-center gap-1">
//             <Tabs
//               options={StatusOptions}
//               selected={status}
//               onClick={(e) => {
//                 changeStatus(e);
//               }}
//             />

//             <Sort
//               value={sort}
//               isLabel={false}
//               onClick={() =>
//                 setSort((prev) => (prev === "desc" ? "asc" : "desc"))
//               }
//             />

//             <Button
//               type="button"
//               variant="primary"
//               disabled={isFetching}
//               onClick={handleSearch}
//             >
//               조회
//             </Button>
//           </div>
//         </div>
//       </div>

//       {isFetching ? (
//         <ListItemSkeleton count={Math.floor(window.innerHeight / 100)} />
//       ) : (
//         <ul className="flex flex-col gap-2 px-2">
//           {data &&
//             data.map((item: TypeRegisterItem) => (
//               <ListItem key={item.id} {...item} />
//             ))}
//         </ul>
//       )}
//     </div>
//   );
// }
