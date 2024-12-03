import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Automatically delete after 5 minutes
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', OTPSchema);

export default OTP;
