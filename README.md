# Testio - Kişilik Testleri Uygulaması

Testio, eğlenceli ve merak uyandıran kişilik testleri sunan bir mobil uygulamadır. Kullanıcılar kayıt olmadan direkt test çözmeye başlayabilir, sonuçlarını kart şeklinde görür ve sosyal medyada paylaşabilirler.

## 🚀 Özellikler

- 🚀 **Kayıt gerekmez** - Kullanıcı direkt test çözmeye başlar
- 🧮 **Test sonucu kartı** - Sonuç kartı rastgele renklerle ve emojiyle görselleştirilir
- 📤 **Paylaşım** - Sonuçlar Instagram, WhatsApp, X gibi platformlarda paylaşılabilir
- 🔀 **Rastgele test önerisi** - "Bir test daha çöz" butonu ile yeni test gelir
- 📈 **Popüler testler** - En çok çözülen testler üstte listelenir

## 📁 Proje Yapısı

```
kendini-bul/
├── backend/          # Node.js + Express + PostgreSQL
│   ├── config/       # Veritabanı konfigürasyonu
│   ├── controllers/  # Route controller'ları
│   ├── routes/       # API route'ları
│   ├── services/     # İş mantığı
│   ├── migrations/   # Veritabanı migration'ları
│   └── app.js        # Ana uygulama dosyası
└── testio/           # React Native + Expo
    ├── app/          # Expo Router ekranları
    ├── components/   # React Native bileşenleri
    ├── services/     # API servisleri
    └── constants/    # Sabitler
```

## 🛠️ Kurulum

### Backend

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (`.env.example` dosyasını referans alarak):
```bash
cp .env.example .env
```

4. PostgreSQL veritabanınızı oluşturun ve `.env` dosyasındaki bilgileri güncelleyin.

5. Migration'ı çalıştırın:
```bash
npm run migrate
```

6. Sunucuyu başlatın:
```bash
npm start
# veya development için:
npm run dev
```

Backend `http://localhost:8080` adresinde çalışacaktır.

### Frontend

1. Testio klasörüne gidin:
```bash
cd testio
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (opsiyonel, varsayılan olarak `http://localhost:8080/api` kullanılır):
```bash
echo "EXPO_PUBLIC_API_URL=http://localhost:8080/api" > .env
```

4. Uygulamayı başlatın:
```bash
npm start
```

5. Expo Go uygulaması ile QR kodu tarayın veya:
   - iOS için: `npm run ios`
   - Android için: `npm run android`
   - Web için: `npm run web`

## 📡 API Endpoints

### Testler

- `GET /api/tests` - Tüm testleri getir
- `GET /api/tests/popular?limit=10` - Popüler testleri getir
- `GET /api/tests/random` - Rastgele bir test getir
- `GET /api/tests/category/:category` - Kategoriye göre testleri getir
- `GET /api/tests/:id` - Belirli bir testi getir

### Sonuçlar

- `POST /api/results/submit` - Test sonucunu gönder
  ```json
  {
    "testId": "uuid",
    "answers": [0, 1, 2, 3]
  }
  ```
- `GET /api/results/token/:token` - Paylaşım token'ı ile sonucu getir
- `GET /api/results/stats/:testId` - Test istatistiklerini getir

## 🗄️ Veritabanı Şeması

### tests
- `id` (UUID) - Primary Key
- `title` (TEXT) - Test başlığı
- `description` (TEXT) - Kısa açıklama
- `questions` (JSONB) - Sorular ve seçenekler
- `results` (JSONB) - Sonuç aralıkları ve açıklamaları
- `category` (TEXT) - Test kategorisi
- `created_at` (TIMESTAMP) - Oluşturulma tarihi

### test_results
- `id` (UUID) - Primary Key
- `test_id` (UUID) - Test referansı
- `score` (INT) - Kullanıcının skoru
- `result_title` (TEXT) - Gösterilen başlık
- `share_token` (TEXT) - Paylaşım linki için kısa kod
- `created_at` (TIMESTAMP) - Oluşturulma tarihi

## 🎨 Örnek Testler

Uygulama şu örnek testlerle gelir:
- ☕ Sen hangi kahve türüsün?
- 🌍 Kişiliğin % kaç maceraperest?
- 🎬 Hangi dizinin karakterisin?
- 🧩 Gizli IQ seviyeni ölçelim!

## 📝 Notlar

- Backend ve frontend ayrı portlarda çalışır
- CORS ayarları backend'de yapılandırılmıştır
- Veritabanı migration'ı ilk çalıştırmada örnek testleri ekler
- Paylaşım token'ları otomatik olarak benzersiz oluşturulur

## 🔧 Geliştirme

### Yeni Test Ekleme

Veritabanına yeni test eklemek için SQL migration dosyasını düzenleyebilir veya doğrudan PostgreSQL'e bağlanarak ekleyebilirsiniz.

### Stil Değişiklikleri

Frontend'deki renkler ve emojiler `app/result.tsx` ve diğer ekran dosyalarında tanımlanmıştır.

## 📄 Lisans

ISC
