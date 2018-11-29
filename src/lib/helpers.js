import {
  save,
  unSave,
  load
} from './storage';

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);
  for (let child of children) { /* eslint-disable-line */
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  }
  return element;
}

export function isRead(slug) {
  const lectures = load();
  const isLectureRead = (lectures) ? lectures.indexOf(slug) > -1 : false;
  return isLectureRead;
}

export function markRead(e) {
  const et = e.target;
  const etVal = et.attributes.data.value;
  e.preventDefault();
  et.classList.toggle('marked');

  if (et.classList.contains('marked')) {
    save(etVal);
    et.innerHTML = '<span>&#10004;</span> Fyrirlestur kláraður';
  } else {
    unSave(etVal);
    et.innerHTML = 'Klára fyrirlestur';
  }
}
