import express from "express";
import { createCampaign } from "../controllers/campaign";

const router = express.Router();

router.post("/create-campaign", createCampaign);

export default router;
