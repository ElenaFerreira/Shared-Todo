import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectDB();

    // Supprimer la catégorie
    await Category.findOneAndDelete({ categoryId: Number(id) });

    // Mettre à jour les tâches associées à cette catégorie
    await Todo.updateMany({ categoryId: id }, { $set: { categoryId: null } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
