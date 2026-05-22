// Örnek mock data (Backend bağlanana kadar test etmek için)
const services = [
    { id: 1, name: 'Saç Kesimi', price: 250 },
    { id: 2, name: 'Sakal Tıraşı', price: 120 },
    { id: 3, name: 'Detaylı Bakım', price: 400 }
];

document.addEventListener('DOMContentLoaded', () => {
    renderServices(services);

    // Basit Arama Algoritması
    const searchInput = document.getElementById('search-service');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = services.filter(s => s.name.toLowerCase().includes(term));
            renderServices(filtered);
        });
    }
});

function renderServices(data) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(service => `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
                <h3 class="text-lg font-bold text-slate-900">${service.name}</h3>
                <p class="text-sm text-slate-500 mt-1">Profesyonel berber hizmeti.</p>
            </div>
            <div class="mt-6 flex justify-between items-center">
                <span class="text-xl font-semibold text-slate-900">${service.price} TL</span>
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">Randevu Seç</button>
            </div>
        </div>
    `).join('');
}