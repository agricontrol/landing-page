import Mehrsprachig from 'mehrsprachig';

const triggers = document.querySelectorAll('[data-mehrsprachig-switch]');

const mehrsprachig = new Mehrsprachig({
    language: 'de-ch',
    sources: {
        'de-ch': 'data/de.json',
        'fr-ch': 'data/fr.json',
        'it-ch': 'data/it.json',
        'en': 'data/en.json'
    }
});

const setLanguage = event => {
    mehrsprachig.setLanguage(event.target.dataset.mehrsprachigSwitch);
    document.documentElement.setAttribute('lang', event.target.dataset.mehrsprachigSwitch);
    event.preventDefault();
};

triggers.forEach(trigger => {
    trigger.addEventListener('click', setLanguage);
});
