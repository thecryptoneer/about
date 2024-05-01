import { create } from "zustand";
import { IDesktopItem, IMacWindow, IStep } from "@/interfaces";

export interface StoreState {
  step: IStep;
  credentialInput: string;
  connectionSpeed: string;
}

export interface StoreActions {
  setStep: (step: IStep) => void;
  setCredentialInput: (credentialInput: string) => void;
  setConnectionSpeed: (connectionSpeed: string) => void;
  reset: () => void;
}
export const useStore = create<StoreState & StoreActions>((set) => {
  return {
    step: { value: "idle", label: "Idle", duration: 1000 },
    setStep: (step: IStep) => set({step}),
    credentialInput: "",
    setCredentialInput: (credentialInput: string) => set({ credentialInput }),
    connectionSpeed: "",
    setConnectionSpeed: (connectionSpeed: string) => set({ connectionSpeed }),
    reset: () => set({}),
  };
});

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
}

export const useWindowStore = create<WindowStoreState & WindowStoreActions>(
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
    };
  },
);

export interface DesktopStoreState {
  desktopItems: IDesktopItem[];
}

export interface DesktopStoreActions {
  setDesktopItems: (desktopItems: IDesktopItem[]) => void;
  updateDesktopItem: (desktopItem: IDesktopItem) => void;
  dragDesktopItem: (desktopItem: IDesktopItem) => void;
}

export const useDesktopStore = create<DesktopStoreState & DesktopStoreActions>(
  (set) => {
    return {
      desktopItems: [
        {
          position: { x: 100, y: 100 },
          size: { width: 80, height: 80 },
          name: "CV",
          image: '/assets/text-icon.png',
          id: "cv",
        },
        {
          position: { x: 100, y: 200 },
          size: { width: 80, height: 80 },
          name: "Skills",
          image: '/assets/filter-code2.png',
          id: "skills",
        },
      ],
      setDesktopItems: (desktopItems: IDesktopItem[]) => set({ desktopItems }),
      updateDesktopItem: (desktopItem: IDesktopItem) =>
        set((state) => {
          const index: number = state.desktopItems.findIndex(
            (item) => item.id === desktopItem.id,
          );
          if (index === -1) {
            return state;
          }
          const newDesktopItems: IDesktopItem[] = [...state.desktopItems];
          newDesktopItems[index] = desktopItem;
          return { desktopItems: newDesktopItems };
        }),
      dragDesktopItem: (desktopItem) =>
        set((state) => {
          const index: number = state.desktopItems.findIndex(
            (item) => item.id === desktopItem.id,
          );
          if (index === -1) {
            return state;
          }
          const newDesktopItems: IDesktopItem[] = [...state.desktopItems];
          newDesktopItems[index] = desktopItem;
          return { desktopItems: newDesktopItems };
        }),
    };
  },
);
