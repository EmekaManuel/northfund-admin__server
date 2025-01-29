"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.get("/campaigns", admin_1.getAllCampaigns);
router.get("/campaigns/:id", admin_1.getCampaignById);
router.put("/campaigns/authorize", admin_1.authorizeCampaign);
exports.default = router;
//# sourceMappingURL=adminRoute.js.map