import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createAnnouncement,
  getLatestAnnouncements,
  getRecruiterAnnouncements,
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createAnnouncement);
router.route("/latest").get(isAuthenticated, getLatestAnnouncements);
router.route("/mine").get(isAuthenticated, getRecruiterAnnouncements);

export default router;
