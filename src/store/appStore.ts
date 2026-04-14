import { create } from 'zustand';
import type { Ontology, DataBinding } from '../data/ontology';
import { cosmicCoffeeOntology, sampleBindings } from '../data/ontology';

function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return true;
  }
  try {
    const stored = window.localStorage.getItem('darkMode');
    if (stored === 'false') return false;
    return true;
  } catch {
    return true;
  }
}

interface AppState {
  // Ontology State
  currentOntology: Ontology;
  dataBindings: DataBinding[];
  
  // UI State
  selectedEntityId: string | null;
  selectedRelationshipId: string | null;
  highlightedEntities: string[];
  highlightedRelationships: string[];
  showDataBindings: boolean;
  darkMode: boolean;

  // Query State
  queryInput: string;
  queryResult: string | null;
  
  // Ontology Actions
  loadOntology: (ontology: Ontology, bindings?: DataBinding[]) => void;
  resetToDefault: () => void;
  exportOntology: () => string;
  
  // Actions
  selectEntity: (id: string | null) => void;
  selectRelationship: (id: string | null) => void;
  setHighlightedEntities: (ids: string[]) => void;
  setHighlightedRelationships: (ids: string[]) => void;
  toggleDataBindings: () => void;
  toggleDarkMode: () => void;

  // Query Actions
  setQueryInput: (input: string) => void;
  setQueryResult: (result: string | null) => void;
  clearHighlights: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial Ontology State
  currentOntology: cosmicCoffeeOntology,
  dataBindings: sampleBindings,
  
  // Initial UI State
  selectedEntityId: null,
  selectedRelationshipId: null,
  highlightedEntities: [],
  highlightedRelationships: [],
  showDataBindings: false,
  darkMode: getInitialDarkMode(),

  // Initial Query State
  queryInput: '',
  queryResult: null,
  
  // Ontology Actions
  loadOntology: (ontology, bindings = []) => {
    set({
      currentOntology: ontology,
      dataBindings: bindings,
      selectedEntityId: null,
      selectedRelationshipId: null,
      highlightedEntities: [],
      highlightedRelationships: [],
    });
  },
  
  resetToDefault: () => set({
    currentOntology: cosmicCoffeeOntology,
    dataBindings: sampleBindings,
    selectedEntityId: null,
    selectedRelationshipId: null,
    highlightedEntities: [],
    highlightedRelationships: [],
  }),
  
  exportOntology: () => {
    const { currentOntology, dataBindings } = get();
    return JSON.stringify({ ontology: currentOntology, bindings: dataBindings }, null, 2);
  },
  
  // UI Actions
  selectEntity: (id) => set({ 
    selectedEntityId: id, 
    selectedRelationshipId: null 
  }),
  
  selectRelationship: (id) => set({ 
    selectedRelationshipId: id, 
    selectedEntityId: null 
  }),
  
  setHighlightedEntities: (ids) => set({ highlightedEntities: ids }),
  setHighlightedRelationships: (ids) => set({ highlightedRelationships: ids }),
  
  toggleDataBindings: () => set((state) => ({ showDataBindings: !state.showDataBindings })),
  toggleDarkMode: () => set((state) => {
    const next = !state.darkMode;
    try {
      localStorage.setItem('darkMode', String(next));
    } catch {
      // Ignore persistence errors; still update in-memory state
    }
    return { darkMode: next };
  }),
  
  // Query Actions
  setQueryInput: (input) => set({ queryInput: input }),
  setQueryResult: (result) => set({ queryResult: result }),
  clearHighlights: () => set({ highlightedEntities: [], highlightedRelationships: [] })
}));
