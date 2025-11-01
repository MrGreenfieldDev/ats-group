document.addEventListener("DOMContentLoaded", () => {

    const burgerMenu = document.querySelector('#burger-menu');
    const navMenu = document.querySelector('#nav-menu');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('burger-change');
        navMenu.classList.toggle('nav-active');
    });

    const serviceCards = document.querySelectorAll('.service-card[data-href]');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const href = card.getAttribute('data-href');
            if (href === "#telecommunications-surveys" || href === "#panoramic-surveys") {
                window.location.href = "services.html#telecom-pano-surveys";
            } else if (href === "#bespoke-builds" || href === "#prototyping") {
                window.location.href = "services.html#bespoke-prototype";
            } else {
                window.location.href = "services.html" + href;
            }
        });
    });
});
