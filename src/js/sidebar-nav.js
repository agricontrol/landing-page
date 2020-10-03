import jump from 'jump.js';

const aside = document.querySelector('[data-sidebar-nav=aside]');
const content = document.querySelector('[data-sidebar-nav=content]');

if (aside && content) {
  const headings = content.querySelectorAll('.title');

  const smoothScroll = event => {
    event.preventDefault();

    const scrollTarget = content.querySelector(`[data-sidebar-nav-id='${event.target.dataset.sidebarNavTarget}']`);
    jump(scrollTarget, {
      offset: -120
    });
  };

  headings.forEach((heading, i) => {
    const anchor = document.createElement('a');
    anchor.textContent = heading.textContent;
    anchor.classList.add('link');
    anchor.classList.add('sidebar-link');
    anchor.href = '#';
    anchor.dataset.sidebarNavTarget = i;
    anchor.addEventListener('click', smoothScroll);
    aside.append(anchor);
    heading.dataset.sidebarNavId = i;
  });
}
