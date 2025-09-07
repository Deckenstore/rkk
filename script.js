// === GLOBAL TELEGRAM VARIABLES ===
const BOT_TOKEN = "8395409475:AAGmW0gwHLfF_2fMqrvJTjHEUE5T1APMEFs";
const CHAT_ID = "7902319282";

// === MENU TOGGLE ===
function toggleMenu(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.menu-toggle');
    if (navMenu?.classList.contains('show') && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// === FLIP CARDS ===
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// === DRAGGABLE WHATSAPP BUTTON ===
const whatsappBtn = document.getElementById('whatsappButton');
if (whatsappBtn) {
    let isDragging = false, offsetX = 0, offsetY = 0;

    function startDrag(e) {
        isDragging = true;
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - whatsappBtn.getBoundingClientRect().left;
        offsetY = clientY - whatsappBtn.getBoundingClientRect().top;
        whatsappBtn.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        let x = clientX - offsetX;
        let y = clientY - offsetY;
        x = Math.max(0, Math.min(x, window.innerWidth - whatsappBtn.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - whatsappBtn.offsetHeight));
        whatsappBtn.style.left = x + 'px';
        whatsappBtn.style.top = y + 'px';
        whatsappBtn.style.bottom = 'auto';
        whatsappBtn.style.right = 'auto';
    }

    function stopDrag() {
        isDragging = false;
        whatsappBtn.style.cursor = 'grab';
    }

    whatsappBtn.addEventListener('mousedown', startDrag);
    whatsappBtn.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

// === FADE-IN SECTIONS ===
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// === BOOKING & CONTACT FORM TOGGLE ===
const reservationSection = document.getElementById('reservation');
const contactSection = document.getElementById('contact');

if (reservationSection) reservationSection.style.display = 'none';
if (contactSection) contactSection.style.display = 'none';

document.getElementById('bookTableBtn')?.addEventListener('click', () => {
    if (reservationSection) reservationSection.style.display = 'block';
    if (contactSection) contactSection.style.display = 'none';

    const dateInput = reservationSection.querySelector('input[type="date"]');
    const timeInput = reservationSection.querySelector('input[type="time"]');
    if (dateInput && !dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
    if (timeInput && !timeInput.value) timeInput.value = "19:00";

    reservationSection?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactBtn')?.addEventListener('click', () => {
    if (contactSection) contactSection.style.display = 'block';
    if (reservationSection) reservationSection.style.display = 'none';

    contactSection?.scrollIntoView({ behavior: 'smooth' });
});

// === BOOKING FORM TO TELEGRAM ONLY ===
const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = bookingForm.querySelector('input[placeholder="Your Name"]').value;
    const email = bookingForm.querySelector('input[placeholder="Email"]').value;
    const phone = bookingForm.querySelector('input[placeholder="Phone Number"]').value;
    const date = bookingForm.querySelector('input[type="date"]').value;
    const time = bookingForm.querySelector('input[type="time"]').value;
    const guests = bookingForm.querySelector('select').value;
    const request = bookingForm.querySelector('textarea').value;

    const message = `🪑 New Table Booking:\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n📅 Date: ${date}\n⏰ Time: ${time}\n👥 Guests: ${guests}\n📝 Requests: ${request}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message })
        });
        alert("✅ Table booked successfully!");
        bookingForm.reset();
    } catch (err) {
        console.error("Telegram Error:", err);
        alert("❌ Failed to send booking. Try again.");
    }
});

// === CONTACT FORM TO TELEGRAM ONLY ===
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    const telegramMsg = `📩 New Contact:\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMsg })
        });
        alert("✅ Message sent successfully!");
        contactForm.reset();
    } catch (err) {
        console.error("Contact Telegram Error:", err);
        alert("❌ Failed to send message.");
    }
});

// === VISIT US BUTTON - GOOGLE MAPS OPEN ===
document.getElementById('visitBtn')?.addEventListener('click', () => {
    window.open("https://www.google.com/maps?q=Rana+Khana+Khajana+Delhi", "_blank");
});