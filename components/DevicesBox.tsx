import Image from "next/image";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppContext } from "@/public/stores";

interface IProduct {
  title: string;
  color: string;
  srcIcon: string;
}
export default function DevicesBox(item: IProduct) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div
      onClick={() => setActive(!active)}
      className={`${item.color} flex flex-col items-center space-y-4 w-full rounded-xl p-6`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
        <Image
          className="h-12 w-12"
          loading="lazy"
          src={item.srcIcon}
          alt={""}
          width="0"
          height={"0"}
          sizes="100vw"
        />
      </div>
      <span className="text-2xl font-bold">{item.title}</span>
      <span className="text-sm font-bold">{active ? "ON" : "OFF"}</span>
    </div>
  );
}
