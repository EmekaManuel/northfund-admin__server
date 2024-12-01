import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import CampaignModel from "../models/campaignModal";

const authorizeCampaign = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { startDate, email, title } = req.body;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      const campaign = await CampaignModel.findOne({
        start_at: new Date(startDate),
        email,
        title,
      });

      if (!campaign) {
        res.status(404).json({ message: "Campaign not found" });
        return;
      }

      campaign.status = status;
      campaign.authorized = status === "approved";

      await campaign.save();

      res.status(200).json({
        message: `Campaign ${status}`,
        campaign,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
);

const checkCampaignApproval = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, title } = req.body;

      const campaign = await CampaignModel.findOne({
        name: name,
        email: email,
        title,
      });

      if (!campaign) {
        res.status(404).json({ message: "Campaign not found" });
        return;
      }

      if (campaign.status.toLowerCase() !== "approved") {
        res.status(403).json({
          message: "Campaign has not been approved by the admin",
        });
        return;
      }

      if (!campaign.authorized) {
        res.status(403).json({
          message: "Campaign is not authorized for withdrawal",
        });
        return;
      }

      res.status(200).json({
        message: "Campaign is approved for withdrawal",
        campaign,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
);

const getAllCampaigns = asyncHandler(async (req: Request, res: Response) => {
  try {
    const campaigns = await CampaignModel.find();
    res.status(200).json({
      message: "All campaigns fetched successfully",
      campaigns,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

const getCampaignById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const campaign = await CampaignModel.findById(id);

      if (!campaign) {
        res.status(404).json({ message: "Campaign not found" });
        return;
      }

      res.status(200).json({
        message: "Campaign details fetched successfully",
        campaign,
      });
      return;
    } catch (error) {
      next(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    }
  }
);

export {
  getAllCampaigns,
  checkCampaignApproval,
  authorizeCampaign,
  getCampaignById,
};
