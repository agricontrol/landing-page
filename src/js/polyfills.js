import 'mdn-polyfills/Node.prototype.remove';
import 'mdn-polyfills/Node.prototype.replaceWith';
import 'mdn-polyfills/NodeList.prototype.forEach';
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
    image.replaceWith(div);
  });
}
