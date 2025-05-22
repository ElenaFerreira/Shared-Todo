import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  const last = await Category.findOne().sort({ categoryId: -1 });
  const nextId = last ? last.categoryId + 1 : 1;

  const newCategory = await Category.create({ categoryId: nextId, name });
  return NextResponse.json(newCategory);
}
