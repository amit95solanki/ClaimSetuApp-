import axiosInstance from '../../lib/axios';
import { Claim, SubmitClaimPayload } from './types';

export const getUserClaims = async (userId?: string): Promise<Claim[]> => {
  try {
    // If your generic CRUD supports filtering:
    // const response = await axiosInstance.get(`/claims?userId=${userId}`);
    // If not, fetch all and filter locally for now (assuming backend isn't filtering by auth yet)
    const response = await axiosInstance.get('/claims');
    let claims: Claim[] = [];
    if (response.data.success) {
      claims = response.data.data;
    } else {
      claims = response.data;
    }
    
    // Filter by userId if passed
    if (userId) {
      claims = claims.filter(c => c.userId === userId);
    }
    
    return claims;
  } catch (error) {
    console.error('Failed to fetch claims:', error);
    throw error;
  }
};

export const getClaimDetails = async (claimId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/claims/${claimId}/details`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch details for claim ${claimId}:`, error);
    throw error;
  }
};

export const submitClaim = async (payload: SubmitClaimPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post('/claims/submit', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to submit claim:', error);
    throw error;
  }
};

export const generatePdf = async (claimId: string, bankFormId: string): Promise<{ success: boolean; url: string }> => {
  try {
    const response = await axiosInstance.post(`/documents/generate/${claimId}/${bankFormId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};
