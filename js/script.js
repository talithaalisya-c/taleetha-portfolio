showWelcomePopup();

function showWelcomePopup() {
    let userName = prompt("Please enter your name:");
    if (userName !== null && userName.trim() !== '') {
        document.getElementById('welcome').innerHTML = userName;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.querySelector('#feedback form');
    const feedbackSection = document.getElementById('feedback');
    const resultsSection = document.getElementById('feedback-results');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const namaInput = document.getElementById('name-input').value;
        const tanggalLahirInput = document.getElementById('tanggal_lahir').value;
        const jenisKelaminElement = document.querySelector('input[name="gender"]:checked');
        const jenisKelaminInput = jenisKelaminElement ? jenisKelaminElement.value : 'Tidak dipilih';
        const pesanInput = document.getElementById('pesan').value;

        let formattedTanggalLahir = tanggalLahirInput;

        if (tanggalLahirInput) {
            const dateParts = tanggalLahirInput.split('-');
            if (dateParts.length === 3) {
                formattedTanggalLahir = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }
        }

        document.getElementById('display-nama').textContent = namaInput;
        document.getElementById('display-tanggal-lahir').textContent = formattedTanggalLahir;
        document.getElementById('display-jenis-kelamin').textContent = jenisKelaminInput;
        document.getElementById('display-pesan').textContent = pesanInput;

        document.getElementById('name-input').value = '';
        document.getElementById('tanggal_lahir').value = '';
        if (jenisKelaminElement) jenisKelaminElement.checked = false;
        document.getElementById('pesan').value = '';

        resultsSection.style.display = 'block'; 
        resultsSection.offsetWidth;
        resultsSection.style.transition = 'opacity 0.5s ease-in';
        resultsSection.style.opacity = '1';

        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    });

    const aosItems = document.querySelectorAll('.aos-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', '-translate-x-8', 'translate-x-8', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    aosItems.forEach(item => {
        observer.observe(item);
    });
});