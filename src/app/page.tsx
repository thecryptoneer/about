"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import LoadingBar from "@/components/loading-bar";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Clock from "@/components/clock";
import LoginAccount from "@/components/login-account";
import { useDesktopStore, useStore, useWindowStore } from "@/store";
import { wait } from "@/lib/utils";
import Dock from "@/components/dock";
import MacWindow from "@/components/mac-window";
import DesktopItem from "../components/desktop-item";
import { IDesktopItem, IMacWindow, IStep } from "@/interfaces";

export default function Home() {
  const steps: IStep[] = [
    { value: "idle", label: "Idle", duration: 1000 },
    { value: "loading", label: "Loading", duration: 1500 },
    { value: "login", label: "Login", duration: -1 },
  ];
  const step = useStore((state) => state.step);
  const setStep = useStore((state) => state.setStep);
  const [progress, setProgress] = useState<number>(0);

  const windows: IMacWindow[] = useWindowStore((state) => state.windows);
  const setScreenSize = useWindowStore((state) => state.setScreenSize);

  const desktopItems: IDesktopItem[] = useDesktopStore(
    (state) => state.desktopItems,
  );

  const runSequence = async () => {
    for (const currentStep of steps) {
      setStep(currentStep);
      await wait(currentStep.duration);
    }
  };

  // update screen size on resize
  useEffect(() => {
    const handleResize = () =>
      setScreenSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setScreenSize(window?.innerWidth, window.innerHeight);
    runSequence();
  }, []);

  useEffect(() => {
    if (step.value !== "loading") {
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

  const isVisible = (values: string[]) => values.includes(step.value);

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col",
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
            "w-full flex flex-col justify-center items-center h-screen",
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
            "flex flex-col justify-between items-center h-screenWithoutHeader pt-16 pb-32",
          )}
        >
          <Clock variant={"login"} />
          <LoginAccount />
        </div>
      )}

      {/* windows and desktop-item */}
      {isVisible(["success"]) && (
        <div className={cn("relative h-screenWithoutHeader")}>
          {windows
            ?.filter((w) => !w.isMinimized)
            ?.map((window) => <MacWindow key={window.id} window={window} />)}

          {desktopItems.map((item, index) => (
            <DesktopItem key={item.id} item={item} />
          ))}

          <Dock />
        </div>
      )}
    </main>
  );
}
