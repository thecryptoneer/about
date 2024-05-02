import { useMacWindowStore, WindowStore } from "@/store/mac-window-store";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ICorner, IDelta, IDimension, IMacWindow, IPoint } from "@/interfaces";
import ResizeFrame from "@/components/mac-window/resize-frame";
import WindowActions from "@/components/mac-window/window-actions";
import useDoubleClick from "@/hooks/useDoubleClick";
import { useWindowSize } from "usehooks-ts";
import CV from "@/components/cv";
import Skills from "@/components/skills/skills";

interface MacWindowProps {
  window: IMacWindow;
}
export default function MacWindow({ window: macWindow }: MacWindowProps) {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [resizeStart, setResizeStart] = useState<IPoint>({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<IPoint>({ x: 0, y: 0 });

  const closeWindow = useMacWindowStore(
    (state: WindowStore) => state.closeWindow,
  );
  const screenWidth = useMacWindowStore(
    (state: WindowStore) => state.screenWidth,
  );
  const screenHeight = useMacWindowStore(
    (state: WindowStore) => state.screenHeight,
  );
  const updateWindow = useMacWindowStore(
    (state: WindowStore) => state.updateWindow,
  );
  const windows = useMacWindowStore((state: WindowStore) => state.windows);

  const [corners, setCorners] = useState<ICorner>({
    top: macWindow.position.y,
    right: macWindow.position.x + macWindow.size.width,
    bottom: macWindow.position.y + macWindow.size.height,
    left: macWindow.position.x,
  });
  const [delta, setDelta] = useState<IDelta>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const windowDimension: IDimension = useMemo(() => {
    let dimension: IDimension = { width: 0, height: 0, top: 0, left: 0 };
    // width
    if (delta.left) {
      dimension.width = corners.right - corners.left - delta.left;
    } else if (delta.right) {
      dimension.width = corners.right - corners.left + delta.right;
    } else {
      dimension.width = corners.right - corners.left;
    }

    // height
    if (delta.top) {
      dimension.height = corners.bottom - corners.top - delta.top;
    } else if (delta.bottom) {
      dimension.height = corners.bottom - corners.top + delta.bottom;
    } else {
      dimension.height = corners.bottom - corners.top;
    }

    // top
    dimension.top = corners.top + delta.top;

    // left
    dimension.left = corners.left + delta.left;

    return dimension;
  }, [corners, delta]);

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
        x: e.clientX - macWindow.position.x,
        y: e.clientY - macWindow.position.y,
      });
    }
  };

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
      if (x + windowDimension.width + thresholdX > screenWidth) {
        x = screenWidth - windowDimension.width - thresholdX;
      }
      if (y + windowDimension.height + thresholdY > screenHeight) {
        y = screenHeight - windowDimension.height - thresholdY;
      }

      setCorners({
        ...corners,
        top: y,
        right: x + windowDimension.width,
        bottom: y + windowDimension.height,
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

      // updateWindow(macWindow.id, openWindowWidth, openWindowHeight)
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
      top: macWindow.position.y,
      right: macWindow.position.x + macWindow.size.width,
      bottom: macWindow.position.y + macWindow.size.height,
      left: macWindow.position.x,
    });
  }, [windows]);

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
    updateWindow({
      ...macWindow,
      position: {
        x: windowDimension.left,
        y: windowDimension.top,
      },
      size: {
        width: windowDimension.width,
        height: windowDimension.height,
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
      closeWindow({ ...macWindow });
    } else if (type === "minimize") {
      updateWindow({ ...macWindow, isMinimized: true, isMaximized: false });
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
      updateWindow({
        ...macWindow,
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: screenWidth,
          height: screenHeight - 26,
        },
        isMaximized: true,
        isMinimized: false,
      });
    }
  };

  return (
    <WindowContainer macWindow={macWindow} windowDimension={windowDimension}>
      <WindowHeader handleMouseDown={handleMouseDown} macWindow={macWindow}>
        <WindowActions handleMenuClick={handleMenuClick} />
        <WindowHeaderTitle title={macWindow.title} />
      </WindowHeader>

      <WindowContent macWindow={macWindow} />

      <ResizeFrame handleMouseDown={handleMouseDown} />
    </WindowContainer>
  );
}

interface WindowContainerProps {
  children: ReactNode;
  macWindow: IMacWindow;
  windowDimension: IDimension;
}

const WindowContainer = ({
  children,
  macWindow,
  windowDimension,
}: WindowContainerProps) => {
  const focusWindow = useMacWindowStore(
    (state: WindowStore) => state.focusWindow,
  );
  const focusedWindow = useMacWindowStore(
    (state: WindowStore) => state.focusedWindow,
  );
  return (
    <div
      className={cn(
        "absolute border border-gray-300 bg-[#1e1e1e] rounded-[10px] shadow-lg border border-zinc-500",
        // macWindow.isMaximized ? "rounded-[0px]" : "",
        focusedWindow?.id === macWindow.id ? "z-50" : "z-40",
      )}
      onMouseDown={() => focusWindow(macWindow)}
      style={{
        top: windowDimension.top,
        left: windowDimension.left,
        width: windowDimension.width,
        height: windowDimension.height,
      }}
    >
      {children}
    </div>
  );
};

interface WindowContentProps {
  macWindow: IMacWindow;
}
const WindowContent = ({ macWindow }: WindowContentProps) => {
  return (
    <div
      className={cn(
        "p-2 bg-[#1e1e1e] px-4 py-4 rounded-b-[10px] border border-zinc-700 h-[calc(100%-58px)] overflow-y-auto",
        // macWindow.isMaximized ? "rounded-[0px]" : "",
      )}
    >
      {macWindow.id === "cv" && <CV />}
      {macWindow.id === "skills" && <Skills />}
    </div>
  );
};

interface WindowHeaderProps {
  children: ReactNode;
  handleMouseDown: any;
  macWindow: IMacWindow;
}
const WindowHeader = ({
  children,
  handleMouseDown,
  macWindow,
}: WindowHeaderProps) => {
  const headerRef: any = useRef(null);
  const updateWindow = useMacWindowStore(
    (state: WindowStore) => state.updateWindow,
  );
  useDoubleClick({
    ref: headerRef,
    latency: 250,
    onSingleClick: () => null,
    onDoubleClick: () => handleDoubleClick(),
  });

  const size = useWindowSize();

  const handleDoubleClick = () => {
    updateWindow({
      ...macWindow,
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: size.width,
        height: size.height - 26,
      },
      isMaximized: true,
    });
  };
  return (
    <div
      ref={headerRef}
      onMouseDown={(e: any) => handleMouseDown(e, "drag")}
      className={cn(
        "flex items-center justify-between bg-[#372926] px-4 py-4 cursor-default rounded-t-[10px] border border-zinc-700 h-[58px]",
        // macWindow.isMaximized ? "rounded-t-[0px]" : "",
      )}
    >
      {children}
    </div>
  );
};

interface WindowHeaderTitleProps {
  title: string;
}
const WindowHeaderTitle = ({ title }: WindowHeaderTitleProps) => {
  return (
    <>
      <span className="flex-grow text-center font-semibold">{title}</span>
      <span className="opacity-0 w-9"></span>
    </>
  );
};
