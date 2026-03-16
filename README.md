# 🌍 Mapiva - Kişisel Seyahat Takip ve Günlük Platformu

Mapiva, Türkiye haritası üzerinde gezdiğiniz şehirleri interaktif olarak takip etmenizi, her şehre özel anılarınızı kaydetmenizi ve kendi dijital seyahat günlüğünüzü oluşturmanızı sağlayan modern bir full-stack web uygulamasıdır.

🔗 **Canlı Demo:** [mapiva-app.vercel.app](https://mapiva-v1qy.vercel.app/about)

![Mapiva Ekran Görüntüsü](public/cities/default-turkey.jpg)

## ✨ Öne Çıkan Özellikler

- **🗺️ İnteraktif Harita:** SVG tabanlı Türkiye haritası üzerinde gezilen illeri işaretleme, renklendirme ve istatistik tutma.
- **📝 Seyahat Notları:** Her şehre özel ziyaret tarihi, 5 üzerinden puanlama ve kişisel anıların kaydedilmesi.
- **📚 Şehir Keşif Kartları:** Haritada bir şehre tıklandığında açılan, o şehre ait özel yüksek çözünürlüklü görsel ve tanıtım yazısı barındıran dinamik kartlar.
- **🌐 Herkese Açık Gezgin Profili:** Kullanıcıların kendi seyahat haritalarını ve anılarını `mapiva.app/u/kullanici-adi` formatında, dışarıya sadece okunabilir (read-only) şekilde paylaşabilmesi.
- **📸 Seyahat Günlükleri (Blog):** Admin kontrollü, resimli seyahat günlükleri yayınlama sistemi. Misafir kullanıcılar sisteme direkt kayıt atamaz, ancak mail yönlendirmesiyle admin onayına hikaye gönderebilir.
- **🔒 Güvenli Altyapı:** Clerk ile modern kimlik doğrulama ve UploadThing ile bulut tabanlı, optimize görsel yönetimi.

## 🛠️ Kullanılan Teknolojiler

Bu proje, modern web standartları gözetilerek aşağıdaki teknolojilerle uçtan uca geliştirilmiştir:

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Dil:** TypeScript
- **Stil / UI:** Tailwind CSS
- **Veritabanı & ORM:** PostgreSQL (Supabase) & Prisma
- **Kimlik Doğrulama:** Clerk Auth
- **Medya Yönetimi:** UploadThing
- **Harita Kütüphanesi:** React Simple Maps

## 🚀 Kurulum (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

**1. Repoyu Klonlayın:**

```bash
git clone [https://github.com/aelmaser/mapiva]
cd mapiva
```

**2. Bağımlılıkları Yükleyin:**

```bash
npm install
```

**3. Çevre Değişkenlerini (Environment Variables) Ayarlayın:**
Kök dizinde bir `.env` dosyası oluşturun ve aşağıdaki anahtarları kendi servislerinizden alarak doldurun:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Veritabanı (PostgreSQL / Supabase)
DATABASE_URL="postgresql://kullanici:sifre@host:5432/veritabani"

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# Admin Kontrolü (Sadece blog yazısı ekleyebilecek kullanıcının Clerk ID'si)
ADMIN_USER_ID=user_2...
```

**4. Veritabanını Hazırlayın:**

```bash
npx prisma generate
npx prisma db push
```

**5. Uygulamayı Başlatın:**

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine giderek projeyi görüntüleyebilirsiniz.

## 🚧 Yol Haritası (Roadmap)

- [ ] Oyunlaştırma: Bölge bazlı başarı rozetleri (Örn: "Marmara Fatihi").
- [ ] İstek Listesi: Gezilmek istenen rotaların farklı renkte (Sarı vb.) işaretlenmesi.
- [ ] Dünya Haritası entegrasyonu ile global seyahat takibi.
