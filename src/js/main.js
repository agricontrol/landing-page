import jump from 'jump.js';

const navigation = document.querySelector('.header__navigation');
const linkLogo = navigation.querySelector('.header__link--logo');
const jumpLinks = document.querySelectorAll('[data-jump]');

document.addEventListener('scroll', () => {
    if (!navigation.classList.contains('header__navigation--white') && window.scrollY > 0) {
        navigation.classList.add('header__navigation--white');
    }

    if (window.scrollY === 0) {
        navigation.classList.remove('header__navigation--white');
    }
});

[...jumpLinks].forEach(node => {
    node.addEventListener('click', event => {
        if (!event.target.isSameNode(linkLogo) && !matchMedia('(max-width: 1023px)').matches) {
            jump(event.target.dataset.jump, {
                offset: -(navigation.clientHeight)
            });
        }

        event.preventDefault();
    });
});

import './mobileNav';
