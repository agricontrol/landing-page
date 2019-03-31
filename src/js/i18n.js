import Mehrsprachig from 'mehrsprachig';

const instance = new Mehrsprachig({
    sources: {
        'de-ch': '/data/de.json',
        'fr-ch': '/data/fr.json',
        'it-ch': '/data/it.json',
        'en': '/data/en.json'
    }
});

window.mehrsprachig = instance;
