const API_URL = 'http://localhost:3000/api/services';

document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('services-grid');
    const searchInput = document.getElementById('search-input'); // HTML'deki arama inputunun id'si
    const sortSelect = document.getElementById('sort-select');   // HTML'deki sıralama select'inin id'si
    const btnSearch = document.getElementById('btn-search');     // Ara butonu

    // 1. Hizmetleri Backend'den Çeken Fonksiyon
    async function fetchServices() {
        try {
            const searchValue = searchInput ? searchInput.value : '';
            const sortValue = sortSelect ? sortSelect.value : '';

            // Backend'e arama ve sıralama parametrelerini query string olarak gönderiyoruz
            const response = await fetch(`${API_URL}?search=${searchValue}&sortBy=${sortValue}`);
            const services = await response.json();

            if (!response.ok) throw new Error('Hizmetler yüklenirken bir hata oluştu.');

            // Grid'in içini temizle ve dinamik verileri bas
            servicesGrid.innerHTML = '';
            
            if (services.length === 0) {
                servicesGrid.innerHTML = `<p class="text-slate-500 text-center col-span-3 py-8">Aradığınız kriterlere uygun hizmet bulunamadı.</p>`;
                return;
            }

            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">${service.name}</h3>
                        <p class="text-sm text-slate-500 mt-1">Modern ve tarzınıza uygun kesim.</p>
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                        <span class="text-xl font-semibold text-slate-900">${service.price} TL</span>
                        <button class="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition">
                            Randevu Seç
                        </button>
                    </div>
                `;
                servicesGrid.appendChild(card);
            });

        } catch (error) {
            console.error('Hata:', error);
            servicesGrid.innerHTML = `<p class="text-red-500 text-center col-span-3 py-8">Hizmetler yüklenirken bir sorun oluştu.</p>`;
        }
    }

    // 2. Olay Dinleyicileri (Event Listeners)
    if (btnSearch) {
        btnSearch.addEventListener('click', fetchServices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') fetchServices();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', fetchServices);
    }

    // Sayfa ilk açıldığında verileri getir
    fetchServices();
});