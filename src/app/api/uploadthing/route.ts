import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Bu dosya SADECE fotoğraf yükleme trafiğini yönetir.
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});