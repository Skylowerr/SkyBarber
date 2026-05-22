document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    if (!authForm) return;

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = authForm.querySelector('input[type="email"]').value;
        const password = authForm.querySelector('input[type="password"]').value;
        const toggleBtn = document.getElementById('toggle-auth');
        
        // Formun o an kayıt mı yoksa giriş modunda mı olduğunu buton metninden anlıyoruz
        const isLoginMode = toggleBtn.innerText.includes("Yeni hesap");

        if (isLoginMode) {
            // Giriş Yapma Simülasyonu
            console.log("Giriş yapılıyor:", email);
            
            // Kolay test için admin e-postası kontrolü
            if (email === 'admin@skybarber.com') {
                localStorage.setItem('userRole', 'admin');
                window.location.href = 'admin.html';
            } else {
                localStorage.setItem('userRole', 'customer');
                localStorage.setItem('userEmail', email);
                window.location.href = 'index.html';
            }
        } else {
            // Kayıt Olma Simülasyonu
            console.log("Yeni hesap oluşturuluyor:", email);
            alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
            // Kayıt sonrası otomatik giriş moduna geri döndür
            toggleBtn.click();
            authForm.reset();
        }
    });
});