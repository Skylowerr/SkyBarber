// LocalStorage kullanarak CRUD simülasyonu
let services = JSON.parse(localStorage.getItem('services')) || [
    { id: 1, name: 'Saç Kesimi', price: 250 },
    { id: 2, name: 'Sakal Tıraşı', price: 120 }
];

let editId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderAdminServices();

    const form = document.getElementById('service-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('service-name').value;
        const price = document.getElementById('service-price').value;

        if (editId) {
            // Düzenleme (Update)
            services = services.map(s => s.id === editId ? { ...s, name, price: Number(price) } : s);
            editId = null;
            document.getElementById('form-title').innerText = "Yeni Hizmet Ekle";
        } else {
            // Yeni Ekleme (Create)
            const newService = { id: Date.now(), name, price: Number(price) };
            services.push(newService);
        }

        localStorage.setItem('services', JSON.stringify(services));
        form.reset();
        renderAdminServices();
    });
});

// Listeleme (Read)
function renderAdminServices() {
    const list = document.getElementById('admin-services-list');
    if (!list) return;

    list.innerHTML = services.map(service => `
        <tr class="border-b border-slate-100">
            <td class="py-3 font-medium text-slate-900">${service.name}</td>
            <td class="py-3 text-slate-600">${service.price} TL</td>
            <td class="py-3 text-right space-x-2">
                <button onclick="editService(${service.id})" class="text-indigo-600 hover:underline font-medium">Düzenle</button>
                <button onclick="deleteService(${service.id})" class="text-red-600 hover:underline font-medium">Sil</button>
            </td>
        </tr>
    `).join('');
}

// Silme (Delete)
function deleteService(id) {
    services = services.filter(s => s.id !== id);
    localStorage.setItem('services', JSON.stringify(services));
    renderAdminServices();
}

// Düzenleme Modunu Açma
function editService(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    document.getElementById('service-name').value = service.name;
    document.getElementById('service-price').value = service.price;
    document.getElementById('form-title').innerText = "Hizmeti Düzenle";
    editId = id;
}