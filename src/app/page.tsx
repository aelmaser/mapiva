import TurkeyMap from "@/components/TurkeyMap";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between gap-8">
      {/* Üst Karşılama Alanı */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Hoşgeldin, Gezgin! 🌍
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          MapivA ile gezdiğin şehirleri işaretle, anılarını ölümsüzleştir. 
          Aşağıdaki haritadan bir şehir seçerek başla.
        </p>
      </div>

      {/* Harita Bileşeni */}
      <div className="w-full max-w-6xl">
        <TurkeyMap />
      </div>
    </div>
  );
}