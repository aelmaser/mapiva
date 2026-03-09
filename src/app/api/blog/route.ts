import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    // 1. Kullanıcı giriş yapmış mı?
    if (!userId) {
      return new NextResponse("Yetkisiz", { status: 401 });
    }

    // 2. Giren kişi Admin (Sen) misin? (ÇOK KRİTİK EKLENTİ)
    if (userId !== process.env.ADMIN_USER_ID) {
      return new NextResponse("Sadece yöneticiler günlük ekleyebilir.", { status: 403 });
    }

    const body = await req.json();
    const { title, content, imageUrl } = body;

    if (!title || !content || !imageUrl) {
      return new NextResponse("Eksik alanlar", { status: 400 });
    }

    const excerpt = content.length > 120 ? content.substring(0, 120) + "..." : content;

    const blogPost = await db.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        imageUrl,
        userId,
      },
    });

    return NextResponse.json(blogPost);
  } catch (error: any) {
    console.error("KRİTİK_HATA:", error.message);
    return new NextResponse(`Veritabanı Hatası: ${error.message}`, { status: 500 });
  }
}