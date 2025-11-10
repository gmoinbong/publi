import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    { name: 'example-store' }
  )
);

