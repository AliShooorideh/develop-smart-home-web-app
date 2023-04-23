import Image from "next/image";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppContext } from "@/public/stores";

interface IProduct {
  item: any;
}
export default function RoomsBox({ item }: IProduct) {
  const { store, setStore } = useContext(AppContext);

  const HandleActive = (ele: number) => {
    const x = store.showData.map((items: any) => {
      if (ele === items.id) {
        return { ...items, active: !items.active };
      }
      return { ...items };
    });
    setStore("showData", x);
  };
  return (
    <div
      className={`${item.color} flex items-center justify-between space-x-3 rounded-3xl bg-opacity-10 p-4`}
    >
      <Link href={`/${item.id}`}>
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-white p-3">
            <Image
              className="h-12 w-12 object-contain"
              loading="lazy"
              src={item.srcPic}
              alt={""}
              width="0"
              height={"0"}
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{item.title}</span>
            <div className="flex items-center space-x-2">
              <div className={`${item.color} h-2 w-2 rounded-full`} />
              <span className="font-medium">{item.devices} Devices</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`flex h-[30px] w-[53px] cursor-pointer rounded-full px-[4px] focus-visible:outline-none ${
          item.active
            ? "justify-start bg-black bg-opacity-10 pt-[4px]"
            : "justify-end border-[1px] bg-blue-500 pt-[3px] shadow-[0px_10px_30px_rgba(3,138,255,0.4)]"
        }`}
        onClick={() => HandleActive(item.id)}
      >
        <motion.div
          className={`h-[21px] w-[21px] rounded-full bg-white`}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        />
      </div>
    </div>
  );
}
