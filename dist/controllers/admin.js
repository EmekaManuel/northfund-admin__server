"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignById = exports.authorizeCampaign = exports.checkCampaignApproval = exports.getAllCampaigns = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const campaignModal_1 = __importDefault(require("../models/campaignModal"));
const authorizeCampaign = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { startDate, email, title } = req.body;
        const { status } = req.body;
        if (!["approved", "rejected"].includes(status)) {
            res.status(400).json({ error: "Invalid status" });
            return;
        }
        const campaign = await campaignModal_1.default.findOne({
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
exports.authorizeCampaign = authorizeCampaign;
const checkCampaignApproval = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { name, email, title } = req.body;
        const campaign = await campaignModal_1.default.findOne({
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
exports.checkCampaignApproval = checkCampaignApproval;
const getAllCampaigns = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const campaigns = await campaignModal_1.default.find();
        res.status(200).json({
            message: "All campaigns fetched successfully",
            campaigns,
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
exports.getAllCampaigns = getAllCampaigns;
const getCampaignById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const campaign = await campaignModal_1.default.findById(id);
        if (!campaign) {
            res.status(404).json({ message: "Campaign not found" });
            return;
        }
        res.status(200).json({
            message: "Campaign details fetched successfully",
            campaign,
        });
        return;
    }
    catch (error) {
        next(error instanceof Error ? error : new Error("An unknown error occurred"));
    }
});
exports.getCampaignById = getCampaignById;
//# sourceMappingURL=admin.js.map