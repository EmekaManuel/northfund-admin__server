"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCampaign = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const campaignModal_1 = __importDefault(require("../models/campaignModal"));
const createCampaign = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const campaignData = req.body;
        const campaign = new campaignModal_1.default({
            email: campaignData.email,
            title: campaignData.title,
            name: campaignData.name,
            admission_proof_url: campaignData.admission_proof_url,
            university_name: campaignData.university_name,
            matric_number: campaignData.matric_number,
            course_of_study: campaignData.course_of_study,
            year_of_entry: campaignData.year_of_entry,
            student_image_url: campaignData.student_image_url,
            student_result_image_url: campaignData.student_result_image_url,
            funding_reason: campaignData.funding_reason,
            project_link: campaignData.project_link,
            goal: campaignData.goal,
            start_at: campaignData.start_at,
            end_at: campaignData.end_at,
        });
        await campaign.save();
        res.status(201).json({
            message: "Campaign created successfully and sent to admin panel",
            campaign,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createCampaign = createCampaign;
//# sourceMappingURL=campaign.js.map