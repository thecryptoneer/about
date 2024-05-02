import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { IDockItem, IDockItemDimension, IMacWindow } from "@/interfaces";
import Image from "next/image";
import { dockItemDistance, maxDockItemSize, dockItemSize } from "@/../config";
import { useMacWindowStore, WindowStore } from "@/store/mac-window-store";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DockItemProps {
  item: IDockItem;
  mousePosition: { x: number; y: number };
}

export default function DockItem({ item, mousePosition }: DockItemProps) {
  const { name, src, id }: Partial<IDockItem> = item;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const dockItemRef = useRef<HTMLLIElement>(null as unknown as HTMLLIElement);
  const [dockItemRect, setDockItemRect] = useState<DOMRect | undefined>(
    undefined,
  );

  const windows = useMacWindowStore((state: WindowStore) => state.windows);
  const openWindow = useMacWindowStore(
    (state: WindowStore) => state.openWindow,
  );
  const focusWindow = useMacWindowStore(
    (state: WindowStore) => state.focusWindow,
  );
  const updateWindow = useMacWindowStore(
    (state: WindowStore) => state.updateWindow,
  );

  const handleResize = useCallback((): void => {
    const newDockItemRect = dockItemRef.current?.getBoundingClientRect();
    if (newDockItemRect) {
      setDockItemRect(newDockItemRect);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const dockItemStyle: IDockItemDimension = useMemo(() => {
    const buttonMidX = dockItemRect?.left
      ? dockItemRect.left + dockItemRect.width / 2
      : 0;
    const buttonMidY = dockItemRect?.top
      ? dockItemRect.top + dockItemRect.height / 2
      : 0;

    const distance: number =
      dockItemRef.current && dockItemRect
        ? Math.sqrt(
            Math.pow(mousePosition.x - buttonMidX, 2) +
              Math.pow(mousePosition.y - buttonMidY, 2),
          )
        : 0;

    const buttonSize: number =
      dockItemRef.current && dockItemRect
        ? Math.max(
            dockItemSize,
            maxDockItemSize -
              (maxDockItemSize - dockItemSize) * (distance / dockItemDistance),
          )
        : dockItemSize;

    return {
      height: buttonSize,
      width: buttonSize,
    };
  }, [dockItemRef, dockItemRect, mousePosition]);

  const hasMacWindow: IMacWindow | null = useMemo(() => {
    return windows.find((w) => w.id === name) ?? null;
  }, [id, windows]);

  const handleClick = (): void => {
    if (hasMacWindow) {
      if (hasMacWindow?.isMinimized) {
        updateWindow({ ...hasMacWindow, isMinimized: false });
      } else {
        focusWindow(hasMacWindow);
      }
    } else {
      setClicked(true);
      openWindow({
        position: { x: windows.length * 50, y: windows.length * 50 },
        size: { width: 800, height: 600 },
        title: name ?? "",
        id: name ?? "",
        isMaximized: false,
        isMinimized: false,
      });
      setTimeout(() => {}, 700);
      setTimeout(() => {
        setClicked(false);
      }, 1500);
      // setTimeout(() => , 1000)
    }
  };

  const url: string = useMemo(() => {
    if (item.id === "rareboard") {
      return "https://www.rareboard.com";
    } else if (item.id === "styng") {
      return "https://www.styng.com";
    } else {
      return "https://humxn.xyz";
    }
  }, [item.id]);

  return (
    <li
      ref={dockItemRef}
      className={`relative flex items-center justify-center w-auto h-20 min-w-[20px] transition-transform duration-300 ease-out transform ${clicked ? "animate-bounce" : ""}`}
      style={dockItemStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div
        className={`absolute whitespace-nowrap top-[-4rem] bg-black bg-opacity-40 text-white px-2 py-1 rounded-md transition-opacity duration-200 ease-in-out backdrop-blur-[50px] ${isHovering ? "block" : "hidden"}`}
        onMouseEnter={(e: any) => e.stopPropagation()}
      >
        {name}
      </div>
      {src && name && (
        <div
          className={cn(
            "",
            item.id === "styng" ? "bg-gray-50 rounded-xl m-[7px]" : "",
            item.id === "rareboard" ? "bg-gray-50 rounded-xl m-[7px] p-2" : "",
            item.id === "humxn" ? "bg-gray-50 rounded-xl m-[7px] p-2" : "",
          )}
        >
          {item.id === "rareboard" || item.id === "styng" ? (
            <Link href={url} target={"_blank"} rel={"noreferrer"}>
              <Image
                src={src}
                alt={name}
                width={dockItemStyle.width}
                height={dockItemStyle.height}
                placeholder="blur"
                blurDataURL={src}
                className="cursor-pointer"
              />
            </Link>
          ) : (
            <Image
              src={src}
              alt={name}
              width={dockItemStyle.width}
              height={dockItemStyle.height}
              placeholder="blur"
              blurDataURL={src}
              className="cursor-pointer"
            />
          )}
        </div>
      )}
      {hasMacWindow?.id && (
        <span className="absolute bottom-0 w-[4px] h-[4px] bg-white bg-opacity-70 rounded-full"></span>
      )}
    </li>
  );
}
