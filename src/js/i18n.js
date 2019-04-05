import Mehrsprachig from 'mehrsprachig';

const mehrsprachig = new Mehrsprachig({
    language: 'de-ch',
    sources: {
        'de-ch': 'data/de.json',
        'fr-ch': 'data/fr.json',
        'it-ch': 'data/it.json',
        'en': 'data/en.json'
    }
});
const triggers = document.querySelectorAll('[data-mehrsprachig-switch]');
const setLanguage = event => {
    mehrsprachig.setLanguage(event.target.dataset.mehrsprachigSwitch);
    event.preventDefault();
};

[...triggers].forEach(trigger => {
    trigger.addEventListener('click', setLanguage);
})
