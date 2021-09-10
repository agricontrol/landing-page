import jump from 'jump.js';

const header = document.querySelector('.header');
const navigation = header.querySelector('.header__navigation');
const jumpLinks = document.querySelectorAll('[data-jump]');

const scrollToNode = event => {
  const offset = window.matchMedia('(max-width: 1023px)').matches ? navigation.clientHeight / 5 : navigation.clientHeight;

  jump(event.target.dataset.jump, {
    offset: -offset
  });

  navigation.classList.remove('header__navigation--translated');
  event.preventDefault();
};

const cameFromAnotherPageWithHash = () => {
  if (location.hash) {
    const section = `[data-${location.hash.slice(1)}-anchor]`;
    jump(section);
    location.hash = '';
  }
};

document.addEventListener('scroll', () => {
  if (!navigation.classList.contains('header__navigation--white') && window.pageYOffset > 0) {
    navigation.classList.add('header__navigation--white');
  }

  if (window.pageYOffset === 0 && !header.classList.contains('header--compact')) {
    navigation.classList.remove('header__navigation--white');
  }
});

window.addEventListener('load', cameFromAnotherPageWithHash);

jumpLinks.forEach(node => {
  node.addEventListener('click', scrollToNode);
});
