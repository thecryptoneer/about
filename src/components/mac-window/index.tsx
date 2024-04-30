import { useWindowStore } from "@/store";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ICorner, IDelta, IMacWindow, IPoint } from "@/interfaces";

export default function MacWindow({
  window: openWindow,
}: {
  window: IMacWindow;
}) {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [resizeStart, setResizeStart] = useState<IPoint>({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<IPoint>({ x: 0, y: 0 });

  const focusedWindow = useWindowStore((state) => state.focusedWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const screenWidth = useWindowStore((state) => state.screenWidth);
  const screenHeight = useWindowStore((state) => state.screenHeight);
  const updateWindow = useWindowStore((state) => state.updateWindow);
  const windows = useWindowStore((state) => state.windows);

  const [corners, setCorners] = useState<ICorner>({
    top: openWindow.position.y,
    right: openWindow.position.x + openWindow.size.width,
    bottom: openWindow.position.y + openWindow.size.height,
    left: openWindow.position.x,
  });

  const [delta, setDelta] = useState<IDelta>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const handleMouseDown = (e: any, type: string) => {
    if (type?.startsWith("resize")) {
      setResizeDirection(getResizeDirection(type));

      const x: number = e.clientX;
      const y: number = e.clientY;
      setIsResizing(true);
      setResizeStart({ x, y });
    } else if (type === "drag") {
      setDelta({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
      setIsDragging(true);
      setDragStart({
        x: e.clientX - openWindow.position.x,
        y: e.clientY - openWindow.position.y,
      });
    }
  };

  const windowWidth: number = useMemo(() => {
    if (delta.left) {
      return corners.right - corners.left - delta.left;
    } else if (delta.right) {
      return corners.right - corners.left + delta.right;
    } else {
      return corners.right - corners.left;
    }
  }, [corners, delta]);

  const windowHeight: number = useMemo(() => {
    if (delta.top) {
      return corners.bottom - corners.top - delta.top;
    } else if (delta.bottom) {
      return corners.bottom - corners.top + delta.bottom;
    } else {
      return corners.bottom - corners.top;
    }
  }, [corners, delta]);

  const windowTop: number = useMemo(() => {
    return corners.top + delta.top;
  }, [corners, delta]);

  const windowLeft: number = useMemo(() => {
    return corners.left + delta.left;
  }, [corners, delta]);

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      let x: number = e.clientX - dragStart.x;
      let y: number = e.clientY - dragStart.y;

      const thresholdX: number = 0;
      const thresholdY: number = 26; // account for header height

      // make sure window can only be dragged within view
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x + windowWidth + thresholdX > screenWidth) {
        x = screenWidth - windowWidth - thresholdX;
      }
      if (y + windowHeight + thresholdY > screenHeight) {
        y = screenHeight - windowHeight - thresholdY;
      }

      setCorners({
        ...corners,
        top: y,
        right: x + windowWidth,
        bottom: y + windowHeight,
        left: x,
      });
    }

    if (isResizing) {
      const deltaX: number = e.clientX - resizeStart.x;
      const deltaY: number = e.clientY - resizeStart.y;

      if (resizeDirection === "left") {
        setDelta({
          ...delta,
          left: deltaX,
        });
      } else if (resizeDirection === "right") {
        setDelta({
          ...delta,
          right: deltaX,
        });
      } else if (resizeDirection === "top") {
        setDelta({
          ...delta,
          top: deltaY,
        });
      } else if (resizeDirection === "bottom") {
        setDelta({
          ...delta,
          bottom: deltaY,
        });
      } else if (resizeDirection === "top-left") {
        setDelta({
          ...delta,
          top: deltaY,
          left: deltaX,
        });
      } else if (resizeDirection === "top-right") {
        setDelta({
          ...delta,
          top: deltaY,
          right: deltaX,
        });
      } else if (resizeDirection === "bottom-left") {
        setDelta({
          ...delta,
          bottom: deltaY,
          left: deltaX,
        });
      } else if (resizeDirection === "bottom-right") {
        setDelta({
          ...delta,
          bottom: deltaY,
          right: deltaX,
        });
      } else {
        return;
      }

      // updateWindow(openWindow.id, openWindowWidth, openWindowHeight)
    }
  };

  useEffect((): void => {
    setDelta({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
    setCorners({
      top: openWindow.position.y,
      right: openWindow.position.x + openWindow.size.width,
      bottom: openWindow.position.y + openWindow.size.height,
      left: openWindow.position.x,
    });
  }, [windows]);

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
    updateWindow({
      ...openWindow,
      position: {
        x: windowLeft,
        y: windowTop,
      },
      size: {
        width: windowWidth,
        height: windowHeight,
      },
    });
  };

  const getResizeDirection = (value: string): string => {
    const check = value.split("resize_").at(1);
    return check ?? "";
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return (): void => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMenuClick = (type: string): void => {
    if (type === "close") {
      closeWindow({ ...openWindow });
    } else if (type === "minimize") {
      minimizeWindow({ ...openWindow, isMinimized: true });
    } else if (type === "maximize") {
      setCorners({
        top: 0,
        right: screenWidth,
        bottom: screenHeight,
        left: 0,
      });
      setDelta({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
      maximizeWindow({ ...openWindow, isMaximized: true });
      updateWindow({
        ...openWindow,
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: screenWidth,
          height: screenHeight - 26,
        },
      });
    }
  };

  return (
    <div
      className={cn(
        "absolute border border-gray-300 bg-[#1e1e1e] rounded-[10px] shadow-lg border border-zinc-500",
        focusedWindow?.id === openWindow.id ? "z-50" : "",
      )}
      onMouseDown={() => focusWindow(openWindow)}
      style={{
        top: windowTop,
        left: windowLeft,
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between bg-[#372926] px-4 py-4 cursor-default rounded-t-[10px] border border-zinc-700",
          "h-[58px]",
        )}
        onMouseDown={(e: any) => handleMouseDown(e, "drag")}
      >
        <div className="flex gap-2">
          <span
            onClick={() => handleMenuClick("close")}
            className="block w-3 h-3 bg-red-500 rounded-full"
          ></span>
          <span
            onClick={() => handleMenuClick("minimize")}
            className="block w-3 h-3 bg-yellow-500 rounded-full"
          ></span>
          <span
            onClick={() => handleMenuClick("maximize")}
            className="block w-3 h-3 bg-green-500 rounded-full"
          ></span>
        </div>
        <span className="flex-grow text-center font-semibold">
          {openWindow.title}
        </span>
        <span className="opacity-0 w-9"></span>
      </div>

      <div className="p-2 bg-[#1e1e1e] px-4 py-4 rounded-b-[10px] border border-zinc-700 h-[calc(100%-58px)]">
        <h1 className={"text-zinc-900"}>{openWindow.title}</h1>
      </div>

      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_left")}
        className={cn(
          "bg-blue-100 absolute left-[0px] top-[5px] bottom-[5px] w-[2px] opacity-1 cursor-ew-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top-left")}
        className={cn(
          "bg-red-100 absolute left-[0px] top-[0px] h-[5px] w-[5px] opacity-1 cursor-nwse-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top")}
        className={cn(
          "bg-blue-100 absolute left-[5px] top-[0px] h-[2px] right-[5px] opacity-1 cursor-ns-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top-right")}
        className={cn(
          "bg-red-100 absolute right-[0px] top-[0px] h-[5px] w-[5px] opacity-1 cursor-nesw-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_right")}
        className={cn(
          "bg-blue-100 absolute right-[0px] top-[5px] bottom-[5px] w-[2px] opacity-1 cursor-ew-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom-right")}
        className={cn(
          "bg-red-100 absolute right-[0px] bottom-[0px] h-[5px] w-[5px] opacity-1 cursor-nwse-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom")}
        className={cn(
          "bg-blue-100 absolute left-[5px] right-[5px] bottom-[0px] h-[2px] opacity-1 cursor-ns-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom-left")}
        className={cn(
          "bg-red-100 absolute left-[0px] bottom-[0px] h-[5px] w-[5px] opacity-1 cursor-nesw-resize opacity-0",
        )}
      ></div>
    </div>
  );
}
