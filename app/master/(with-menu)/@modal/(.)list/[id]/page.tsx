"use client";

import { useParams, useRouter } from "next/navigation";
import RegisterDetails from "@/components/items/RegisterDetails";
import { motion } from "framer-motion";
import ModalMotionBase from "@/components/modal/ModalMotionBase";
export default function ListDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const itemId = Array.isArray(id) ? id[0] : id;

  return (
    <ModalMotionBase onBackdropClick={()=>router.back()}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {}}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        initial={{ y: "100%" }} // 시작: 화면 하단 바깥에 완전히 숨겨짐
        animate={{ y: 0 }} // 끝: 제자리(화면 하단에 걸침)로 슥 올라옴
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
        className="w-full max-w-lg bg-white rounded-t-[30px] shadow-2xl h-[90vh] overflow-auto flex flex-col"
      >
        {itemId && <RegisterDetails id={itemId} type="modal" />}
      </motion.div>
    </ModalMotionBase>
  );
}
