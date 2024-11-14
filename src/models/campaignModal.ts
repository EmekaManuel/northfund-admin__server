import mongoose, { Schema } from "mongoose";

interface CampaignData {
  id: string;
  email: string;
  title: string;
  name: string;
  admission_proof_url: string;
  university_name: string;
  matric_number: string;
  course_of_study: string;
  year_of_entry: number;
  student_image_url: string;
  student_result_image_url: string;
  funding_reason: string;
  project_link: string;
  goal: number;
  start_at: Date;
  end_at: Date;
  status: "pending" | "approved" | "rejected";
  created_at: Date;
  updated_at?: Date;
  authorized: boolean;
}

const campaignSchema: Schema<CampaignData> = new mongoose.Schema(
  {
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    title: { type: String, required: true, minlength: 2 },
    name: { type: String, required: true, minlength: 2 },
    admission_proof_url: { type: String, required: true },
    university_name: { type: String, required: true, minlength: 2 },
    matric_number: { type: String, required: true, minlength: 2 },
    course_of_study: { type: String, required: true, minlength: 2 },
    year_of_entry: { type: Number, required: true, min: 1900 },
    student_image_url: { type: String, required: true },
    student_result_image_url: { type: String, required: true },
    funding_reason: { type: String, required: true, minlength: 10 },
    project_link: {
      type: String,
      required: true,
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
    },
    goal: { type: Number, required: true, min: 1 },
    start_at: { type: Date, required: true },
    end_at: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    authorized: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Export the model
const CampaignModel = mongoose.model<CampaignData>("Campaign", campaignSchema);
export default CampaignModel;
