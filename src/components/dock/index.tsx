import { useCallback, useState } from "react";
import DockItem from "@/components/dock/item";
import { cn, throttle } from "@/lib/utils";
import { fps } from "@/../config";
import { IDockItem, IPoint } from "@/interfaces";
import { dockItems } from "@/components/dock/items";

export default function Dock() {
  const [mousePosition, setMousePosition] = useState<IPoint>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((event: any): void => {
      setMousePosition({
        x: event.pageX || 0,
        y: event.pageY || 0,
      });
    }, 1000 / fps),
    [setMousePosition],
  );

  const throttleSetMousePosition: any = (position: { x: number; y: number }) =>
    throttle(setMousePosition(position), 1000);

  return (
    <nav
      className={cn(
        "w-[90vw] md:w-auto h-20 flex justify-center overflow-auto no-scrollbar",
        "absolute bottom-5 left-1/2 transform -translate-x-1/2",
        "rounded-[20px] md:rounded-[14px] shadow-md bg-opacity-40 sm:bg-opacity-25 bg-gray-700 backdrop-blur-lg border border-white border-opacity-20",
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => throttleSetMousePosition({ x: 0, y: 0 })}
    >
      <ul
        className={cn(
          "w-auto h-full flex items-end gap-0 p-1 rounded-[18px] list-none",
        )}
      >
        {dockItems.map((item: IDockItem) => (
          <DockItem key={item.id} item={item} mousePosition={mousePosition} />
        ))}
      </ul>
    </nav>
  );
}
