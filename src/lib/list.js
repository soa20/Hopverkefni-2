import {
  empty,
  el,
  isRead
} from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
    this.marked = '&#10004;';
  }

  buildLecture(data) {
    let result = null;
    let marked = null;
    const {
      slug,
      title,
      category,
      thumbnail
    } = data;

    const isLectureRead = isRead(slug);
    result = el('a',
      el('div',
        el('h4', category),
        el('h3', title),
        isLectureRead ? marked = el('span') : null));

    if (marked) {
      marked.classList.add('read');
      marked.innerHTML = '&#10003;';
    } 

    result.setAttribute('class', `lecture card ${category}`);
    result.setAttribute('href', `fyrirlestur.html?slug=${slug}`);

    if (thumbnail) {
      const thumb = el('img');
      thumb.setAttribute('src', thumbnail);
      thumb.setAttribute('alt', 'lecture slide');
      result.prepend(thumb);
    }

    this.container.appendChild(result);
  }

  getLectures() {
    return fetch('./lectures.json', {})
      .then(response => response.json())
      .then((data) => {
        empty(this.container);
        for (let i = 0; i < data.lectures.length; i += 1) {
          this.buildLecture(data.lectures[i]);
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('ERROR:Fetch aborted');
        } else {
          console.log('ERROR:', err);
        }
      });
  }

  setFilter(e) {
    const t = e.target;
    const filter = e.target.attributes.data.value;
    const p = document.querySelector('.lectures');
    const fb = document.querySelectorAll('.filterButton');
    let filtered = 0;

    t.classList.toggle('on');
    p.classList.add('filtered');
    p.classList.toggle(filter);

    for (let i = 0; i < fb.length; i += 1) {
      if (fb[i].classList.contains('on')) {
        filtered += 1;
      }
    }

    if (filtered === 0) {
      p.classList.remove('filtered');
    }
  }

  load() {
    this.getLectures();
  }
}
