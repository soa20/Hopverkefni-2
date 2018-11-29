const LOCALSTORAGE_KEY = 'lectures';

export function load() {
  return localStorage.getItem(LOCALSTORAGE_KEY) || false;
}

export function save(data) {
  let slugs = load();
  slugs = slugs ? slugs.split(',') : [];

  if (slugs.length > 0) {
    if (!slugs.includes(data)) {
      slugs.push(data);
      localStorage.setItem(LOCALSTORAGE_KEY, slugs.toString());
    } else {
      console.log('Slug Exists, do nothing');
    }
  } else {
    localStorage.setItem(LOCALSTORAGE_KEY, [data].toString());
  }
}

export function unSave(data) {
  let slugs = load();
  slugs = slugs ? slugs.split(',') : [];
  if (slugs && slugs.indexOf(data) >= 0) {
    slugs.splice(slugs.indexOf(data), 1);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, slugs.toString());
}

export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
