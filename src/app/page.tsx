import TurkeyMap from "@/components/TurkeyMap";
import { db } from "../lib/db";
export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import StatsSection from "@/components/StatsSection";

export default async function Home() {
  const { userId } = await auth();

  // Giriş yapmamış kullanıcı için
  if (!userId) {
    return (
      // Navbar zaten Layout'ta ise buraya sadece haritayı koyuyoruz
      <main className="min-h-screen bg-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <TurkeyMap visitedCities={[]} />
          {/* Giriş yapmayanlara istatistik göstermiyoruz veya demo gösterebiliriz */}
        </div>
      </main>
    );
  }

  // Verileri çek
  const visits = await db.visit.findMany({
    where: { isVisited: true, userId: userId },
  });

  return (
    <main className="min-h-screen bg-blue-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HARİTA BÖLÜMÜ */}
        <section>
          <TurkeyMap visitedCities={visits} />
        </section>

        {/* İSTATİSTİK BÖLÜMÜ (YENİ) */}
        <section>
          <StatsSection visits={visits} />
        </section>
      </div>
    </main>
  );
}
