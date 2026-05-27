const API_URL = 'http://localhost:3000/api/services';
const APPOINTMENT_URL = 'http://localhost:3000/api/appointments';

document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('services-grid');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const btnSearch = document.getElementById('btn-search');

    // Modal Elementleri
    const modal = document.getElementById('appointment-modal');
    const modalTitle = document.getElementById('modal-service-name');
    const modalPrice = document.getElementById('modal-service-price');
    const appointmentDateInput = document.getElementById('appointment-date');
    const timeSlotsGrid = document.getElementById('time-slots-grid');
    const btnConfirm = document.getElementById('btn-confirm-appointment');

    let selectedService = null;
    let selectedTime = null;

    // Çalışma Saatleri Listesi
    const workingHours = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    // Bugünün tarihini takvimde minimum tarih yap (Geçmişe randevu alınamasın)
    if(appointmentDateInput) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDateInput.min = today;
    }

    // 1. Hizmetleri Çek ve Listele
    async function fetchServices() {
        try {
            const searchValue = searchInput ? searchInput.value : '';
            const sortValue = sortSelect ? sortSelect.value : '';
            const response = await fetch(`${API_URL}?search=${searchValue}&sortBy=${sortValue}`);
            const services = await response.json();

            servicesGrid.innerHTML = '';
            if (services.length === 0) {
                servicesGrid.innerHTML = `<p class="text-slate-500 text-center col-span-3 py-8">Service not found.</p>`;
                return;
            }

            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">${service.name}</h3>
                        <p class="text-sm text-slate-500 mt-1">Professional Barber Services.</p>
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                        <span class="text-xl font-semibold text-slate-900">${service.price} TL</span>
                        <button onclick="openAppointmentModal('${service.id}', '${service.name}', ${service.price})" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition cursor-pointer">
                            Select an Appointment
                        </button>
                    </div>
                `;
                servicesGrid.appendChild(card);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // 2. Randevu Seçim Modalı Açma
    window.openAppointmentModal = (id, name, price) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first to schedule an appointment!');
            window.location.href = 'auth.html';
            return;
        }

        selectedService = { id, name, price };
        selectedTime = null;
        modalTitle.innerText = name;
        modalPrice.innerText = `${price} TL`;
        appointmentDateInput.value = '';
        timeSlotsGrid.innerHTML = '<p class="text-xs text-slate-400 col-span-3">Please select a date first.</p>';
        modal.classList.remove('hidden');
    };

    // 3. Tarih Seçildiğinde Dolu Saatleri Kontrol Etme
    // Frontend/js/main.js içindeki ilgili alanı bu mantıkla güncelle:
if (appointmentDateInput) {
    appointmentDateInput.addEventListener('change', async () => {
        const date = appointmentDateInput.value;
        if (!date) return;

        try {
            const response = await fetch(`${APPOINTMENT_URL}/occupied?date=${date}`);
            const occupiedTimes = await response.json();

            timeSlotsGrid.innerHTML = '';
            selectedTime = null;

            // Geçmiş saatleri kontrol etmek için şimdiki zamanı alıyoruz
            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];
            const currentHourStr = now.toTimeString().split(' ')[0].substring(0, 5); // Örn: "15:51"

            workingHours.forEach(hour => {
                const btn = document.createElement('button');
                btn.innerText = hour;
                btn.className = 'p-2 text-sm font-medium border rounded-lg text-center transition cursor-pointer ';
                
                // Kural 1: Saat veritabanında dolu mu?
                const isOccupied = occupiedTimes.includes(hour);
                
                // Kural 2: Seçilen gün bugünse ve döngüdeki saat şu anki zamandan geride mi kalmış?
                const isPastHour = (date === todayStr && hour < currentHourStr);

                if (isOccupied || isPastHour) {
                    // İki durumdan biri geçerliyse butonu kırmızı yap ve kilitle
                    btn.className += 'bg-red-50 text-red-400 border-red-100 cursor-not-allowed';
                    btn.disabled = true;
                } else {
                    btn.className += 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50';
                    btn.onclick = () => {
                        document.querySelectorAll('#time-slots-grid button:not(:disabled)').forEach(b => {
                            b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
                            b.classList.add('bg-slate-50', 'text-slate-700');
                        });
                        btn.classList.remove('bg-slate-50', 'text-slate-700');
                        btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
                        selectedTime = hour;
                    };
                }
                timeSlotsGrid.appendChild(btn);
            });
        } catch (error) {
            console.error(error);
        }
    });
}

    // 4. Randevuyu Onaylama ve Sunucuya Gönderme
    if (btnConfirm) {
        btnConfirm.addEventListener('click', async () => {
            const date = appointmentDateInput.value;
            const customerEmail = localStorage.getItem('userEmail') || 'musteri@gmail.com';

            if (!date || !selectedTime) {
                alert('Please complete your date and time selection!');
                return;
            }

            try {
                const response = await fetch(APPOINTMENT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        serviceId: selectedService.id,
                        serviceName: selectedService.name,
                        price: selectedService.price,
                        date,
                        time: selectedTime,
                        customerEmail
                    })
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Appointment could not be scheduled.');

                alert('Congratulations! Your appointment has been successfully scheduled.');
                modal.classList.add('hidden');
            } catch (error) {
                alert(error.message);
            }
        });
    }
    // Frontend/js/main.js dosyasının en altına (fetchServices(); satırından hemen önce) ekle:
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Tarayıcıdaki token, email ve rol bilgilerini tamamen temizliyoruz
            localStorage.clear();
            alert('Your session has been successfully closed. We look forward to seeing you again.!');
            // Kullanıcıyı giriş sayfasına yönlendiriyoruz
            window.location.href = 'auth.html';
        });
    }
    if (btnSearch) btnSearch.addEventListener('click', fetchServices);
    if (sortSelect) sortSelect.addEventListener('change', fetchServices);
    fetchServices();
});