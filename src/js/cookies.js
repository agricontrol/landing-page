const acceptsCookies = localStorage.getItem('acceptsCookies');
const banner = document.querySelector('.cookie-banner');
const button = banner.querySelector('.cookie-banner__button');

const deleteBanner = () => {
    banner.parentNode.removeChild(banner);
};

const fadeOutBanner = () => {
    banner.classList.add('cookie-banner--invisible');

    banner.addEventListener('transitionend', () => {
        deleteBanner();
    });

    localStorage.setItem('acceptsCookies', 'true');
}

const fadeInBanner = () => {
    setTimeout(() => {
        banner.classList.remove('cookie-banner--invisible');
    }, 500);
}

if (acceptsCookies) {
    deleteBanner();
} else {
    button.addEventListener('click', fadeOutBanner);

    fadeInBanner();
}
