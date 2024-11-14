import mongoose, { Schema } from "mongoose";

interface CampaignData {
  id: string;
  email: string;
  title: string;
  name: string;
  admissionProofUrl: string;
  universityName: string;
  matricNumber: string;
  courseOfStudy: string;
  yearOfEntry: number;
  studentImageUrl: string;
  studentResultImageUrl: string;
  fundingReason: string;
  projectLink: string;
  goal: number;
  startAt: Date;
  endAt: Date;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt?: Date;
  authorized: boolean;
}

const campaignSchema: Schema<CampaignData> = new mongoose.Schema({
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  title: { type: String, required: true, minlength: 2 },
  name: { type: String, required: true, minlength: 2 },
  admissionProofUrl: { type: String, required: true },
  universityName: { type: String, required: true, minlength: 2 },
  matricNumber: { type: String, required: true, minlength: 2 },
  courseOfStudy: { type: String, required: true, minlength: 2 },
  yearOfEntry: { type: Number, required: true, min: 1900 },
  studentImageUrl: { type: String, required: true },
  studentResultImageUrl: { type: String, required: true },
  fundingReason: { type: String, required: true, minlength: 10 },
  projectLink: {
    type: String,
    required: true,
    match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
  },
  goal: { type: Number, required: true, min: 1 },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  authorized: { type: Boolean, default: false },
});

// Export the model
const CampaignModel = mongoose.model<CampaignData>("Campaign", campaignSchema);
export default CampaignModel;
