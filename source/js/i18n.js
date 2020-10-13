import mehrsprachig from 'mehrsprachig';

mehrsprachig({
  standard: 'de-ch',
  sources: {
    'de-ch': '/data/de.json',
    'fr-ch': '/data/fr.json',
    'it-ch': '/data/it.json',
    en: '/data/en.json'
  }
});
