import { Announcement } from "../models/announcement.model.js";
import { User } from "../models/user.model.js";

const sanitizeLinks = (links = []) =>
  links
    .filter((link) => link?.label || link?.url)
    .map((link) => ({
      label: link?.label || "",
      url: link?.url || "",
    }));

const sanitizeFiles = (files = []) =>
  files
    .filter((file) => file?.name)
    .map((file) => ({
      name: file.name,
      mimeType: file.mimeType || "",
      size: Number(file.size || 0),
    }));

const sanitizeBlocks = (blocks = []) =>
  blocks.map((block) => ({
    type: block?.type,
    title: block?.title || "",
    body: block?.body || "",
    label: block?.label || "",
    value: block?.value || "",
    caption: block?.caption || "",
    rows: Number(block?.rows || 0),
    cols: Number(block?.cols || 0),
    cells: Array.isArray(block?.cells) ? block.cells : [],
    files: sanitizeFiles(block?.files || []),
  }));

export const createAnnouncement = async (req, res) => {
  try {
    const { type, title, description, summary, links, files, blocks } = req.body;
    const user = await User.findById(req.id);

    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can create announcements.",
        success: false,
      });
    }

    if (!type || !title?.trim()) {
      return res.status(400).json({
        message: "Type and title are required.",
        success: false,
      });
    }

    const announcement = await Announcement.create({
      type,
      title: title.trim(),
      description: description || "",
      summary: summary || "",
      links: sanitizeLinks(links),
      files: sanitizeFiles(files),
      blocks: sanitizeBlocks(blocks),
      createdBy: req.id,
    });

    return res.status(201).json({
      message: "Announcement posted successfully.",
      success: true,
      announcement,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create announcement.",
      success: false,
    });
  }
};

export const getLatestAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({})
      .populate("createdBy", "fullname email")
      .sort({ createdAt: -1 })
      .limit(12);

    return res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch announcements.",
      success: false,
    });
  }
};

export const getRecruiterAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ createdBy: req.id })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch recruiter announcements.",
      success: false,
    });
  }
};
