import axiosInstance from '../../lib/axios';
import { Bank, BankForm } from './types';

export const getBanks = async (): Promise<Bank[]> => {
  try {
    const response = await axiosInstance.get('/banks');
    // Assuming generic CRUD returns { data: [...] } or just the array.
    // The Drizzle CRUD router usually returns { success: true, data: [...] }
    if (response.data.success) {
      return response.data.data;
    }
    return response.data; // fallback
  } catch (error) {
    console.error('Failed to fetch banks:', error);
    throw error;
  }
};

export const getBankForms = async (bankId: string): Promise<BankForm[]> => {
  try {
    const response = await axiosInstance.get(`/bank-forms?bankId=${bankId}`);
    if (response.data.success) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bank forms:', error);
    throw error;
  }
};
