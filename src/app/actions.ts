"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function saveVisit(formData: FormData) {
  const { userId } = await auth();

  if (!userId) throw new Error("Giriş yapmalısınız!");

  const cityName = formData.get("cityName") as string;
  const notes = formData.get("notes") as string;
  const isVisited = formData.get("isVisited") !== null;
  
  // 1. Yeni verileri al
  const dateStr = formData.get("visitDate") as string; // "2024-05-20" gelir
  const ratingStr = formData.get("rating") as string;  // "5" gelir

  // 2. Formatla
  const visitDate = dateStr ? new Date(dateStr) : null;
  const rating = ratingStr ? parseInt(ratingStr) : null;

  const existingVisit = await db.visit.findFirst({
    where: { cityName, userId },
  });

  const data = {
    cityName,
    isVisited,
    notes,
    visitDate, // Tarihi ekle
    rating,    // Puanı ekle
    userId,
    country: "Turkey"
  };

  if (existingVisit) {
    await db.visit.update({
      where: { id: existingVisit.id },
      data: { isVisited, notes, visitDate, rating }, // Güncellerken de ekle
    });
  } else {
    await db.visit.create({ data });
  }

  revalidatePath("/");
}