"use server";

import { db } from "../lib/db"; // İçe aktarma yolunu düzelttik
import { revalidatePath } from "next/cache";

export async function saveVisit(cityName: string, data: { isVisited: boolean; visitDate: string; note: string }) {
  try {
    // 1. Önce bu şehir veritabanında var mı diye bakıyoruz
    const existing = await db.visit.findFirst({
      where: { cityName: cityName }
    });

    if (existing) {
      // VARSA: Güncelle (Update)
      await db.visit.update({
        where: { id: existing.id }, // Bulduğumuz kaydın ID'si üzerinden güncelliyoruz
        data: {
          isVisited: data.isVisited,
          visitDate: data.visitDate ? new Date(data.visitDate) : null, // Tarih varsa çevir, yoksa null
          note: data.note,
        },
      });
    } else {
      // YOKSA: Yeni Oluştur (Create)
      await db.visit.create({
        data: {
          cityName: cityName, // Zorunlu alan burasıydı, artık dolu.
          isVisited: data.isVisited,
          visitDate: data.visitDate ? new Date(data.visitDate) : null,
          note: data.note,
        },
      });
    }

    // 2. Haritayı güncellemek için önbelleği temizle
    revalidatePath("/");
    
    return { success: true };

  } catch (error) {
    console.error("Kayıt hatası:", error);
    return { success: false, error: "Kaydedilemedi!" };
  }
}