import { useDesktopStore, useWindowStore } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {FolderIcon, TextIcon} from "@/components/icons";
import { ICorner, IDelta, IDesktopItem, IMacWindow } from "@/interfaces";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import useDoubleClick from "@/hooks/useDoubleClick";

export interface DesktopItemProps {
  item: IDesktopItem;
}

export default function DesktopItem({ item: desktopItem }: DesktopItemProps) {
  const ref: any = useRef<any>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const screenWidth = useWindowStore((state) => state.screenWidth);
  const screenHeight = useWindowStore((state) => state.screenHeight);
  const updateDesktopItem = useDesktopStore((state) => state.updateDesktopItem);
  const desktopItems = useDesktopStore((state) => state.desktopItems);
  const openWindow = useWindowStore((state) => state.openWindow);
  const updateWindow = useWindowStore((state) => state.updateWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const windows = useWindowStore((state) => state.windows);

  const [corners, setCorners] = useState<ICorner>({
    top: desktopItem.position.y,
    right: desktopItem.position.x + desktopItem.size.width,
    bottom: desktopItem.position.y + desktopItem.size.height,
    left: desktopItem.position.x,
  });

  const [delta, setDelta] = useState<IDelta>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const handleClickOutside = (): void => {
    setIsFocused(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleMouseDown = (e: any, type: string) => {
    if (type === "drag") {
      setDelta({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
      setIsDragging(true);
      setDragStart({
        x: e.clientX - desktopItem.position.x,
        y: e.clientY - desktopItem.position.y,
      });
    }
  };

  const itemWidth: number = useMemo(() => {
    if (delta.left) {
      return corners.right - corners.left - delta.left;
    } else if (delta.right) {
      return corners.right - corners.left + delta.right;
    } else {
      return corners.right - corners.left;
    }
  }, [corners, delta]);

  const itemHeight: number = useMemo(() => {
    if (delta.top) {
      return corners.bottom - corners.top - delta.top;
    } else if (delta.bottom) {
      return corners.bottom - corners.top + delta.bottom;
    } else {
      return corners.bottom - corners.top;
    }
  }, [corners, delta]);

  const itemTop: number = useMemo(() => {
    return corners.top + delta.top;
  }, [corners, delta]);

  const itemLeft: number = useMemo(() => {
    return corners.left + delta.left;
  }, [corners, delta]);

  const handleMouseMove = (e: any) => {
    if (!isFocused) {
      setIsFocused(true);
    }
    if (isDragging) {
      let x: number = e.clientX - dragStart.x;
      let y: number = e.clientY - dragStart.y;

      const thresholdX = 0;
      const thresholdY = 52;

      // make sure window can only be dragged within view
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x + itemWidth + thresholdX > screenWidth) {
        x = screenWidth - itemWidth - thresholdX;
      }
      if (y + itemHeight + thresholdY > screenHeight) {
        y = screenHeight - itemHeight - thresholdY;
      }

      setCorners({
        ...corners,
        top: y,
        right: x + itemWidth,
        bottom: y + itemHeight,
        left: x,
      });
    }
  };

  useEffect(() => {
    setDelta({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
    setCorners({
      top: desktopItem.position.y,
      right: desktopItem.position.x + desktopItem.size.width,
      bottom: desktopItem.position.y + desktopItem.size.height,
      left: desktopItem.position.x,
    });
  }, [desktopItems]);

  const handleMouseUp = (): void => {
    setIsDragging(false);
    updateDesktopItem({
      ...desktopItem,
      position: {
        x: itemLeft,
        y: itemTop,
      },
      size: {
        width: itemWidth,
        height: itemHeight,
      },
    });
  };

  useDoubleClick({
    ref: ref,
    latency: 180,
    onSingleClick: () => console.log("Single click"),
    onDoubleClick: () => handleDoubleClick(),
  });

  const handleDoubleClick = () => {
    console.log("Double click");
    const new_window: IMacWindow = {
      position: { x: windows.length * 50, y: windows.length * 50 },
      size: { width: 800, height: 600 },
      title: desktopItem.name,
      id: desktopItem.id,
      isMaximized: false,
      isMinimized: false,
    };
    // check if exists in windows and
    const hasOpenWindow = windows?.find((w) => w.id === new_window.id);
    if (hasOpenWindow?.id) {
      if (hasOpenWindow.isMinimized) {
        updateWindow({ ...hasOpenWindow, isMinimized: false });
      } else {
        focusWindow(hasOpenWindow);
      }
    } else {
      openWindow(new_window);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <button
      ref={ref}
      className={cn("absolute", isFocused ? "z-40" : "z-30")}
      style={{
        top: itemTop,
        left: itemLeft,
        width: itemWidth,
        height: itemHeight,
      }}
    >
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "drag")}
        className={cn("flex flex-col items-center justify center gap-[3px]")}
      >
        <div
          className={cn(
            isFocused
              ? "border border-[#848484] p-[3px] bg-zinc-900/60 rounded-[5px]"
              : "",
          )}
        >
          {desktopItem.id === 'cv' ? (<TextIcon />) : (<FolderIcon />)}

        </div>
        <p
          className={cn(
            "text-center text-[15px] leading-[15px] max-w-[100px] whitespace-nowrap text-ellipsis overflow-hidden p-[4px] rounded-[5px]",
            isFocused ? "bg-blue-500" : "",
          )}
        >
          {desktopItem?.name}
        </p>
      </div>
    </button>
  );
}
