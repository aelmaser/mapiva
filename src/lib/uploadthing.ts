import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Projenin tam URL'ini veya yolunu açıkça belirtiyoruz
export const UploadButton = generateUploadButton<OurFileRouter>({
  url: "/api/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: "/api/uploadthing",
});