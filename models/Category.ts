import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
