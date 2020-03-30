const acceptsCookies = localStorage.getItem('acceptsCookies');
const banner = document.querySelector('.cookie-banner');
const button = banner.querySelector('.button');

const deleteBanner = () => {
    banner.parentNode.removeChild(banner);
};

const fadeOutBanner = event => {
    event.preventDefault();

    banner.classList.add('cookie-banner--invisible');
    banner.addEventListener('transitionend', () => {
        deleteBanner();
    });

    localStorage.setItem('acceptsCookies', 'true');
};

const fadeInBanner = () => {
    setTimeout(() => {
        banner.classList.remove('cookie-banner--invisible');
    }, 500);
};

if (acceptsCookies) {
    deleteBanner();
} else {
    button.addEventListener('click', fadeOutBanner);
    fadeInBanner();
}
