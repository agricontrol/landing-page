const linkLogo = document.querySelector('.header__link--logo');
const navigation = linkLogo.closest('.header__navigation');

const toggleMobileNav = () => {
    if (matchMedia('(max-width: 1023px)')) {
        navigation.classList.toggle('header__navigation--translated');
    }
};

linkLogo.addEventListener('click', toggleMobileNav);
