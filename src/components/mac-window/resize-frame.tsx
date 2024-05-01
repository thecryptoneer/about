import {cn} from "@/lib/utils";

export default function ResizeFrame(props: any) {
  const handleMouseDown: any = props.handleMouseDown;
  return (
    <>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_left")}
        className={cn(
          "bg-blue-100 absolute left-[0px] top-[8px] bottom-[8px] w-[2px] opacity-1 cursor-ew-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top-left")}
        className={cn(
          "bg-red-100 absolute left-[0px] top-[0px] h-[8px] w-[8px] opacity-1 cursor-nwse-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top")}
        className={cn(
          "bg-blue-100 absolute left-[8px] top-[0px] h-[2px] right-[8px] opacity-1 cursor-ns-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_top-right")}
        className={cn(
          "bg-red-100 absolute right-[0px] top-[0px] h-[8px] w-[8px] opacity-1 cursor-nesw-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_right")}
        className={cn(
          "bg-blue-100 absolute right-[0px] top-[8px] bottom-[8px] w-[2px] opacity-1 cursor-ew-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom-right")}
        className={cn(
          "bg-red-100 absolute right-[0px] bottom-[0px] h-[8px] w-[8px] opacity-1 cursor-nwse-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom")}
        className={cn(
          "bg-blue-100 absolute left-[8px] right-[8px] bottom-[0px] h-[2px] opacity-1 cursor-ns-resize opacity-0",
        )}
      ></div>
      <div
        onMouseDown={(e: any) => handleMouseDown(e, "resize_bottom-left")}
        className={cn(
          "bg-red-100 absolute left-[0px] bottom-[0px] h-[8px] w-[8px] opacity-1 cursor-nesw-resize opacity-0",
        )}
      ></div>
    </>
  )
}