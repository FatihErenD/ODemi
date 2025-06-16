# Online Education Platform

## ✨ Proje Tanımı

Bu proje, YouTube tarzı çalışan bir **online eğitim platformudur**. Kullanıcılar hem **kurs oluşturabilir** hem de diğer kullanıcıların kurslarına **göz atabilir ve erişebilir**. Platformda ayrıca **shorts (kısa video)** içerikleri de desteklenmektedir.

## 💻 Teknolojiler

* **Frontend:** React
* **Backend:** Java Spring Boot
* **Veritabanı:** MySQL
* **Oturum Yönetimi:** JWT + Cookie

## 📄 Genel Özellikler

* **Kullanıcı yönetimi:** Yeni kullanıcılar kayıt olabilir, mevcut kullanıcılar ise giriş yaparak içerik oluşturabilir.
* **Kurs oluşturma:** Her kullanıcı kendi kurslarını oluşturabilir, başlık, açıklama, kategori ve görsel ekleyebilir.
* **Kurs düzenleme:** Kurs sahipleri mevcut kurslarını düzenleyebilir, güncelleyebilir veya silebilir.
* **Ders modülü:** Kurslara bölüm ekleme (lesson), her bölüm için video, açıklama ve içerik tanımlama.
* **Yorum sistemi:** Kullanıcılar hem derslere hem de kurs geneline yorum yazabilir. Yorumlar tarih sırasına göre sıralanır.
* **Shorts özelliği:** Kısa, dikey formatta videolar paylaşılabilir ve platformda ayrı bir alanda listelenir.
* **Önerilen kurslar:** Giriş yapan kullanıcılara, takip ettikleri eğitmenlerin diğer kursları önerilir. Giriş yapmayanlara rastgele 5 kurs gösterilir.

## 📅 Gereksinimler

* Java JDK 17+
* Node.js 18+
* npm veya yarn
* MySQL 8+

## ⚖️ Kurulum Adımları

### Backend (Spring Boot)

1. `application.properties` içinde veritabanı ayarlarını yapın:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
   spring.datasource.username=your_db_user
   spring.datasource.password=your_db_password
   ```
2. JWT secret key gibi ayarları tanımlayın.
3. Projeyi çalıştırmak için:

   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (Next.js)

1. Frontend klasörüne geçin:

   ```bash
   cd frontend
   ```
2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```
3. Uygulamayı başlatın:

   ```bash
   npm run dev
   ```

## 🔗 Erişim

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8080](http://localhost:8080)

## 🖼️ Ekran Görüntüleri

Aşağıda uygulamaya ait bazı ekran görüntülerine yer verilmiştir:
| ![Login Ekranı](https://github.com/user-attachments/assets/d333d745-b0f4-4081-b2a2-5e948ec044b7) |
|:--:|
| **_Giriş Ekranı_** |

<br>

| ![Ana Ekran](https://github.com/user-attachments/assets/1e7c9212-f3e5-4caa-b58a-d6e6edd81642) |
|:--:|
| **_Ana Sayfa_** |

<br>

| ![Kurs Ekranı](https://github.com/user-attachments/assets/dca34f0c-beb2-4396-837e-354e07134428) |
|:--:|
| **_Kurs Ekranı_** |

<br>

| ![Profil Ekranı](https://github.com/user-attachments/assets/4d3d5d5d-d624-4efa-90dc-0da18f6b798d) |
|:--:|
| **_Profil Ekranı_** |


## 🚀 Notlar

* Oturum yönetimi JWT + Cookie ile sağlanır.
* Giriş yapmayan kullanıcılar sadece görüntüleme yapabilir.
* `rec-courses` endpoint'i giriş yapan kullanıcıya önerilen kursları, yapmayanlara rastgele 5 kurs döner.

---

Bu proje, hem öğrenenler hem de eğitmenler için esnek, açık ve özgün bir online eğitim deneyimi sağlamaya yöneliktir.

## 👥 Katkıda Bulunanlar

Projeyi geliştiren ekip üyeleri:

- **Buğra Burak Uzun** – 170422029  
- **Erol Yeşilyurt** – 170422058  
- **Ertunga Yusuf Ocak** – 170422028  
- **Fatih Eren Durmuş** – 171422006  
