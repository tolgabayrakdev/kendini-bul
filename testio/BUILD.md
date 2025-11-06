# Testio - Store Build Rehberi

## 📱 Store'a Yükleme Adımları

### 1. EAS CLI Kurulumu

```bash
npm install -g eas-cli
```

### 2. EAS Hesabına Giriş

```bash
eas login
```

Eğer hesabınız yoksa:
```bash
eas register
```

### 3. Build Yapılandırması

`eas.json` dosyası zaten oluşturuldu. İsterseniz özelleştirebilirsiniz.

### 4. Android Build

#### APK (Test için):
```bash
npm run build:android
# veya
eas build --platform android --profile preview
```

#### AAB (Google Play Store için):
```bash
eas build --platform android --profile production
```

### 5. iOS Build

#### Test için:
```bash
npm run build:ios
# veya
eas build --platform ios --profile preview
```

#### App Store için:
```bash
eas build --platform ios --profile production
```

### 6. Her İki Platform İçin

```bash
npm run build:all
# veya
eas build --platform all
```

## 🚀 Store'a Yükleme

### Google Play Store

1. Build tamamlandıktan sonra:
```bash
npm run submit:android
# veya
eas submit --platform android
```

2. Google Play Console'da:
   - Yeni uygulama oluşturun
   - AAB dosyasını yükleyin
   - Uygulama bilgilerini doldurun
   - Store listing ekleyin
   - Yayınlayın

### Apple App Store

1. Build tamamlandıktan sonra:
```bash
npm run submit:ios
# veya
eas submit --platform ios
```

2. App Store Connect'te:
   - Yeni uygulama oluşturun
   - Build'i seçin
   - Uygulama bilgilerini doldurun
   - Store listing ekleyin
   - Review için gönderin

## ⚙️ Önemli Notlar

1. **Bundle Identifier / Package Name**: 
   - iOS: `com.testio.app`
   - Android: `com.testio.app`
   - Bu değerleri değiştirmek isterseniz `app.json` dosyasını düzenleyin.

2. **Version Management**:
   - Her yeni build için `version` (app.json) ve `buildNumber`/`versionCode` artırılmalı.

3. **Credentials**:
   - EAS otomatik olarak sertifikaları yönetir.
   - İlk build'de sorulacak soruları yanıtlayın.

4. **Environment Variables**:
   - Backend API URL'i için `.env` dosyası kullanılıyor.
   - Production build'de `EXPO_PUBLIC_API_URL` değişkenini ayarlayın.

## 🔧 Build Profilleri

- **development**: Development client için
- **preview**: Test için (APK/IPA)
- **production**: Store için (AAB/IPA)

## 📝 Checklist

- [ ] EAS CLI kuruldu
- [ ] EAS hesabına giriş yapıldı
- [ ] `app.json` yapılandırması kontrol edildi
- [ ] Bundle identifier/package name ayarlandı
- [ ] Icon ve splash screen hazır
- [ ] Backend API URL production için ayarlandı
- [ ] Build alındı
- [ ] Store listing hazırlandı
- [ ] Store'a yüklendi

## 🐛 Sorun Giderme

Eğer build sırasında hata alırsanız:

1. `eas build:list` ile build geçmişini kontrol edin
2. `eas build:view` ile build detaylarını görün
3. Logları kontrol edin
4. EAS dokümantasyonuna bakın: https://docs.expo.dev/build/introduction/

