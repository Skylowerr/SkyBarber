const APPOINTMENT_URL = 'http://localhost:3000/api/appointments';

document.addEventListener('DOMContentLoaded', () => {
    const userDisplayEmail = document.getElementById('user-display-email');
    const appointmentsList = document.getElementById('my-appointments-list');

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    if (!token || !userEmail) {
        alert('Lütfen önce giriş yapın.');
        window.location.href = 'auth.html';
        return;
    }

    // Kullanıcı adını/epostasını karta yaz
    if (userDisplayEmail) {
        userDisplayEmail.innerText = userEmail;
    }

    // 1. Randevuları Firebase'den Çekip Basma
    async function fetchMyAppointments() {
        try {
            const response = await fetch(`${APPOINTMENT_URL}/my-appointments?email=${userEmail}`);
            const appointments = await response.json();

            appointmentsList.innerHTML = '';

            if (appointments.length === 0) {
                appointmentsList.innerHTML = `<p class="text-slate-400 text-center py-6 text-sm">Henüz aktif bir randevunuz bulunmuyor.</p>`;
                return;
            }

            const nowStr = new Date().toISOString().split('T')[0];

            appointments.forEach(app => {
                // Tarihi geçmiş mi kontrolü (Yaklaşan vs Tamamlandı rozeti için)
                const isPast = app.date < nowStr;
                const statusBadge = isPast 
                    ? `<span class="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">Tamamlandı</span>`
                    : `<span class="bg-indigo-50 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-full">Yaklaşan</span>`;

                // Eğer tarihi geçmişse İptal Et butonu görünmesin
                const actionButton = isPast 
                    ? '' 
                    : `<button onclick="cancelMyApp('${app.id}')" class="text-red-600 hover:text-red-700 font-semibold text-sm transition cursor-pointer">İptal Et</button>`;

                const card = document.createElement('div');
                card.className = 'bg-slate-50/60 p-5 rounded-xl border border-slate-100 flex justify-between items-center';
                card.innerHTML = `
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            ${statusBadge}
                        </div>
                        <h4 class="text-base font-bold text-slate-900">${app.serviceName}</h4>
                        <p class="text-xs text-slate-500 font-medium">Tarih: ${app.date} - Saat: ${app.time}</p>
                        <p class="text-xs font-semibold text-indigo-600">${app.price} TL</p>
                    </div>
                    <div>
                        ${actionButton}
                    </div>
                `;
                appointmentsList.appendChild(card);
            });

        } catch (error) {
            console.error(error);
            appointmentsList.innerHTML = `<p class="text-red-500 text-sm">Randevular yüklenirken hata oluştu.</p>`;
        }
    }

    // 2. Randevu İptal Etme İşlemi (Delete CRUD)
    window.cancelMyApp = async (id) => {
        if (!confirm('Bu randevuyu iptal etmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`${APPOINTMENT_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('İptal işlemi başarısız.');

            alert('Randevunuz başarıyla iptal edildi.');
            fetchMyAppointments(); // Listeyi tazele
        } catch (error) {
            alert(error.message);
        }
    };

    fetchMyAppointments();
});