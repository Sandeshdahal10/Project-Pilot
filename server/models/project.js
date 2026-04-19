import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"],
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxLength: [200, "Project title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxLength: [2000, "Project description cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    files: [
      {
        fileType: {
          type: String,
          required: [true, "File type is required"],
        },
        fileUrl: {
          type: String,
          required: [true, "File type is required"],
        },
        originalName: {
          type: String,
          required: [true, "File type is required"],
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    feedback: [
      {
        supervisorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        type: {
          type: String,
          enum: ["positive", "negative", "general"],
          default: "general",
        },
        title: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
          maxLength: [1000, "Feedback message cannot exceed 1000 characters"],
        },
      },
    ],
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);


// Indexing for better query performance
projectSchema.index({ student: 1 });
projectSchema.index({ supervisor: 1 });
projectSchema.index({ status: 1 });


export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);