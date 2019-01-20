import jump from 'jump.js';

const navigation = document.querySelector('.header__navigation');
const jumpLinks = document.querySelectorAll('[data-jump]');

document.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !navigation.classList.contains('header__navigation--white')) {
        navigation.classList.add('header__navigation--white');
    }

    if (window.scrollY === 0) {
        navigation.classList.remove('header__navigation--white');
    }
});

[...jumpLinks].forEach(node => {
    node.addEventListener('click', event => {
        jump(event.target.dataset.jump, {
            offset: -(navigation.clientHeight)
        });
    });
});
