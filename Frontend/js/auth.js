const API_URL = 'https://sky-barber-alpha.vercel.app/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    if (!authForm) return;

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = authForm.querySelector('input[type="email"]').value;
        const password = authForm.querySelector('input[type="password"]').value;
        const toggleBtn = document.getElementById('toggle-auth');
        
        // Buton metnine bakarak mod tespiti (Giriş mi, Kayıt mı?)
        const isLoginMode = toggleBtn.innerText.includes("Yeni hesap");

        try {
            if (isLoginMode) {
                // 1. Giriş Yapma (Login) İsteği[cite: 1]
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Giriş yapılamadı.');
                }

                // Gelen JWT token ve rol bilgisini sakla[cite: 1]
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.role);
                localStorage.setItem('userEmail', data.email);

                // Role göre yönlendirme yap[cite: 1]
                if (data.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                // 2. Kayıt Olma (Register) İsteği[cite: 1]
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, role: 'customer' })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Kayıt esnasında bir hata oluştu.');
                }

                alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
                toggleBtn.click(); // Formu tekrar giriş moduna çek
                authForm.reset();
            }
        } catch (error) {
            alert(error.message);
        }
    });

    // js/auth.js içine eklenecek arayüz geçiş kodu:
    const toggleBtn = document.getElementById('toggle-auth');
    const subtitle = document.getElementById('auth-subtitle');
    const submitBtn = authForm.querySelector('button[type="submit"]');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLoginMode = toggleBtn.innerText.includes("Yeni hesap");
            if (isLoginMode) {
                subtitle.innerText = "Hemen yeni bir hesap oluşturun";
                submitBtn.innerText = "Kayıt Ol";
                toggleBtn.innerText = "Zaten hesabınız var mı? Giriş yapın";
            } else {
                subtitle.innerText = "Hesabınıza giriş yapın";
                submitBtn.innerText = "Giriş Yap";
                toggleBtn.innerText = "Yeni hesap oluştur";
            }
        });
    }
});

