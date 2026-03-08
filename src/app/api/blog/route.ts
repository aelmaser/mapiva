import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Giriş yapmalısınız", { status: 401 });

    const body = await req.json();
    const { title, content, imageUrl } = body;

    // Konsola ne geldiğini yazdıralım (Vercel Logs'ta görünür)
    console.log("Gelen Veriler:", { title, content, imageUrl, userId });

    const excerpt = content.length > 120 ? content.substring(0, 120) + "..." : content;

    // VERİTABANI KAYDI
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
    // HATAYI DETAYLI GÖRELİM
    console.error("KRİTİK_HATA:", error.message);
    return new NextResponse(`Veritabanı Hatası: ${error.message}`, { status: 500 });
  }
}