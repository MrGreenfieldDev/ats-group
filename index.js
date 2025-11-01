const burgerMenu = document.querySelector('#burger-menu');
const navMenu = document.querySelector('#nav-menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('burger-change');
    navMenu.classList.toggle('nav-active');
});

