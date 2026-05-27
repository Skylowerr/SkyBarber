const API_URL = 'http://localhost:3000/api/services';

document.addEventListener('DOMContentLoaded', () => {
    const adminServicesList = document.getElementById('admin-services-list');
    const addServiceForm = document.getElementById('add-service-form');

    // 1. Token ve Rol Kontrolü (Güvenlik Duvarı)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'admin') {
        alert('Bu sayfaya erişim yetkiniz yok! Lütfen admin hesabı ile giriş yapın.');
        window.location.href = 'auth.html';
        return;
    }

    // 2. Hizmetleri Veritabanından Çekip Listeleme (Read)
    async function fetchAdminServices() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Hizmetler getirilemedi.');
            }

            const services = await response.json();
            adminServicesList.innerHTML = '';

            if (services.length === 0) {
                adminServicesList.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center py-8 text-sm text-slate-400">Henüz eklenmiş bir hizmet bulunmuyor.</td>
                    </tr>`;
                return;
            }

            services.forEach(service => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-100 hover:bg-slate-50 transition';
                tr.innerHTML = `
                    <td class="py-4 px-6 font-medium text-slate-900">${service.name}</td>
                    <td class="py-4 px-6 text-slate-700">${service.price} TL</td>
                    <td class="py-4 px-6 text-right text-sm">
                        <button onclick="editService('${service.id}', '${service.name}', ${service.price})" class="text-indigo-600 hover:text-indigo-900 font-medium mr-4 cursor-pointer">Düzenle</button>
                        <button onclick="deleteService('${service.id}')" class="text-red-600 hover:text-red-900 font-medium cursor-pointer">Sil</button>
                    </td>
                `;
                adminServicesList.appendChild(tr);
            });
        } catch (error) {
            console.error('Listeleme Hatası:', error);
            adminServicesList.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center py-8 text-sm text-red-500 font-medium">Hata: ${error.message}</td>
                </tr>`;
        }
    }

    // 3. Yeni Hizmet Ekleme (Create)
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('service-name').value;
            const price = document.getElementById('service-price').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, price })
                });

                const data = await response.json();

                if (!response.ok) {
                    // Sunucudan veya Firebase'den dönen gerçek hatayı fırlatıyoruz
                    throw new Error(data.error || 'Hizmet sunucuya kaydedilemedi.');
                }

                alert('Hizmet başarıyla veritabanına eklendi!');
                addServiceForm.reset();
                fetchAdminServices(); // Tabloyu anında güncelle
            } catch (error) {
                console.error('Ekleme Hatası:', error);
                alert('Ekleme Başarısız! \nDetay: ' + error.message);
            }
        });
    }

    // 4. Hizmet Silme (Delete)
    window.deleteService = async (id) => {
        if (!confirm('Bu hizmeti veritabanından tamamen silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Hizmet silinemedi.');

            alert('Hizmet başarıyla silindi.');
            fetchAdminServices(); // Tabloyu anında güncelle
        } catch (error) {
            alert('Silme Hatası: ' + error.message);
        }
    };

    // 5. Hizmet Güncelleme (Update)
    window.editService = async (id, currentName, currentPrice) => {
        const newName = prompt('Yeni Hizmet Adı:', currentName);
        const newPrice = prompt('Yeni Fiyat (TL):', currentPrice);

        // İptal edilirse veya boş bırakılırsa işlem yapma
        if (newName === null || newPrice === null) return; 
        if (newName.trim() === '' || newPrice.trim() === '') {
            alert('Alanlar boş bırakılamaz!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, price: Number(newPrice) })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Hizmet güncellenemedi.');

            alert('Hizmet başarıyla güncellendi!');
            fetchAdminServices(); // Tabloyu anında güncelle
        } catch (error) {
            alert('Güncelleme Hatası: ' + error.message);
        }
    };

    // Sayfa ilk açıldığında aktif hizmetleri Firestore'dan yükle
    fetchAdminServices();
});