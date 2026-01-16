// --- 1. DEKLARASI ELEMEN ---
const envelopeTrigger = document.getElementById('envelope-trigger');
const movingCard = document.getElementById('moving-card');
const lagu = document.getElementById('mySong');

// Modal 1
const textModal = document.getElementById('text-modal');
const closeModalBtn = document.getElementById('close-modal');
const nextCardBtn = document.getElementById('next-card-btn'); 

// Modal 2
const textModal2 = document.getElementById('text-modal-2'); 
const closeModal2Btn = document.getElementById('close-modal-2'); 

// --- 2. FUNGSI HUJAN LOVE ---
function createHeart() {
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.top = '-20px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    heart.style.color = '#ff4757';
    heart.style.userSelect = 'none';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.innerHTML = '❤️';
    
    // Animasi jatuh
    const duration = Math.random() * 2 + 3;
    heart.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    
    document.body.appendChild(heart);

    // Jalankan animasi setelah element muncul
    setTimeout(() => {
        heart.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
    }, 100);

    // Hapus element setelah selesai
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Jalankan hujan love secara berkala
setInterval(createHeart, 300);


// --- 3. LOGIKA UTAMA (Klik Amplop) ---
envelopeTrigger.addEventListener('click', function() {
    movingCard.classList.add('fly-out');

    // Mainkan Lagu pas amplop diklik
    if (lagu) {
        lagu.play().catch(e => console.log("Musik butuh interaksi user"));
    }

    // Pastikan Modal 2 disembunyikan jika ada (untuk reset)
    textModal2.classList.remove('show'); 

    // Munculkan Modal 1 setelah kartu terbang
    setTimeout(() => {
        textModal.classList.add('show');
    }, 800); 
});


// --- 4. LOGIKA TOMBOL NEXT (Dari Modal 1 ke Modal 2) ---
// Note: Pastikan di HTML lu sudah ada id="next-card-btn" pada tombol di Modal 1
if (nextCardBtn) {
    nextCardBtn.addEventListener('click', function() {
        textModal.classList.remove('show');
        setTimeout(() => {
            textModal2.classList.add('show');
        }, 300); 
    });
}


// --- 5. LOGIKA TUTUP MODAL ---
closeModalBtn.addEventListener('click', function() {
    textModal.classList.remove('show');
    setTimeout(() => {
        movingCard.classList.remove('fly-out');
    }, 500);
});

if (closeModal2Btn) {
    closeModal2Btn.addEventListener('click', function() {
        textModal2.classList.remove('show');
        setTimeout(() => {
             movingCard.classList.remove('fly-out');
        }, 500);
    });
}


// --- 6. LOGIKA TOMBOL "GAK MAU" KABUR ---
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function proses(e) {
    if (e.value === "tidak") {
        const button = e;
        const modalContent = button.closest('.modal-content');
        
        const modalWidth = modalContent.offsetWidth;
        const modalHeight = modalContent.offsetHeight;
        
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        const padding = 20;

        let newX = getRandomNumber(padding, modalWidth - buttonWidth - padding);
        let newY = getRandomNumber(padding, modalHeight - buttonHeight - padding);
        
        button.style.position = 'absolute'; // Pastikan absolute biar bisa pindah di dalem modal
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
        button.style.right = 'unset';
        button.style.bottom = 'unset';
    }
}
