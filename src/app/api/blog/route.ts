import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

// Prisma istemcisini başlatıyoruz
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Güvenlik: Kullanıcı giriş yapmış mı?
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Giriş yapmalısınız", { status: 401 });
    }

    // 2. Gelen verileri al
    const body = await req.json();
    const { title, content, imageUrl } = body;

    // Verilerin tam olup olmadığını kontrol et
    if (!title || !content || !imageUrl) {
      return new NextResponse("Lütfen tüm alanları doldurun", { status: 400 });
    }

    // 3. Kısa Özet (Excerpt) Oluştur: Yazının ilk 120 karakterini alıp sonuna ... koyalım
    const excerpt = content.length > 120 ? content.substring(0, 120) + "..." : content;

    // 4. Veritabanına (Supabase) Kaydet
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        imageUrl,
        userId,
      },
    });

    // Başarıyla kaydedildiğini bildir
    return NextResponse.json(blogPost);

  } catch (error) {
    console.error("YAZI_KAYDETME_HATASI:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}