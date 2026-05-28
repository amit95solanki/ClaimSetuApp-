import { create } from 'zustand';

export interface DeceasedDetails {
  fullName: string;
  fullNameHindi?: string;
  dateOfDeath: string;
  accountNumber: string;
  aadhaarNumber?: string;
  panNumber?: string;
  address?: string;
}

export interface LegalHeir {
  id: string;
  fullName: string;
  relationship: string;
  mobile?: string;
  aadhaarNumber?: string;
  sharePercentage: string;
}

export interface Witness {
  id: string;
  fullName: string;
  mobile?: string;
  address?: string;
}

interface FormWizardState {
  bankId: string;
  claimType: string;
  deceasedDetails: Partial<DeceasedDetails>;
  legalHeirs: LegalHeir[];
  witnesses: Witness[];
  documents: any[];
  
  // Actions
  setBankAndType: (bankId: string, claimType: string) => void;
  updateDeceasedDetails: (data: Partial<DeceasedDetails>) => void;
  addHeir: (heir: LegalHeir) => void;
  removeHeir: (id: string) => void;
  addWitness: (witness: Witness) => void;
  removeWitness: (id: string) => void;
  addDocument: (doc: any) => void;
  resetWizard: () => void;
}

export const useFormWizard = create<FormWizardState>((set) => ({
  bankId: '',
  claimType: '',
  deceasedDetails: {},
  legalHeirs: [],
  witnesses: [],
  documents: [],

  setBankAndType: (bankId, claimType) => set({ bankId, claimType }),
  
  updateDeceasedDetails: (data) => 
    set((state) => ({ deceasedDetails: { ...state.deceasedDetails, ...data } })),
    
  addHeir: (heir) => 
    set((state) => ({ legalHeirs: [...state.legalHeirs, heir] })),
    
  removeHeir: (id) => 
    set((state) => ({ legalHeirs: state.legalHeirs.filter(h => h.id !== id) })),
    
  addWitness: (witness) => 
    set((state) => ({ witnesses: [...state.witnesses, witness] })),
    
  removeWitness: (id) => 
    set((state) => ({ witnesses: state.witnesses.filter(w => w.id !== id) })),
    
  addDocument: (doc) => 
    set((state) => ({ documents: [...state.documents, doc] })),
    
  resetWizard: () => 
    set({ bankId: '', claimType: '', deceasedDetails: {}, legalHeirs: [], witnesses: [], documents: [] })
}));
