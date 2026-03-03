/**
 * Narong Rattanaphan Office - Scripts
 */

// --- Tailwind Configuration (Moved from HTML) ---
if (window.tailwind) {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    brand: {
                        light: '#fdf8f3',
                        accent: '#8b4513',
                        primary: '#78350f',
                        gold: '#d97706',
                        dark: '#2d1b0e',
                    },
                    darkBg: '#1a0f08',
                    darkCard: '#2d1b0e',
                    line: '#06C755',
                    facebook: '#1877F2',
                    youtube: '#FF0000'
                }
            }
        }
    };
}

// --- Elements ---
const modal = document.getElementById('contact-modal');
const modalContent = document.getElementById('modal-content');
const viewMain = document.getElementById('view-main');
const viewLine = document.getElementById('view-line');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const toast = document.getElementById('copy-toast');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// --- Mobile Menu ---
document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    if (isActive) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
    }
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuIcon.classList.replace('fa-times', 'fa-bars');
}

// --- Contact Modal Logic ---
function toggleModal() {
    if (modal.classList.contains('hidden')) {
        switchView('view-main');
        modal.classList.replace('hidden', 'flex');
        setTimeout(() => modalContent.classList.replace('modal-enter', 'modal-enter-active'), 10);
    } else {
        modalContent.classList.replace('modal-enter-active', 'modal-enter');
        setTimeout(() => modal.classList.replace('flex', 'hidden'), 300);
    }
}

function switchView(viewId) {
    if (viewId === 'view-line') {
        viewMain.classList.add('view-hidden');
        viewLine.classList.remove('view-hidden');
        modalTitle.innerText = "LINE Official";
        modalSubtitle.innerText = "สแกน QR Code หรือคัดลอก ID เพื่อเพิ่มเพื่อน";
    } else {
        viewLine.classList.add('view-hidden');
        viewMain.classList.remove('view-hidden');
        modalTitle.innerText = "ติดต่อเรา";
        modalSubtitle.innerText = "เลือกช่องทางที่คุณสะดวกเพื่อปรึกษาทนายความ";
    }
}

// --- Utilities ---
function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // Show Toast
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

// --- Theme Management ---
function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    if (themeToggleDarkIcon && themeToggleLightIcon) {
        themeToggleDarkIcon.classList.toggle('hidden', isDark);
        themeToggleLightIcon.classList.toggle('hidden', !isDark);
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

// Init Theme
if (localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
updateThemeIcons();

// Theme Events
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

// Close menu on resize if larger than mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
});