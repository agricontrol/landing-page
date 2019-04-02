import jump from 'jump.js';
import './polyfills';

const navigation = document.querySelector('.header__navigation');
const jumpLinks = document.querySelectorAll('[data-jump]');
const scrollToNode = event => {
    jump(event.target.dataset.jump);
    navigation.classList.remove('header__navigation--translated');
    event.preventDefault();
};

document.addEventListener('scroll', () => {
    if (!navigation.classList.contains('header__navigation--white') && window.scrollY > 0) {
        navigation.classList.add('header__navigation--white');
    }

    if (window.scrollY === 0) {
        navigation.classList.remove('header__navigation--white');
    }
});

[...jumpLinks].forEach(node => {
    node.addEventListener('click', scrollToNode);
});

import './i18n';
import './mobileNav';
