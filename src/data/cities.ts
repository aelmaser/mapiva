export interface CityData {
  name: string;
  imageUrl: string;
  description: string;
}

// Özel veri girilmeyen şehirler için varsayılan şık görünüm
const DEFAULT_CITY_DATA: CityData = {
  name: "Türkiye",
  imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop", // Şık bir İstanbul/Türkiye manzarası
  description: "Türkiye'nin keşfedilmeyi bekleyen, kendine has kültürü, tarihi ve eşsiz güzellikleriyle dolu harika bir şehri. Burayı gezdikten sonra kendi anılarını aşağıya not edebilirsin.",
};

export const citiesData: Record<string, CityData> = {
  "kocaeli": {
    name: "Kocaeli",
    imageUrl: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop", 
    description: "Körfezin incisi İzmit'i, Kartepe'nin yemyeşil doğası ve denizin mavisiyle harmanlayan, her sokağında ayrı bir dinamizm barındıran güzel şehrimiz."
  },
  "çanakkale": {
    name: "Çanakkale",
    imageUrl: "https://images.unsplash.com/photo-1587313632749-3e3ec2ad30dd?q=80&w=800&auto=format&fit=crop",
    description: "Tarihin seyrinin değiştiği, rüzgarın hiç eksik olmadığı, Boğaz'ın serin sularıyla destanlaşan kahramanlar diyarı."
  },
  "istanbul": {
    name: "İstanbul",
    imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
    description: "İki kıtayı birbirine bağlayan, yüzyıllarca imparatorluklara başkentlik yapmış, efsaneleri ve silüetiyle dünyanın baş döndürücü metropolü."
  },
  "izmir": {
    name: "İzmir",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
    description: "Ege'nin incisi; Kordon'daki gün batımı, palmiyeli sokakları ve sıcakkanlı insanlarıyla yaşama sevincinin şehri."
  },
  "ankara": {
    name: "Ankara",
    imageUrl: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=800&auto=format&fit=crop",
    description: "Cumhuriyetin kalbinin attığı, bozkırın ortasında yükselen, modern yapısı ve tarihi değerleriyle Türkiye'nin gurur dolu başkenti."
  },
  "antalya": {
    name: "Antalya",
    imageUrl: "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?q=80&w=800&auto=format&fit=crop",
    description: "Turkuaz renkli koyları, antik kentleri ve sıcacık güneşiyle Akdeniz'in tartışmasız turizm başkenti."
  }
  // İstediğin kadar şehri buraya küçük harflerle (anahtar kelime olarak) ekleyebilirsin.
};

// Haritadan gelen şehir ismini alır, verisi varsa onu, yoksa varsayılanı döndürür
export const getCityData = (cityName: string): CityData => {
  const key = cityName.toLocaleLowerCase('tr-TR').trim();
  return citiesData[key] || { ...DEFAULT_CITY_DATA, name: cityName };
};