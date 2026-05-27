// 1. Test Edeceğimiz Yardımcı Fonksiyonlar (Gerçek hayatta controller veya helper içindedir)
// Berber fiyatlarının geçerli olup olmadığını kontrol eden fonksiyon
function isValidServicePrice(price: any): boolean {
    const num = Number(price);
    return !isNaN(num) && num > 0 && num <= 5000; // Fiyat negatif olamaz, mantıksız yüksek olamaz
}

// Seçilen saatin çalışma saatleri (09:00 - 17:00) arasında olup olmadığını kontrol eden fonksiyon
function isWorkingHour(time: string): boolean {
    const workingHours = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    return workingHours.includes(time);
}

// 2. JEST TEST SENARYOLARI
describe('SkyBarber Backend - İş Mantığı ve Veri Doğrulama Birim Testleri', () => {

    // A) Hizmet Fiyat Yönetimi Testleri
    describe('Hizmet Fiyat Doğrulama Modülü', () => {
        it('Geçerli bir berber hizmeti fiyatını onaylamalıdır (Örn: 250 TL)', () => {
            expect(isValidServicePrice(250)).toBe(true);
            expect(isValidServicePrice("150")).toBe(true); // String gelse bile sayıya dönebilmeli
        });

        it('Negatif, sıfır veya geçersiz fiyat değerlerini reddetmelidir', () => {
            expect(isValidServicePrice(-50)).toBe(false);
            expect(isValidServicePrice(0)).toBe(false);
            expect(isValidServicePrice("bedava")).toBe(false);
        });
    });

    // B) Randevu Saat Yönetimi Testleri
    describe('Randevu Saat Validasyon Modülü', () => {
        it('Berber çalışma saatleri içindeki randevu taleplerini kabul etmelidir', () => {
            expect(isWorkingHour("09:00")).toBe(true);
            expect(isWorkingHour("14:00")).toBe(true);
        });

        it('Çalışma saatleri dışındaki (gece veya öğle arası) randevu taleplerini reddetmelidir', () => {
            expect(isWorkingHour("22:00")).toBe(false); // Gece dükkan kapalı
            expect(isWorkingHour("12:00")).toBe(false); // Öğle arası mola saati
            expect(isWorkingHour("08:30")).toBe(false); // Dükkan henüz açılmadı
        });
    });

});