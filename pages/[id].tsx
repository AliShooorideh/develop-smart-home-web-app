import { useRouter } from "next/router";
import { motion, useSpring } from "framer-motion";
import { useContext, useState } from "react";
import { AppContext } from "@/public/stores";
import DevicesBox from "@/components/DevicesBox";
import { Knob } from "primereact/knob";

export default function Home() {
  const boxVariants = {
    checked: { rotateY: 360 },
  };
  const { store, setStore } = useContext(AppContext);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const data = [
    {
      id: 1,
      title: "Living Room",
      devices: 7,
      active: false,
      srcPic: "/images/livingroom.png",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Bed Room",
      devices: 3,
      active: false,
      srcPic: "/images/bedroom.png",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Bath Room",
      devices: 2,
      active: false,
      srcPic: "/images/bathroom.png",
      color: "bg-yellow-500",
    },
  ];

  const router = useRouter();
  const { id } = router.query;
  const pageData = data.find((item) => {
    return item.id === parseInt(id as string);
  });
  return (
    <div>
      <div className="px-6">
        <div className="mb-5 flex items-center justify-between pt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            onClick={() => router.back()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="font-bold">{pageData?.title}</span>
          <div
            onClick={() => setStore("notif", !store.notif)}
            className="rounded-full bg-white p-3 shadow-[0px_0px_25px_rgba(0,0,0,0.25)]"
          >
            <motion.svg
              initial={false}
              animate={store.notif ? "checked" : "unchecked"}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {!store.notif ? (
                <motion.path
                  transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  variants={boxVariants}
                />
              ) : (
                <motion.path
                  transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                  variants={boxVariants}
                />
              )}
            </motion.svg>
          </div>
        </div>
        <span className="text-2xl font-bold">Air Condition</span>
        <div className="mt-4 flex items-center justify-between rounded-2xl border p-5 shadow-md">
          <div className="flex flex-col">
            <span className="font-bold opacity-40">AC is runnig last</span>
            <span className="text-xl font-bold">4 hours</span>
          </div>
          <div
            className={`flex h-[30px] w-[53px] cursor-pointer rounded-full px-[4px] focus-visible:outline-none ${
              isOn
                ? "justify-start bg-black bg-opacity-10 pt-[4px]"
                : "justify-end border-[1px] bg-blue-500 pt-[3px] shadow-[0px_10px_30px_rgba(3,138,255,0.4)]"
            }`}
            onClick={() => setIsOn(!isOn)}
          >
            <motion.div
              className={`h-[21px] w-[21px] rounded-full bg-white`}
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            />
          </div>
        </div>
        <div className="relative flex justify-center mt-10">
          <Knob
            value={value}
            max={60}
            size={200}
            onChange={(e) => setValue(e.value)}
            valueColor="#3B82F6"
            textColor="#fff"
            rangeColor="#99999999"
          />
          <span className="absolute top-[73px] text-4xl font-bold">
            {value + "°C"}
          </span>
        </div>
      </div>
      <div className="mt-3 w-full rounded-t-[50px] border-t p-6">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Devices</span>
          <div className="grid grid-cols-2 gap-[7px]">
            <div className="h-[6px] w-[6px] rounded-full bg-black" />
            <div className="h-[6px] w-[6px] rounded-full bg-black" />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-[repeat(3,minmax(150px,1fr))] gap-3 overflow-x-scroll">
          <DevicesBox
            title={"light"}
            color={"bg-red-50"}
            srcIcon={"/images/light.png"}
          />
          <DevicesBox
            title={"coller"}
            color={"bg-blue-50"}
            srcIcon={"/images/coller.png"}
          />

          <DevicesBox
            title={"tv"}
            color={"bg-yellow-50"}
            srcIcon={"/images/tv.png"}
          />
        </div>
      </div>
    </div>
  );
}
