const LOCALSTORAGE_KEY = 'lectures';
const Store = window.localStorage;

export function load() {
  const data = Store.getItem(LOCALSTORAGE_KEY);
  return JSON.parse(data);
}

export function save(slug) {
  const data = slug;

  console.log('DATA==', data);
  let slugs = load();
  if (slugs && slugs.length > 0) {
    slugs.push(data);
  } else {
    slugs = [data];
  }
  Store.setItem(LOCALSTORAGE_KEY, JSON.stringify(slugs));
}

export function clear() {
  Store.removeItem(LOCALSTORAGE_KEY);
}
