import 'svgxuse';

if (!('objectFit' in document.documentElement.style)) {
    const images = document.querySelectorAll('[data-object-fit]');

    images.forEach(image => {
        const div = document.createElement('div');
        div.style.backgroundImage = `url(${image.src})`;
        div.style.backgroundSize = image.dataset.objectFit || 'cover';
        div.style.backgroundPosition = image.dataset.objectPosition || 'center';
        div.className = image.className;
        div.classList.add('object-fit-polyfilled');
        image.parentNode.insertBefore(div, image);
        image.style.display = 'none';
    });
}
