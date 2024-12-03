const otpStore: { [key: string]: string } = {};

export const setOtp = (email: string, otp: string) => {
  otpStore[email] = otp;
};

export const getOtp = (email: string) => otpStore[email];

export const deleteOtp = (email: string) => {
  delete otpStore[email];
};
