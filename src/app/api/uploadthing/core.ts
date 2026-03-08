import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Sadece resim, maks 4MB, 1 adet
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error("Giriş yapmalısınız!");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Foto yüklendi. Yükleyen:", metadata.userId);
      console.log("URL:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;