import { useMacWindowStore, WindowStore } from "@/store/mac-window-store";
import {
  DesktopStore,
  useDesktopStore,
} from "@/store/desktop-store";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {FolderIcon, DraggableGenericIcon} from "@/components/icons";
import { ICorner, IDelta, IDesktopItem, IMacWindow } from "@/interfaces";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import useDoubleClick from "@/hooks/useDoubleClick";
import { useWindowSize } from "usehooks-ts";
import {isMobile} from "react-device-detect";

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

  const screenWidth = useMacWindowStore(
    (state: WindowStore) => state.screenWidth,
  );
  const screenHeight = useMacWindowStore(
    (state: WindowStore) => state.screenHeight,
  );
  const openWindow = useMacWindowStore(
    (state: WindowStore) => state.openWindow,
  );
  const updateWindow = useMacWindowStore(
    (state: WindowStore) => state.updateWindow,
  );
  const focusWindow = useMacWindowStore(
    (state: WindowStore) => state.focusWindow,
  );
  const windows = useMacWindowStore((state: WindowStore) => state.windows);
  const desktopItems = useDesktopStore(
    (state: DesktopStore) => state.desktopItems,
  );

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

  const handleTouchStart = (e: any, type: string) => {
    if (type === "drag") {
      setDelta({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - desktopItem.position.x,
        y: e.touches[0].clientY - desktopItem.position.y,
      });
    }
  }

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

  const handleTouchMove = (e: any) => {
    if (!isFocused) {
      setIsFocused(true);
    }
    if (isDragging) {
      let x: number = e.touches[0].clientX - dragStart.x;
      let y: number = e.touches[0].clientY - dragStart.y;

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

  }

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
    useDesktopStore?.getState()?.updateDesktopItem({
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
    latency: 250,
    onSingleClick: () => null,
    onDoubleClick: () => handleDoubleClick(),
  });
  const size = useWindowSize();

  const handleDoubleClick = () => {
    // check if in window // else move into window
    const new_window: IMacWindow = {
      position: isMobile ? {x: 0, y:0} : { x: windows.length * 50, y: windows.length * 50 },
      size: isMobile ? {width: size.width, height: size.height} : { width: size.width * 0.6, height: size.height * 0.5 },
      title: desktopItem.name,
      id: desktopItem.id,
      isMaximized: isMobile,
      isMinimized: false,
    };
    // check if exists in windows and
    const hasOpenWindow = windows?.find((w) => w.id === new_window.id);
    let updatedWindow: {
      position: { x: number; y: number };
      size: { width: number; height: number };
    } = {position: {x: 0, y: 0}, size: {width: 0, height: 0}};
    if (hasOpenWindow?.id) {
      if (hasOpenWindow.isMinimized) {
        const boundaries = {
          top: hasOpenWindow.position.y,
          right: hasOpenWindow.position.x + hasOpenWindow.size.width,
          bottom: hasOpenWindow.position.y + hasOpenWindow.size.height,
          left: hasOpenWindow.position.x,
        }
        if (boundaries.right > screenWidth) {
          hasOpenWindow.position.x = screenWidth - hasOpenWindow.size.width;
          if (hasOpenWindow.position.x < 0) {
            updatedWindow.position.x = 0;
          }
        }

        if (boundaries.bottom > screenHeight) {
          hasOpenWindow.position.y = screenHeight - hasOpenWindow.size.height;
          if (hasOpenWindow.position.y < 0) {
            updatedWindow.position.y = 0;
          }
        }

        // set Fullscreen
        if (isMobile) {
          updatedWindow = {
            position: {x: 0, y: 0},
            size: {width: size.width, height: size.height},
          }
        }

        updateWindow({
          ...hasOpenWindow,
          position: updatedWindow.position,
          size: updatedWindow.size,
          isMaximized: isMobile,
          isMinimized: false
        });
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
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
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
        onTouchStart={(e: any) => handleTouchStart(e, "drag")}
        className={cn("flex flex-col items-center justify center gap-[3px]")}
      >
        <div
          className={cn(
            isFocused
              ? "border border-[#848484] p-[3px] bg-zinc-900/60 rounded-[5px]"
              : "",
          )}
        >
          {desktopItem.image && <DraggableGenericIcon src={desktopItem.image} width={60} height={60}/>}
          {!desktopItem.image && <FolderIcon />}
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
