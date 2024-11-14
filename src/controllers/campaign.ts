import asyncHandler from "express-async-handler";
import CampaignModel from "../models/campaignModal";

const createCampaign = asyncHandler(async (req, res) => {
  try {
    const campaignData = req.body;

    const campaign = new CampaignModel({
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export { createCampaign };
