import jump from 'jump.js';

const aside = document.querySelector('[data-sidebar-nav=aside]');
const content = document.querySelector('[data-sidebar-nav=content]');

if (aside && content) {
  document.addEventListener('mehrsprachigTranslated', () => {
    aside.innerHTML = '';

    const headings = content.querySelectorAll('.title');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const navItem = aside.querySelector(`[data-sidebar-nav-target='${entry.target.dataset.sidebarNavId}'`);

        if (entry.isIntersecting) {
          navItem.classList.add('sidebar-link--visible');
        } else {
          navItem.classList.remove('sidebar-link--visible');
        }
      });
    });

    const smoothScroll = event => {
      event.preventDefault();

      const scrollTarget = content.querySelector(`[data-sidebar-nav-id='${event.target.dataset.sidebarNavTarget}']`);
      jump(scrollTarget, {
        offset: -120
      });
    };

    headings.forEach((heading, index) => {
      const anchor = document.createElement('a');
      anchor.textContent = heading.textContent;
      anchor.classList.add('link');
      anchor.classList.add('sidebar-link');
      anchor.href = '#';
      anchor.dataset.sidebarNavTarget = index;
      anchor.addEventListener('click', smoothScroll);
      aside.append(anchor);
      heading.dataset.sidebarNavId = index;
      observer.observe(heading);
    });
  });
}
