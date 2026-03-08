import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Yetkisiz", { status: 401 });

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
  } catch (error) {
    console.error("API_BLOG_ERROR:", error);
    return new NextResponse("Sunucu Hatası", { status: 500 });
  }
}