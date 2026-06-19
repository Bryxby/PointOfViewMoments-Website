// ── Scroll reveal ─────────────────────────────────────────────────────────
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

function addReveal(el, from) {
  if (!el) return;
  el.classList.add('reveal');
  if (from) el.classList.add('reveal--from-' + from);
  revealObserver.observe(el);
}

// ── Portfolio folder switching ─────────────────────────────────────────────
function switchFolder(folderId) {
  document.querySelectorAll('.folder-panel').forEach(function(p) { p.hidden = true; });
  var panel = document.getElementById('folder-' + folderId);
  if (panel) panel.hidden = false;
  document.querySelectorAll('[data-folder-tab]').forEach(function(tab) {
    tab.classList.toggle('folder-chip--active', tab.dataset.folderTab === folderId);
  });
}

// ── Lightbox ───────────────────────────────────────────────────────────────
var lightboxImages = [];
var lightboxIndex  = 0;

function openLightbox(src, caption) {
  lightboxImages = [];
  document.querySelectorAll('.frame').forEach(function(frame) {
    var imgEl = frame.querySelector('.frame__image');
    var capEl = frame.querySelector('.frame__caption');
    if (imgEl) lightboxImages.push({ src: imgEl.getAttribute('src'), caption: capEl ? capEl.textContent : '' });
  });
  if (lightboxImages.length === 0) lightboxImages = [{ src: src, caption: caption || '' }];
  lightboxIndex = 0;
  for (var i = 0; i < lightboxImages.length; i++) {
    if (lightboxImages[i].src === src) { lightboxIndex = i; break; }
  }
  renderLightbox();
  document.getElementById('lightbox').hidden = false;
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  var item = lightboxImages[lightboxIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-img').alt = item.caption || 'Photograph';
  var cap = document.getElementById('lightbox-caption');
  cap.textContent = item.caption || '';
  cap.hidden = !item.caption;
  document.getElementById('lightbox-prev').hidden = (lightboxIndex === 0);
  document.getElementById('lightbox-next').hidden = (lightboxIndex === lightboxImages.length - 1);
}

function lightboxPrev() { if (lightboxIndex > 0) { lightboxIndex--; renderLightbox(); } }
function lightboxNext() { if (lightboxIndex < lightboxImages.length - 1) { lightboxIndex++; renderLightbox(); } }

function closeLightbox() {
  var lb = document.getElementById('lightbox');
  if (lb) lb.hidden = true;
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

// ── Page init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {

  // Phone number auto-format
  var phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      var digits = e.target.value.replace(/\D/g, '').slice(0, 10);
      var formatted = '';
      if (digits.length > 0) formatted = '(' + digits.slice(0, 3);
      if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
      if (digits.length >= 7) formatted += '-' + digits.slice(6, 10);
      e.target.value = formatted;
    });
  }

  // Mobile nav hamburger
  var hamburger = document.getElementById('nav-hamburger');
  var navLinksEl = document.querySelector('.nav__links');
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', function() {
      var open = navLinksEl.classList.toggle('nav--open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinksEl.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinksEl.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav__inner')) {
        navLinksEl.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Nav active state from URL
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(function(el) {
    el.classList.toggle('nav__link--active', el.dataset.page === page);
  });

  // Portfolio: restore folder from URL param
  if (document.querySelector('.folder-bar')) {
    var params = new URLSearchParams(window.location.search);
    switchFolder(params.get('folder') || 'weddings');
  }

  // Gallery reel — What We Do slideshow
  var reelA = document.getElementById('reel-slide-a');
  var reelB = document.getElementById('reel-slide-b');
  if (reelA && reelB) {
    var reelPhotos = [
      { src: "public/photos/The Taylors Wedding/Lean Back.jpg",        label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Side by Side.jpg",     label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Seeing Her.jpg",       label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/First Kiss.jpg",       label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/First dance2.jpg",     label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/first walk-2.jpg",     label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Holding Hands.jpg",    label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Wife Ring-1.jpg",      label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Mirror Look.jpg",      label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/bride.jpg",            label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Buttons.jpg",          label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Cake Bite.jpg",        label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Groom cakesmash .jpg", label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Head of table.jpg",    label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/babybump.jpg",         label: "Weddings" },
      { src: "public/photos/The Taylors Wedding/Welcome.jpg",          label: "Weddings" },
      { src: "public/photos/Harley Stunt Show/Bagger Wheelie.jpg",     label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Burnout.jpg",            label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Crowd Work.jpg",         label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Fire Burnout.jpg",       label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Fire Wheelie.jpg",       label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Jump.jpg",               label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Stare.jpg",              label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Wave.jpg",               label: "Events"   },
      { src: "public/photos/Harley Stunt Show/Wheelie.jpg",            label: "Events"   },
      { src: "public/photos/Honey White/bass.jpg",                     label: "Events"   },
      { src: "public/photos/Honey White/bass2.jpg",                    label: "Events"   },
      { src: "public/photos/Honey White/Donny.jpg",                    label: "Events"   },
      { src: "public/photos/Honey White/drummer.jpg",                  label: "Events"   },
      { src: "public/photos/Honey White/guitardrum.jpg",               label: "Events"   },
      { src: "public/photos/Honey White/honeywhite.jpg",               label: "Events"   },
      { src: "public/photos/Honey White/jamming.jpg",                  label: "Events"   },
      { src: "public/photos/Honey White/jamming2.jpg",                 label: "Events"   },
      { src: "public/photos/Honey White/sing.jpg",                     label: "Events"   },
      { src: "public/photos/Honey White/sing2.jpg",                    label: "Events"   },
      { src: "public/photos/Honey White/sing3.jpg",                    label: "Events"   },
      { src: "public/photos/Honey White/stage.jpg",                    label: "Events"   }
    ];

    for (var ri = reelPhotos.length - 1; ri > 0; ri--) {
      var rj = Math.floor(Math.random() * (ri + 1));
      var rt = reelPhotos[ri]; reelPhotos[ri] = reelPhotos[rj]; reelPhotos[rj] = rt;
    }

    var reelIdx = 0;
    var reelActiveSlide = 'a';
    var reelLabelEl = document.getElementById('reel-label');
    var reelProgressEl = document.getElementById('reel-progress');
    var reelTimer;

    function showReelPhoto(idx) {
      var photo = reelPhotos[idx];
      var nextEl = reelActiveSlide === 'a' ? reelB : reelA;
      var currEl = reelActiveSlide === 'a' ? reelA : reelB;
      nextEl.style.backgroundImage = "url('" + photo.src + "')";
      nextEl.classList.add('reel-active');
      currEl.classList.remove('reel-active');
      if (reelLabelEl) reelLabelEl.textContent = photo.label;
      if (reelProgressEl) {
        reelProgressEl.classList.remove('reel-running');
        void reelProgressEl.offsetWidth;
        reelProgressEl.classList.add('reel-running');
      }
      reelActiveSlide = reelActiveSlide === 'a' ? 'b' : 'a';
    }

    function advanceReel() {
      reelIdx = (reelIdx + 1) % reelPhotos.length;
      showReelPhoto(reelIdx);
    }

    reelA.style.backgroundImage = "url('" + reelPhotos[0].src + "')";
    reelA.classList.add('reel-active');
    if (reelLabelEl) reelLabelEl.textContent = reelPhotos[0].label;
    if (reelProgressEl) reelProgressEl.classList.add('reel-running');

    reelTimer = setInterval(advanceReel, 3000);

    var reelPrevBtn = document.getElementById('reel-prev');
    var reelNextBtn = document.getElementById('reel-next');
    if (reelPrevBtn) {
      reelPrevBtn.addEventListener('click', function() {
        reelIdx = (reelIdx - 1 + reelPhotos.length) % reelPhotos.length;
        showReelPhoto(reelIdx);
        clearInterval(reelTimer);
        reelTimer = setInterval(advanceReel, 3000);
      });
    }
    if (reelNextBtn) {
      reelNextBtn.addEventListener('click', function() {
        reelIdx = (reelIdx + 1) % reelPhotos.length;
        showReelPhoto(reelIdx);
        clearInterval(reelTimer);
        reelTimer = setInterval(advanceReel, 3000);
      });
    }
  }

  // Scroll reveals
  document.querySelectorAll('.section__marker').forEach(function(el) { addReveal(el); });
  document.querySelectorAll('.feature-card').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = (i * 0.12) + 's';
  });
  document.querySelectorAll('.split__text').forEach(function(el) { addReveal(el, 'left'); });
  document.querySelectorAll('.split__image').forEach(function(el) { addReveal(el, 'right'); });
  document.querySelectorAll('.section--cta > *').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = (i * 0.1) + 's';
  });
  document.querySelectorAll('.page-title, .page-intro').forEach(function(el) { addReveal(el); });
  document.querySelectorAll('.folder-bar').forEach(function(el) { addReveal(el); });
  document.querySelectorAll('.album-card').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = (i * 0.1) + 's';
  });
  document.querySelectorAll('.pkg-card').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = (i * 0.14) + 's';
  });
  document.querySelectorAll('.disclaimer').forEach(function(el) { addReveal(el); });
  document.querySelectorAll('.frame').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = ((i % 3) * 0.1) + 's';
  });
  document.querySelectorAll('.bio-layout__image').forEach(function(el) { addReveal(el, 'left'); });
  document.querySelectorAll('.bio-headline, .bio-paragraph-wrap, .bio-contact').forEach(function(el, i) {
    addReveal(el); el.style.transitionDelay = (i * 0.1) + 's';
  });
});
