import { IMacWindow } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WindowStoreState {
  screenWidth: number;
  screenHeight: number;
  windows: IMacWindow[];
  closedWindows: IMacWindow[];
  focusedWindow: IMacWindow | null;
}

export interface WindowStoreActions {
  setScreenSize: (width: number, height: number) => void;
  openWindow: (window: IMacWindow) => void;
  closeWindow: (window: IMacWindow) => void;
  focusWindow: (window: IMacWindow) => void;
  dragWindow: (window: IMacWindow) => void;
  updateWindow: (window: IMacWindow) => void;
  reset: () => void;
}

export type WindowStore = WindowStoreState & WindowStoreActions;

export const useMacWindowStore = create<WindowStore>()(
  // persist(
    (set) => {
      return {
        screenWidth: 0,
        screenHeight: 0,
        windows: [],
        focusedWindow: null,
        closedWindows: [],
        setScreenSize: (screenWidth: number, screenHeight: number) =>
          set({ screenWidth, screenHeight }),
        openWindow: (window: IMacWindow) =>
          set((state) => {
            const closedWindow: IMacWindow | undefined =
              state.closedWindows?.find((w) => w.id === window.id);
            if (closedWindow) {
              return {
                windows: [...state.windows, closedWindow],
                closedWindows: state.closedWindows.filter(
                  (w) => w.id !== window.id,
                ),
                focusedWindow: closedWindow,
              };
            } else {
              return {
                windows: [...state.windows, window],
                focusedWindow: window,
              };
            }
          }),
        closeWindow: (window: IMacWindow) =>
          set((state) => ({
            windows: state.windows.filter((w) => w.id !== window.id),
            closedWindows: [...state.closedWindows, window],
          })),
        focusWindow: (window: IMacWindow) => set({ focusedWindow: window }),
        dragWindow: (window: IMacWindow) =>
          set((state) => {
            const index: number = state.windows.findIndex(
              (w) => w.id === window.id,
            );
            if (index === -1) {
              return state;
            }
            const newWindows: IMacWindow[] = [...state.windows];
            newWindows[index] = window;
            return { windows: newWindows };
          }),
        updateWindow: (window: IMacWindow) =>
          set((state) => {
            const index: number = state.windows.findIndex(
              (w) => w.id === window.id,
            );
            if (index === -1) {
              return state;
            }
            const newWindows: IMacWindow[] = [...state.windows];
            newWindows[index] = window;
            return { windows: newWindows };
          }),
        reset: () => set({}),
      };
    },
    // { name: "mac-window-store" },
  // ),
);
