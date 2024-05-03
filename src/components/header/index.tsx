"use client";
import { cn } from "@/lib/utils";
import Clock from "@/components/clock";
import { useStore } from "@/store";
import { useMacWindowStore, WindowStore } from "@/store/mac-window-store";
import Image from "next/image";
import { leftItems, rightItems } from "@/components/header/items";
import { IStep } from "@/interfaces";
import { isMobile } from "react-device-detect";

export interface HeaderProps {
  background?: boolean;
  step?: IStep;
}

export default function Header({ background }: HeaderProps) {
  // const connectionSpeed = useStore(state => state.connectionSpeed);
  const step = useStore((state) => state.step);
  const setStepByValue = useStore((state) => state.setStepByValue);
  const focusedWindow = useMacWindowStore(
    (state: WindowStore) => state.focusedWindow,
  );
  const isVisible = (values: string[]): boolean => values.includes(step.value);

  if (isMobile) return

  return (
    <div
      className={cn(
        "flex flex-row justify-between items-start py-1 px-6 h-[26px]",
        background ? "bg-zinc-800/70" : "",
      )}
    >
      <div
        className={
          "flex flex-row justify-start items-center gap-6 cursor-default"
        }
      >
        {isVisible(["success"]) && (
          <>
            <Image
              onClick={() => setStepByValue('login')}
              className={"translate-y-[-2px]"}
              src={"/assets/apple_logo_black.svg"}
              width={13}
              height={13}
              alt={"logo"}
            />
            <p className={cn("text-[13px]")}>
              {focusedWindow?.title ?? "Finder"}
            </p>

            <div
              className={
                "hidden lg:flex flex flex-row justify-start items-center gap-6 cursor-default"
              }
            >
              {leftItems.map((item, index) => (
                <p key={item} className={cn("text-[13px]")}>
                  {item}
                </p>
              ))}
            </div>
          </>
        )}
      </div>

      <div></div>

      <div className={cn("flex gap-4 items-center")}>
        {isVisible(["success"]) && (
          <div className={cn("flex gap-5 items-center")}>
            {!isMobile &&
              rightItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "object-fit min-w-[16px] items-center hidden md:block",
                  )}
                >
                  {item.icon}
                </div>
              ))}
            {/*<p className={cn('text-[13px]')}>{connectionSpeed}</p>*/}
            <Clock variant={"header"} />
          </div>
        )}
      </div>
    </div>
  );
}
