"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AppMode = "trade" | "crm"

interface ModeState {
  mode: AppMode
  setMode: (mode: AppMode) => void
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: "trade",
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "app-mode",
    }
  )
)
