import type { RefObject } from "react";

import { useEventListener } from "usehooks-ts";

type EventType =
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "focusin"
  | "focusout";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown",
  eventListenerOptions: AddEventListenerOptions = {},
): void {
  useEventListener(
    eventType,
    (event: any) => {
      const target: Node = event.target as Node;

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside: null | boolean = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    },
    undefined,
    eventListenerOptions,
  );
}
