/* nav.js: hamburger menu + penanda menu aktif */
(function () {
    var nav = document.querySelector('.navbar');
    var box = document.querySelector('.nav-container');
    var list = document.querySelector('.nav-links');
    if (!nav || !box || !list) return;

    /* Tombol hamburger */
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Buka menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    box.appendChild(btn);

    function setOpen(open) {
        nav.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', String(open));
    }

    btn.addEventListener('click', function () {
        setOpen(!nav.classList.contains('menu-open'));
    });

    /* Tutup menu setelah pilih link, tekan Esc, atau layar melebar */
    list.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 960) setOpen(false);
    });

    /* Menu aktif sesuai posisi scroll */
    var links = Array.prototype.slice.call(list.querySelectorAll('a'));

    function updateActive() {
        var current = links[0];
        links.forEach(function (a) {
            var sec = document.querySelector(a.getAttribute('href'));
            if (sec && sec.getBoundingClientRect().top <= 120) current = a;
        });
        links.forEach(function (a) {
            a.classList.toggle('active', a === current);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();