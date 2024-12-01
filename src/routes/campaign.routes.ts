import express from "express";
import { createCampaign } from "../controllers/campaign";
import { checkCampaignApproval } from "../controllers/admin";

const router = express.Router();

router.post("/create-campaign", createCampaign);
router.post("/authorize-campaign", checkCampaignApproval);

export default router;
