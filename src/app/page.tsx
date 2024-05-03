"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import LoadingBar from "@/components/loading-bar";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Clock from "@/components/clock";
import LoginAccount from "@/components/login-account";
import { useStore } from "@/store";
import { useMacWindowStore, WindowStore } from "@/store/mac-window-store";
import { useDesktopStore } from "@/store/desktop-store";
import Dock from "@/components/dock";
import MacWindow from "@/components/mac-window";
import DesktopItem from "../components/desktop-item";
import { IDesktopItem, IMacWindow } from "@/interfaces";
import { useWindowSize } from "usehooks-ts";
import { isMobile, isTablet } from "react-device-detect";

export default function Home() {
  const step = useStore((state) => state.step);
  const setStepByValue = useStore((state) => state.setStepByValue);
  const [progress, setProgress] = useState<number>(0);

  const windows: IMacWindow[] = useMacWindowStore(
    (state: WindowStore) => state.windows,
  );
  const setScreenSize = useMacWindowStore(
    (state: WindowStore) => state.setScreenSize,
  );

  const desktopItems: IDesktopItem[] = useDesktopStore(
    (state) => state.desktopItems,
  );

  useEffect(() => {
    setStepByValue("idle");
  }, []);

  // add screen size to zustand store to access it outside of components
  const screenSize: { width: number; height: number } = useWindowSize();
  useEffect(() => {
    setScreenSize(screenSize.width, screenSize.height);
  }, [screenSize]);

  // handle loading progress animation
  useEffect(() => {
    if (step?.value !== "loading") {
      setProgress(0); // Reset progress when not loading
      return;
    }
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / step.duration) * 100;
      if (progress >= 100) {
        clearInterval(interval);
        setProgress(100);
      } else {
        setProgress(progress);
      }
    }, 50); // Update progress every 50ms
    return () => clearInterval(interval);
  }, [step]);

  const isVisible = (values: string[]): boolean => {
    if (!step?.value) return false;
    return values.includes(step.value);
  };

  const isTouchDevice = () => {
    return isTablet || isMobile;
  };

  return (
      <div
        className={cn(
          "flex h-[100dvh] w-[100dvw] flex-col",
          isVisible(["login", "success", "loggingIn"])
            ? "bg-background bg-no-repeat bg-cover"
            : "",
        )}
      >
        {/* header */}
        {isVisible(["login", "success"]) && (
          <Header background={isVisible(["success"])} />
        )}

        {/* idle / loading screen */}
        {isVisible(["idle", "loading"]) && (
          <div
            className={cn(
              "w-full flex flex-col justify-center items-center h-[100dvh]",
            )}
          >
            <Logo width={70} />
            <LoadingBar hidden={!isVisible(["loading"])} progress={progress} />
          </div>
        )}

        {/* login screen */}
        {isVisible(["login", "loggingIn"]) && (
          <div
            className={cn(
              "flex flex-col justify-between items-center overflow-y-auto h-full md:h-screenWithoutHeader pt-16 pb-32",
            )}
          >
            <Clock variant={"login"} />
            <LoginAccount />
          </div>
        )}

        {/* windows and desktop-item */}
        {isVisible(["success"]) && (
          <div className={cn("relative overflow-y-auto h-full md:h-screenWithoutHeader")}>
            {windows
            ?.filter((w) => !w.isMinimized)
            ?.map((window) => <MacWindow key={window.id} window={window} />)}

            {desktopItems.map((item, index) => (
              <DesktopItem key={item.id} item={item} />
            ))}

            <Dock />
          </div>
        )}
      </div>
  );
}
