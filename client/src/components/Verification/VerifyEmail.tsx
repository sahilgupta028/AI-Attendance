import toast from "react-hot-toast";

interface EmailVerificationResponse {
    status: string; // Adjust based on the actual field returned by the API (e.g., "valid", "invalid")
    // Add other fields if required from the API response
  }
  
  export const verifyEmail = async (email: string): Promise<string | false> => {
    try {
      const response = await fetch(
        `https://validect-email-verification-v1.p.rapidapi.com/v1/verify?email=${encodeURIComponent(
          email
        )}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'a74f98ca07msh13a3e05599ca2aep1dbfd2jsnd0b1eab05732',
            'x-rapidapi-host': 'validect-email-verification-v1.p.rapidapi.com',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to verify email: ${response.statusText}`);
      }
  
      const data: EmailVerificationResponse = await response.json();
      console.log('Email verification response:', data.status);
  
      // Return the email status if available, otherwise return false
      return data.status || false;
    } catch (error) {
      toast.error('Email verification failed');
      return false;
    }
  };
  