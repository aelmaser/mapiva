export interface CityData {
  name: string;
  imageUrl: string;
  description: string;
}

const DEFAULT_CITY_DATA: CityData = {
  name: "Türkiye",
  imageUrl: "/cities/default-turkey.jpg", 
  description: "Türkiye'nin keşfedilmeyi bekleyen, kendine has kültürü, tarihi ve eşsiz güzellikleriyle dolu harika bir şehri. Burayı gezdikten sonra kendi anılarını aşağıya not edebilirsin.",
};

export const citiesData: Record<string, CityData> = {
  "kocaeli": {
    name: "Kocaeli",
    imageUrl: "/cities/kocaeli.jpg", 
    description: "Körfezin incisi İzmit'i, Kartepe'nin yemyeşil doğası ve denizin mavisiyle harmanlayan, her sokağında ayrı bir dinamizm barındıran güzel şehrimiz."
  },
  "çanakkale": {
    name: "Çanakkale",
    imageUrl: "/cities/canakkale.jpg",
    description: "Tarihin seyrinin değiştiği, rüzgarın hiç eksik olmadığı, Boğaz'ın serin sularıyla destanlaşan kahramanlar diyarı."
  },
  "istanbul": {
    name: "İstanbul",
    imageUrl: "/cities/istanbul.jpg",
    description: "İki kıtayı birbirine bağlayan, yüzyıllarca imparatorluklara başkentlik yapmış, efsaneleri ve silüetiyle dünyanın baş döndürücü metropolü."
  },
  "izmir": {
    name: "İzmir",
    imageUrl: "/cities/izmir.jpg",
    description: "Ege'nin incisi; Kordon'daki gün batımı, palmiyeli sokakları ve sıcakkanlı insanlarıyla yaşama sevincinin şehri."
  },
  "ankara": {
    name: "Ankara",
    imageUrl: "/cities/ankara.jpg",
    description: "Cumhuriyetin kalbinin attığı, bozkırın ortasında yükselen, modern yapısı ve tarihi değerleriyle Türkiye'nin gurur dolu başkenti."
  },
  "antalya": {
    name: "Antalya",
    imageUrl: "/cities/antalya.jpg",
    description: "Turkuaz renkli koyları, antik kentleri ve sıcacık güneşiyle Akdeniz'in tartışmasız turizm başkenti."
  },
  "bursa": {
    name: "Bursa",
    imageUrl: "/cities/bursa.jpg",
    description: "Osmanlı'nın ilk başkenti, yeşiliyle göz alan, Uludağ'ın eteklerinde tarih ve doğanın iç içe geçtiği ulu şehir."
  },
  "konya": {
    name: "Konya",
    imageUrl: "/cities/konya.jpg",
    description: "Mevlana'nın hoşgörüsüyle harmanlanmış, geniş ovalarında huzur ve mistik bir atmosfer barındıran kadim Selçuklu başkenti."
  },
  "gaziantep": {
    name: "Gaziantep",
    imageUrl: "/cities/gaziantep.jpg",
    description: "Eşsiz mutfağı, Zeugma'nın tarihi mozaikleri ve kahramanlık destanlarıyla Güneydoğu'nun parlayan yıldızı."
  },
  "şanlıurfa": {
    name: "Şanlıurfa",
    imageUrl: "/cities/sanliurfa.jpg",
    description: "Göbeklitepe ile tarihin sıfır noktasına ev sahipliği yapan, Balıklıgöl'ün maneviyatıyla yoğrulmuş peygamberler şehri."
  },
  "adana": {
    name: "Adana",
    imageUrl: "/cities/adana.jpg",
    description: "Seyhan Nehri'nin bereket kattığı topraklarda, sımsıcak insanları ve eşsiz lezzetleriyle Çukurova'nın kalbi."
  },
  "zonguldak": {
    name: "Zonguldak",
    imageUrl: "/cities/zonguldak.jpg",
    description: "Karadeniz'in sarp yamaçlarında emeğin ve kömürün başkenti, yemyeşil ormanların hırçın dalgalarla buluştuğu şehir."
  },
  "eskişehir": {
    name: "Eskişehir",
    imageUrl: "/cities/eskisehir.jpg",
    description: "Porsuk Çayı'nın etrafında şekillenen dinamik hayatı, tarihi Odunpazarı evleri ve modern yüzüyle masal gibi bir Anadolu kenti."
  },
  "edirne": {
    name: "Edirne",
    imageUrl: "/cities/edirne.jpg",
    description: "Mimar Sinan'ın ustalık eseri Selimiye'nin gölgesinde, Meriç Nehri'nin sularıyla hayat bulan, tarihin batıya açılan kapısı."
  },
  "trabzon": {
    name: "Trabzon",
    imageUrl: "/cities/trabzon.jpg",
    description: "Sümela Manastırı'nın gizemi, yemyeşil yaylaları ve Karadeniz'in coşkusuyla köklü ve hareketli liman şehri."
  },
  "rize": {
    name: "Rize",
    imageUrl: "/cities/rize.jpg",
    description: "Bulutların üzerinde gezinme hissi veren çay bahçeleri, Fırtına Deresi'nin sesi ve dik yamaçlarıyla doğanın başkenti."
  }
};

export const getCityData = (cityName: string): CityData => {
  const key = cityName.toLocaleLowerCase('tr-TR').trim();
  return citiesData[key] || { ...DEFAULT_CITY_DATA, name: cityName };
};