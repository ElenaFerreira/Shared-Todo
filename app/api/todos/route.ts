import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("La connexion à la base de données a échoué");
  }

  const tasks = await db.collection("tasks").find({}).toArray();

  console.log("Données direct Mongo:", tasks);

  return Response.json(tasks);
}
