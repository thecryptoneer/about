import { cn } from "@/lib/utils";

interface LoadingBarProps {
  progress: number;
  width?: number;
  height?: number;
  hidden?: boolean;
}

export default function LoadingBar({
  progress,
  width,
  height,
  hidden,
}: LoadingBarProps) {
  return (
    <div
      className={cn(
        hidden ? "opacity-0" : "opacity-1",
        "transition-opacity bg-zinc-800 border border-zinc-600 rounded-lg mt-16",
        width ? `w-[${width}px]` : "w-[150px]",
        height ? `h-[${height}px]` : "h-[6px]",
      )}
    >
      <div
        className="h-full bg-zinc-100 rounded-l-[3px]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
