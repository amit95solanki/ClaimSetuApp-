import { create } from 'zustand';

export interface DeceasedDetails {
  fullName: string;
  fullNameHindi?: string;
  dateOfBirth?: string;
  dateOfDeath: string;
  gender?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  accountNumber?: string;
  accountType?: string;
  fdReceiptNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  religion?: string;
}

export interface LegalHeir {
  id: string;
  isPrimary?: boolean;
  isNominee?: boolean;
  fullName: string;
  fullNameHindi?: string;
  relationship: string;
  dateOfBirth?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  mobile?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankName?: string;
  sharePercentage: string;
  isMinor?: boolean;
  guardianName?: string;
}

export interface Witness {
  id: string;
  witnessNumber?: number;
  fullName: string;
  aadhaarNumber?: string;
  mobile?: string;
  address?: string;
  knownSinceYears?: number;
}

export interface ClaimDocument {
  id: string;
  docType: string;    // e.g. 'death_certificate', 'aadhaar'
  docLabel: string;   // e.g. 'Death Certificate'
  fileUrl?: string;
  fileName?: string;
  fileSizeKb?: number;
  documentStatus?: string;
  isRequired?: boolean;
}

interface FormWizardState {
  bankId: string;
  claimType: string;
  deceasedDetails: Partial<DeceasedDetails>;
  legalHeirs: LegalHeir[];
  witnesses: Witness[];
  documents: ClaimDocument[];
  
  // Actions
  setBankAndType: (bankId: string, claimType: string) => void;
  updateDeceasedDetails: (data: Partial<DeceasedDetails>) => void;
  addHeir: (heir: LegalHeir) => void;
  removeHeir: (id: string) => void;
  addWitness: (witness: Witness) => void;
  removeWitness: (id: string) => void;
  addDocument: (doc: ClaimDocument) => void;
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
