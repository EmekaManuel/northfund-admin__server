import express from "express";
import {
  authorizeCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../controllers/admin";

const router = express.Router();

router.get("/campaigns", getAllCampaigns);
router.get("/campaigns/:id", getCampaignById);
router.put("/campaigns/:id/authorize", authorizeCampaign);

export default router;
