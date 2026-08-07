const heroSection = document.querySelector('.hero');

const callBtn = document.querySelector('.header-call-btn');
const callBtnOriginalParent = callBtn ? callBtn.parentElement : null;
const callBtnOriginalNext = callBtn ? callBtn.nextElementSibling : null;
const callBtnMobileQuery = window.matchMedia('(max-width: 900px)');

function updateCallBtnPlacement() {
    if (!callBtn || !callBtnOriginalParent) return;
    if (callBtnMobileQuery.matches) {
        if (callBtn.parentElement !== document.body) {
            document.body.appendChild(callBtn);
        }
    } else if (callBtn.parentElement !== callBtnOriginalParent) {
        if (callBtnOriginalNext && callBtnOriginalNext.parentElement === callBtnOriginalParent) {
            callBtnOriginalParent.insertBefore(callBtn, callBtnOriginalNext);
        } else {
            callBtnOriginalParent.appendChild(callBtn);
        }
    }
}

updateCallBtnPlacement();
if (callBtnMobileQuery.addEventListener) {
    callBtnMobileQuery.addEventListener('change', updateCallBtnPlacement);
} else if (callBtnMobileQuery.addListener) {
    callBtnMobileQuery.addListener(updateCallBtnPlacement);
}

function scheduleAutoDealsPopup() {
    if (sessionStorage.getItem('hammerDealsAutoShown')) return;
    setTimeout(() => {
        if (sessionStorage.getItem('hammerDealsAutoShown')) return;
        sessionStorage.setItem('hammerDealsAutoShown', '1');
        if (typeof openDealsPopup === 'function') openDealsPopup();
    }, 10000);
}

if (heroSection) {
    scheduleAutoDealsPopup();
}

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

const headerDeals = document.querySelector('.header-deals');
const dealsPopup = document.getElementById('deals-popup');

function openDealsPopup() {
    if (!dealsPopup) return;
    dealsPopup.classList.add('is-open');
    dealsPopup.setAttribute('aria-hidden', 'false');
    if (headerDeals) {
        headerDeals.classList.add('is-hidden');
        headerDeals.setAttribute('aria-expanded', 'true');
    }
}

function closeDealsPopup() {
    if (!dealsPopup) return;
    dealsPopup.classList.remove('is-open');
    dealsPopup.setAttribute('aria-hidden', 'true');
    if (headerDeals) {
        headerDeals.classList.remove('is-hidden');
        headerDeals.setAttribute('aria-expanded', 'false');
    }
}

if (headerDeals) {
    headerDeals.addEventListener('click', openDealsPopup);
}

if (dealsPopup) {
    dealsPopup.querySelectorAll('[data-popup-close]').forEach((el) => {
        el.addEventListener('click', closeDealsPopup);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dealsPopup.classList.contains('is-open')) {
            closeDealsPopup();
        }
    });
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const galleryTrack = document.querySelector('.gallery-track');
const galleryPrev = document.querySelector('.gallery-btn.left');
const galleryNext = document.querySelector('.gallery-btn.right');

function scrollGalleryBy(direction) {
    if (!galleryTrack) return;
    const amount = Math.max(240, Math.floor(galleryTrack.clientWidth * 0.85));
    galleryTrack.scrollBy({ left: direction * amount, behavior: 'smooth' });
}

if (galleryPrev && galleryNext && galleryTrack) {
    galleryPrev.addEventListener('click', () => scrollGalleryBy(-1));
    galleryNext.addEventListener('click', () => scrollGalleryBy(1));
}

document.querySelectorAll('.why-card-toggle, .why-card-tab').forEach((el) => {
    el.addEventListener('click', () => {
        const card = el.closest('.why-card');
        if (!card) return;
        const isOpen = card.classList.toggle('is-open');
        const cardToggle = card.querySelector('.why-card-toggle');
        if (cardToggle) cardToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
});

function sizeWhyPanels() {
    const desktop = window.matchMedia('(min-width: 900px)').matches;
    document.querySelectorAll('#why .why-card').forEach((card) => {
        if (!desktop) {
            card.style.removeProperty('--why-panel-text-w');
            return;
        }
        const row = card.getBoundingClientRect().width;
        const toggle = card.querySelector('.why-card-toggle');
        const tab = card.querySelector('.why-card-tab');
        const used = (toggle ? toggle.getBoundingClientRect().width : 0) + (tab ? tab.getBoundingClientRect().width : 0);
        card.style.setProperty('--why-panel-text-w', Math.max(120, Math.floor(row - used)) + 'px');
    });
}

sizeWhyPanels();

const heroTestimonials = document.querySelectorAll('.hero-testimonials .hero-testimonial');
if (heroTestimonials.length > 1) {
    let testimonialIndex = Math.max(0, [...heroTestimonials].findIndex((el) => el.classList.contains('is-active')));
    setInterval(() => {
        heroTestimonials[testimonialIndex].classList.remove('is-active');
        testimonialIndex = (testimonialIndex + 1) % heroTestimonials.length;
        heroTestimonials[testimonialIndex].classList.add('is-active');
    }, 5000);
}

function fitHeroTestimonialText() {
    document.querySelectorAll('.hero-testimonials .hero-testimonial').forEach((card) => {
        const p = card.querySelector('p');
        if (!p) return;
        const cardRect = card.getBoundingClientRect();
        if (!cardRect.height) return;
        const paddingBottom = parseFloat(getComputedStyle(card).paddingBottom) || 0;
        const available = cardRect.bottom - paddingBottom - p.getBoundingClientRect().top;
        const lineHeight = parseFloat(getComputedStyle(p).lineHeight) || 22;
        p.style.webkitLineClamp = String(Math.max(1, Math.floor(available / lineHeight)));
    });
}

fitHeroTestimonialText();
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitHeroTestimonialText);
}

let lastMeasuredWidth = window.innerWidth;
let resizeMeasureTimer = null;
window.addEventListener('resize', () => {
    if (window.innerWidth === lastMeasuredWidth) return;
    clearTimeout(resizeMeasureTimer);
    resizeMeasureTimer = setTimeout(() => {
        lastMeasuredWidth = window.innerWidth;
        sizeWhyPanels();
        fitHeroTestimonialText();
    }, 150);
});

const elfsightContainer = document.querySelector('[class*="elfsight-app-"]');
if (elfsightContainer) {
    const hideWidgetTitle = () => {
        const walker = document.createTreeWalker(elfsightContainer, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node.textContent.trim() === 'Customer Testimonials') {
                const el = node.parentElement;
                if (el && el.textContent.trim() === 'Customer Testimonials') {
                    el.style.display = 'none';
                    return true;
                }
            }
        }
        return false;
    };
    if (!hideWidgetTitle()) {
        const titleObserver = new MutationObserver(() => {
            if (hideWidgetTitle()) titleObserver.disconnect();
        });
        titleObserver.observe(elfsightContainer, { childList: true, subtree: true });
    }
}
