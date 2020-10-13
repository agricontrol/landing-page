const trigger = document.querySelector('.header__link--mobile-nav');
const navigation = document.querySelector('.header__navigation');

const toggleMobileNav = event => {
  navigation.classList.toggle('header__navigation--translated');
  event.preventDefault();
};

trigger.addEventListener('click', toggleMobileNav);
