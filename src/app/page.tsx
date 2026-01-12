import TurkeyMap from "@/components/TurkeyMap";
import { db } from "../lib/db"; // Yolu düzelttik

export default async function Home() {
  // Veritabanından her şeyi çekiyoruz
  const visits = await db.visit.findMany({
    where: { isVisited: true } // Sadece gezilenleri alalım
  });

  // visits dizisi içinde tarih (Date) objeleri var.
  // Next.js, Client Component'e (TurkeyMap) "Date" objesi gönderemez, hata verir.
  // O yüzden tarihleri string'e çevirmemiz lazım.
  const serializedVisits = visits.map(v => ({
    ...v,
    visitDate: v.visitDate ? v.visitDate.toISOString().split('T')[0] : "", // "2026-05-20" formatı
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white">
      {/* Tüm veriyi gönderiyoruz */}
      <TurkeyMap visits={serializedVisits} />
    </main>
  );
}