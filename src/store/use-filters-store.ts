import { create } from "zustand"

interface FiltersState {
  memberFilters: {
    searchTerm: string
    membershipType: string[]
    status: string[]
    certifications: string[]
    committees: string[]
  }
  eventFilters: {
    searchTerm: string
    type: string[]
    status: string[]
    dateRange: [Date | null, Date | null]
  }
  documentFilters: {
    type: string[]
    category: string[]
    dateRange: [Date | null, Date | null]
  }
  setMemberFilters: (filters: Partial<FiltersState["memberFilters"]>) => void
  setEventFilters: (filters: Partial<FiltersState["eventFilters"]>) => void
  setDocumentFilters: (filters: Partial<FiltersState["documentFilters"]>) => void
  resetFilters: (filterType: "member" | "event" | "document") => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  memberFilters: {
    searchTerm: "",
    membershipType: [],
    status: [],
    certifications: [],
    committees: [],
  },
  eventFilters: {
    searchTerm: "",
    type: [],
    status: [],
    dateRange: [null, null],
  },
  documentFilters: {
    type: [],
    category: [],
    dateRange: [null, null],
  },
  setMemberFilters: (filters) =>
    set((state) => ({
      memberFilters: { ...state.memberFilters, ...filters },
    })),
  setEventFilters: (filters) =>
    set((state) => ({
      eventFilters: { ...state.eventFilters, ...filters },
    })),
  setDocumentFilters: (filters) =>
    set((state) => ({
      documentFilters: { ...state.documentFilters, ...filters },
    })),
  resetFilters: (filterType) =>
    set((state) => {
      switch (filterType) {
        case "member":
          return {
            ...state,
            memberFilters: {
              searchTerm: "",
              membershipType: [],
              status: [],
              certifications: [],
              committees: [],
            },
          }
        case "event":
          return {
            ...state,
            eventFilters: {
              searchTerm: "",
              type: [],
              status: [],
              dateRange: [null, null],
            },
          }
        case "document":
          return {
            ...state,
            documentFilters: {
              type: [],
              category: [],
              dateRange: [null, null],
            },
          }
        default:
          return state
      }
    }),
}))
