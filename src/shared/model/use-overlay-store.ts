import { create } from 'zustand';

type OverlayType = 'cart' | 'menu' | null;

interface State {
  activeOverlay: OverlayType;
}

interface Action {
  openOverlay: (overlay: OverlayType) => void;
  closeOverlay: () => void;
  toggleOverlay: (overlay: OverlayType) => void;
  isOverlayOpen: (overlay: OverlayType) => boolean;
}

export const useOverlayStore = create<State & Action>((set, get) => ({
  activeOverlay: null,
  openOverlay: (overlay) => set({ activeOverlay: overlay }),
  closeOverlay: () => set({ activeOverlay: null }),
  toggleOverlay: (overlay) =>
    set((state) => ({
      activeOverlay: state.activeOverlay === overlay ? null : overlay
    })),
  isOverlayOpen: (overlay) => get().activeOverlay === overlay
}));
