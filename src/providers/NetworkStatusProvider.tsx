"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useStore } from "@/store";
import {
  networkTestImageSize,
  networkTestImageUrl,
  networkTestInterval,
  networkTestThreshold,
  networkTestUnit,
} from "../../config";

export const NetworkStatusContext = createContext({
  isNetworkDown: false,
  testNetwork: () => {},
});

interface NetworkStatusProviderProps {
  children: React.ReactNode;
}
export const NetworkStatusProvider = ({
  children,
}: NetworkStatusProviderProps) => {
  const imageUrl: string = networkTestImageUrl;
  const downloadSize: number = networkTestImageSize;
  const pingInterval: number = networkTestInterval
    ? networkTestInterval
    : 30000;
  const thresholdUnit: string = networkTestUnit ? networkTestUnit : "megabyte";
  const threshold: number = networkTestThreshold ? networkTestThreshold : 7;
  const setConnectionSpeed = useStore((state) => state.setConnectionSpeed);
  const connectionSpeed = useStore((state) => state.connectionSpeed);
  const [isNetworkDown, setIsNetworkDown] = useState<boolean>(false);

  const callbackFunctionOnNetworkDown: any = useCallback((speed: string) => {
    console.log(`Network is down with speed: ${speed}`);
  }, []);

  const callbackFunctionOnError: any = useCallback((error: string) => {
    console.error("Network error:", error);
  }, []);

  const MeasureConnectionSpeed: any = useCallback(() => {
    const startTime: number = Date.now();
    const download = new Image();
    download.onload = () => {
      const endTime: number = Date.now();
      const duration: number = (endTime - startTime) / 1000;
      const bitsLoaded: number = downloadSize * 8;
      const speedBps: number = bitsLoaded / duration;
      const speedKbps: number = speedBps / 1024;
      const speedMbps: number = speedKbps / 1024;
      setNetworkStatus(speedBps, speedKbps, speedMbps);
    };

    download.onerror = (err: Event | string) => {
      console.log("Error:", err);
      callbackFunctionOnError(err);
      setIsNetworkDown(true);
    };

    download.src = `${imageUrl}?xxx=${startTime}`;
  }, [imageUrl, downloadSize, callbackFunctionOnError]);

  const setNetworkStatus = (
    speedBps: number,
    speedKbps: number,
    speedMbps: number,
  ) => {
    let isDown: boolean = false;
    let speed: string = speedMbps.toFixed(2);
    if (thresholdUnit === "byte") {
      isDown = speedBps < threshold;
      speed = speedBps.toFixed(2);
    } else if (thresholdUnit === "kilobyte") {
      isDown = speedKbps < threshold;
      speed = speedKbps.toFixed(2);
    } else if (thresholdUnit === "megabyte") {
      isDown = speedMbps < threshold;
      speed = speedMbps.toFixed(2);
    }

    setIsNetworkDown(isDown);
    if (isDown) {
      callbackFunctionOnNetworkDown(speed);
    }
    setConnectionSpeed(speed);
  };

  useEffect(() => {
    const interval: any = setInterval(MeasureConnectionSpeed, pingInterval);
    window.addEventListener("offline", () => setIsNetworkDown(true));
    window.addEventListener("online", () => setIsNetworkDown(false));
    return () => {
      clearInterval(interval);
      window.removeEventListener("offline", () => setIsNetworkDown(true));
      window.removeEventListener("online", () => setIsNetworkDown(false));
    };
  }, [MeasureConnectionSpeed, pingInterval]);

  return (
    <NetworkStatusContext.Provider
      value={{ isNetworkDown, testNetwork: MeasureConnectionSpeed }}
    >
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);
