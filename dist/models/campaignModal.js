"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const campaignSchema = new mongoose_1.default.Schema({
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
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
// Export the model
const CampaignModel = mongoose_1.default.model("Campaign", campaignSchema);
exports.default = CampaignModel;
//# sourceMappingURL=campaignModal.js.map