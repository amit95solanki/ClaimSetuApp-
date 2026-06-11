export interface Bank {
  id: string;
  name: string;
  nameHi?: string;
  shortCode?: string;
  logoUrl?: string;
  colorHex?: string;
}

export interface BankForm {
  id: string;
  bankId: string;
  formName: string;
  claimType: string;
  customFieldsSchema?: any[];
}

export interface Claim {
  id: string;
  claimRefId: string;
  status: string;
  bankId: string;
  userId: string;
  claimType: string;
  updatedAt: string;
  // include other properties as needed
  bank?: Bank;
}

export interface SubmitClaimPayload {
  bankId: string;
  claimType: string;
  metadata?: any;
  deceasedDetails: any;
  legalHeirs: any[];
  witnesses: any[];
  documents: any[];
}
