import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;
  const todo = await Todo.findById(id);
  todo.done = !todo.done;
  await todo.save();
  return NextResponse.json(todo);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Todo.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
