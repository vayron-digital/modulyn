import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MetricsState {
  // Collapse states
  leadsMetricsCollapsed: boolean
  propertiesMetricsCollapsed: boolean
  contactsMetricsCollapsed: boolean

  // Actions
  toggleLeadsMetrics: () => void
  togglePropertiesMetrics: () => void
  toggleContactsMetrics: () => void
  setLeadsMetricsCollapsed: (collapsed: boolean) => void
  setPropertiesMetricsCollapsed: (collapsed: boolean) => void
  setContactsMetricsCollapsed: (collapsed: boolean) => void
}

export const useMetricsStore = create<MetricsState>()(
  persist(
    (set) => ({
      // Default states - collapsed
      leadsMetricsCollapsed: true,
      propertiesMetricsCollapsed: true,
      contactsMetricsCollapsed: true,

      // Toggle actions
      toggleLeadsMetrics: () => set((state) => ({ 
        leadsMetricsCollapsed: !state.leadsMetricsCollapsed 
      })),
      togglePropertiesMetrics: () => set((state) => ({ 
        propertiesMetricsCollapsed: !state.propertiesMetricsCollapsed 
      })),
      toggleContactsMetrics: () => set((state) => ({ 
        contactsMetricsCollapsed: !state.contactsMetricsCollapsed 
      })),

      // Direct setters
      setLeadsMetricsCollapsed: (collapsed) => set({ 
        leadsMetricsCollapsed: collapsed 
      }),
      setPropertiesMetricsCollapsed: (collapsed) => set({ 
        propertiesMetricsCollapsed: collapsed 
      }),
      setContactsMetricsCollapsed: (collapsed) => set({ 
        contactsMetricsCollapsed: collapsed 
      }),
    }),
    {
      name: 'metrics-storage',
    }
  )
)
