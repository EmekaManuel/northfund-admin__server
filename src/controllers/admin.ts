import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import CampaignModel from "../models/campaignModal";

const authorizeCampaign = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      const campaign = await CampaignModel.findByIdAndUpdate(
        id,
        { status, authorized: status === "approved" },
        { new: true }
      );

      if (!campaign) {
        res.status(404).json({ message: "Campaign not found" });
        return;
      }

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

export { getAllCampaigns, authorizeCampaign, getCampaignById };
