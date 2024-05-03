import { IDesktopItem } from "@/interfaces";
import { create } from "zustand";
export interface DesktopStoreState {
  desktopItems: IDesktopItem[];
}

export interface DesktopStoreActions {
  setDesktopItems: (desktopItems: IDesktopItem[]) => void;
  updateDesktopItem: (desktopItem: IDesktopItem) => void;
  dragDesktopItem: (desktopItem: IDesktopItem) => void;
  reset: () => void;
}

export const initialItems = [
  {
    position: { x: 40, y: 40 },
    size: { width: 80, height: 80 },
    name: "CV",
    image: "/assets/text-icon.png",
    id: "cv",
  },
  {
    position: { x: 40, y: 140 },
    size: { width: 80, height: 80 },
    name: "About me",
    image: "/assets/text-icon.png",
    id: "About me",
  },
  {
    position: { x: 40, y: 240 },
    size: { width: 80, height: 80 },
    name: "Skills",
    image: "/assets/folder-code2-icon.png",
    id: "skills",
  },
];

export type DesktopStore = DesktopStoreState & DesktopStoreActions;

export const useDesktopStore = create<DesktopStore>((set) => {
  return {
    desktopItems: initialItems,
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
    reset: () => set({}),
  };
});
