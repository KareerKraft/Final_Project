import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const attachmentSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    mimeType: { type: String, trim: true, default: "" },
    size: { type: Number, default: 0 },
  },
  { _id: false }
);

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "pair", "table", "image"],
      required: true,
    },
    title: { type: String, trim: true, default: "" },
    body: { type: String, default: "" },
    label: { type: String, trim: true, default: "" },
    value: { type: String, default: "" },
    caption: { type: String, trim: true, default: "" },
    rows: { type: Number, default: 0 },
    cols: { type: Number, default: 0 },
    cells: { type: [[String]], default: [] },
    files: { type: [attachmentSchema], default: [] },
  },
  { _id: false }
);

const announcementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["shortlisted", "venue", "custom"],
      required: true,
    },
    title: { type: String, trim: true, required: true },
    description: { type: String, default: "" },
    summary: { type: String, default: "" },
    links: { type: [linkSchema], default: [] },
    files: { type: [attachmentSchema], default: [] },
    blocks: { type: [blockSchema], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
