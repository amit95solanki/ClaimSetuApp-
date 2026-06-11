import axiosInstance from '../../lib/axios';

export const uploadDocument = async (fileUri: string, mimeType: string, fileName: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: mimeType,
      name: fileName,
    } as any);

    // Using the claim-document route. Since the claim is not yet created, we use a temporary ID
    // The backend doesn't validate the claimId during upload, it just uses it for the folder path.
    const response = await axiosInstance.post('/upload/claim-document/temp_upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.url || response.data.fileUrl;
    }
    
    // Fallback if structure varies
    return response.data.url;
  } catch (error) {
    console.error('Failed to upload document:', error);
    throw error;
  }
};
