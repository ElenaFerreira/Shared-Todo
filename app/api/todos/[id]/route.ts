import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await context.params;
    const todo = await Todo.findOne({ taskId: Number(id) });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const body = await req.json();

    if (body.categoryId !== undefined) {
      todo.categoryId = Number(body.categoryId);
    } else if (body.toggleDone) {
      todo.done = !todo.done;
    }

    await todo.save();
    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectDB();
    await Todo.findOneAndDelete({ taskId: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
