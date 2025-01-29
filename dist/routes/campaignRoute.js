"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaign_1 = require("../controllers/campaign");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.post("/create-campaign", campaign_1.createCampaign);
router.post("/authorize-campaign", admin_1.checkCampaignApproval);
exports.default = router;
//# sourceMappingURL=campaignRoute.js.map