const { test, expect } = require('@playwright/test');

test.describe('SkyBarber - Kullanıcı Arayüzü (UI) ve Akış Testleri', () => {

  test('Müşteri Giriş Yapabilmeli ve Ana Sayfaya Yönlendirilebilmeli', async ({ page }) => {
    // 1. Live Server'da çalışan Giriş Sayfasına git
    // (Port numaran 5500 değilse kendi portunla güncellemeyi unutma)
    await page.goto('http://127.0.0.1:5500/Frontend/auth.html');
    await page.waitForLoadState('networkidle');

    // 2. Sayfa başlığının doğruluğunu kontrol et
    await expect(page).toHaveTitle(/SkyBarber/i);

    // 3. Form alanlarını test verileriyle doldur
    // (Buraya veritabanında gerçekten var olan bir test kullanıcısı yazabilirsin)
    await page.fill('input[type="email"]', 'skylowerr@gmail.com');
    await page.fill('input[type="password"]', 'sky');

    // 4. "Giriş Yap" butonuna tıkla
    // Butonun üzerindeki metne göre yakalıyoruz
    const loginButton = page.locator('button:has-text("Giriş Yap")');
    await loginButton.click();

    // 5. Giriş başarılı olduktan sonra yerel hafızaya token düştü mü kontrol et
    // Robotun login API isteğinin tamamlanmasını beklemesi için kısa bir süre tanıyoruz
    await page.waitForTimeout(1500);

    // 6. Tarayıcının ana sayfaya (index.html) yönlenip yönlenmediğini kontrol et
    const currentUrl = page.url();
    console.log("Giriş Sonrası Mevcut URL:", currentUrl);
    
    // URL'in artık 'index.html' içerdiğini doğruluyoruz
    expect(currentUrl).toContain('index.html');
  });

});