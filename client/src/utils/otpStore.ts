// const otpStore: { [key: string]: string } = {};

// export const setOtp = (email: string, otp: string) => {
//   otpStore[email] = otp;
// };

// export const getOtp = (email: string) => otpStore[email];

// export const deleteOtp = (email: string) => {
//   delete otpStore[email];
// };

import connectMongo from '@/lib/mongodb';
import OTP from '@/models/OTP';

export const setOtp = async (email: string, otp: string) => {
  await connectMongo();

  // Upsert OTP to ensure only one entry per email
  await OTP.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );
};

export const getOtp = async (email: string) => {
  await connectMongo()

  const record = await OTP.findOne({ email });

  console.log(record.otp);

  return record ? record.otp : null;
};

export const deleteOtp = async (email: string) => {
  await connectMongo();

  await OTP.deleteOne({ email });
};

