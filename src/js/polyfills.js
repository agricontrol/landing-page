import 'svgxuse';
import 'mdn-polyfills/NodeList.prototype.forEach';

if (!('objectFit' in document.documentElement.style)) {
    const images = document.querySelectorAll('[data-object-fit]');

    images.forEach(image => {
        const div = document.createElement('div');
        div.style.backgroundImage = `url(${image.src})`;
        div.style.backgroundSize = image.dataset.objectFit || 'cover';
        div.style.backgroundPosition = image.dataset.objectPosition || 'center';
        div.classList.add('object-fit-polyfilled');
        image.classList.forEach(name => {
            div.classList.add(name);
        });
        image.parentNode.insertBefore(div, image);
        image.style.display = 'none';
    });
}
