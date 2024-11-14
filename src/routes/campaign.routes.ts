import express from "express";
import { createCampaign } from "../controllers/campaign";

const router = express.Router();

router.post("/create-campaigns", createCampaign);

export default router;
